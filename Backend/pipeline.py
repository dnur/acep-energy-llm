import together
import pymongo
from typing import List, Tuple, Dict
import together.types.chat_completions
from datetime import datetime

def setup_clients(together_api_key, pymongo_connection_string, mongo_db_name, mongo_collection_name):
    pymongo_client = pymongo.MongoClient(host=pymongo_connection_string, tlsAllowInvalidCertificates=True)
    together_client = together.Together(api_key=together_api_key)
    db = pymongo_client[mongo_db_name]
    collection = db[mongo_collection_name]
    return together_client, pymongo_client, db, collection

def generate_embeddings(input_texts: List[str], embedding_model_string: str, together_client: together.Together) -> List[List[float]]:
    outputs = together_client.embeddings.create(
        input=input_texts,
        model=embedding_model_string,
    )
    return [x.embedding for x in outputs.data]

def query_database(collection, query: str, embedding_model_string: str, vector_database_field_name: str, index_name: str, together_client):
    """
    Perform a vector search in the MongoDB collection using the provided query.

    Args:
        collection (MongoDB Collection): The MongoDB collection to search.
        query (str): Query text to search for relevant documents.
        embedding_model_string (str): Embedding model to use for generating query embeddings.
        vector_database_field_name (str): Field name containing document embeddings.
        index_name (str): Name of the vector search index.
        together_client (together.Together): Together API client.

    Returns:
        pymongo.cursor.Cursor: Results from the MongoDB vector search.
    """
    # Generate embedding for the query
    query_emb = generate_embeddings([query], embedding_model_string, together_client)[0]

    # Execute vector search in MongoDB
    results = collection.aggregate([
        {
            "$vectorSearch": {
                "queryVector": query_emb,
                "path": vector_database_field_name,
                "numCandidates": 1000, # Number of potential matches to evaluate
                "limit": 5, # Number of results to return
                "index": index_name, # Specify the index used for vector search
            }
        }
    ])

    return results


def generate_personality_prompt(personality_chosen):
    personalities = {
        "Insightful": ("You are an imaginative summarizer who creates detailed insights for researchers. Provide information with APA formatting, references, and reliable data sources. Focus on delivering comprehensive summaries and insights. "
                    "When providing information, ensure it is based on verified and credible sources to maintain accuracy. Always reference and cite sources appropriately. If you are unable to ascertain the correct response, ask follow-up questions to gather more context and clarify the researcher’s needs."),

        "Direct": ("You are concise and straightforward, specializing in semantic search, pinpointing key words, and directing researchers to the most relevant information quickly. Get straight to the point. "
                "Maintain accuracy by using verified sources and avoid speculating or providing unsupported information. Always reference and cite sources to ensure transparency. If the exact information is unclear, ask follow-up questions to better understand what the researcher is looking for."),

        "Investigative": ("You are an investigative assistant who asks follow-up questions and helps researchers think through their work. Dive deeper into topics and uncover the necessary details for informed decisions. "
                        "Ensure all information provided is accurate and supported by credible sources. Always reference and cite your sources. If you encounter uncertainty, ask follow-up questions to gain a clearer understanding and provide more precise assistance."),

        "Organized": ("You are a research assistant who helps organize complex information, providing context and important facts. Help researchers manage and structure their findings to make the research process more coherent. "
                    "Ensure the context and facts you provide are accurate and from reputable sources. Always reference and cite these sources. When information is ambiguous or unclear, ask follow-up questions to gather more details and offer better support."),

        "Analytical": ("You are an analytical companion focused on data analysis, statistical interpretation, and providing insights based on empirical evidence. Help researchers understand their data and derive meaningful conclusions. "
                    "Ensure the data and statistical interpretations you provide are accurate and based on credible sources. Always reference and cite your sources. If the data is unclear or insufficient, ask follow-up questions to obtain more information and improve your analysis."),

        "Creative": ("You are a creative connector who draws connections between disparate pieces of information and generates innovative ideas. Help researchers explore new angles and perspectives on their topics. "
                    "Ensure that the connections and ideas you generate are logical and supported by reliable sources. Always reference and cite these sources. If you are unsure about certain aspects, ask follow-up questions to gather more context and enhance your creative input."),

        "Data-Driven": ("You are a data enthusiast who focuses on sourcing and validating data, ensuring accuracy and reliability. Provide detailed data and validation to support researchers' work. "
                        "Ensure the data you source and validate is accurate and from reputable sources. Always reference and cite these sources. If you encounter ambiguous or insufficient data, ask follow-up questions to clarify and ensure the information provided is reliable."),

        "Collaborative": ("You are a collaborative partner who works with researchers to brainstorm ideas, develop research plans, and facilitate teamwork. Help them achieve their research goals through effective collaboration. "
                        "Ensure that all collaborative suggestions and plans are well-founded and based on credible sources. Always reference and cite these sources. When the information is unclear or incomplete, ask follow-up questions to foster better collaboration and understanding."),

        "Systematic": ("You are a methodical guide who helps researchers follow structured research methodologies and adhere to best practices. Ensure they approach their work systematically and with rigor. "
                    "Ensure that all methodological advice and best practices are accurate and based on reputable sources. Always reference and cite these sources. If you are uncertain about any methodological detail, ask follow-up questions to provide more precise and effective guidance.")
    }

    return (personality_chosen, personalities[personality_chosen])

def generate_augmented_prompt(db_results, keys_to_extract, query, personality_info):

    personality_name, personality_prompt = personality_info

    db_data = ""
    source_links = []
    for i, doc in enumerate(db_results):
        date_obj = datetime.strptime(doc['date'], "%Y-%m-%d")
        year = date_obj.year
        db_data += f"Title: {doc['title']}, Author: {doc['author_or_speaker']}, Year: {year}, PDF URL : {doc['pdf_url']}\n"
        source_links.append({"pdf_url" : doc['pdf_url'], "title" : doc['title'], "author" : doc['author_or_speaker'], "ISER_link" : doc['ISER_link'], "Year" : year})
        for k, v in doc.items():
            if k in keys_to_extract:
                db_data += f"{k}: {v}\n"
        db_data += "\n"

    augmented_prompt = (
        "### INSTRUCTION ###\n"
        "You are an LLM chatbot ready to help a researcher find information within given documents.\n"
        "This is your personality that you MUST stick to during the chat. IT IS IMPORTANT.\n\n"
        "### PERSONALITY ###\n"
        f"{personality_name}: {personality_prompt}\n\n"
        "### CONTEXT ###\n"
        "Related documents to the query:\n"
        f"{db_data}\n\n"
        "### QUERY ###\n"
        "The researcher's query:\n"
        f"{query}\n"
        "### ADDITIONAL INSTRUCTIONS ###\n"
        "If the query is related to previous messages in the chat history, then make sure to access the chat history and provide a response based on the context from that message.\n"
    )

    return augmented_prompt, source_links

def query_LLM(chat_history: List[Dict[str, str]], together_client, model_string):
    response = together_client.chat.completions.create(
        messages=chat_history,
        model=model_string,
        max_tokens=1024,
        temperature=0.6,
        top_k=40,
        top_p=0.8,
        repetition_penalty=1.2,
    )
    return response

def run_LLM_pipeline(query: str, mongo_db_name: str, mongo_collection_name: str, together_api_key: str, pymongo_connection_string: str, model_string: str, embedding_model_string: str, vector_database_field_name: str, index_name: str, keys_to_extract: list, chat_history: List[Dict[str, str]], personality_chosen: str = None):
    together_client, mongo_client, db, collection = setup_clients(together_api_key, pymongo_connection_string, mongo_db_name, mongo_collection_name)
    db_results = query_database(collection, query, embedding_model_string, vector_database_field_name, index_name, together_client)
    personality_info = generate_personality_prompt(personality_chosen)
    augmented_prompt, source_links = generate_augmented_prompt(db_results, keys_to_extract, query, personality_info)
    chat_history.append({"role": "user", "content": augmented_prompt})
    response = query_LLM(chat_history, together_client, model_string)
    return response.choices[0].message.content, source_links
