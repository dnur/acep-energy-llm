import together
import pymongo
from typing import List
import together.types.chat_completions

def setup_clients(together_api_key, pymongo_connection_string, mongo_db_name, mongo_collection_name):
    """
    Initialize and return Together and MongoDB clients along with specified database and collection.
    
    Args:
        together_api_key (str): API key for Together API.
        pymongo_connection_string (str): Connection string for MongoDB.
        mongo_db_name (str): Name of the MongoDB database.
        mongo_collection_name (str): Name of the MongoDB collection.

    Returns:
        tuple: Tuple containing Together client, pymongo MongoClient, database, and collection.
    """
    # Connect to MongoDB using the provided connection string and TLS settings
    pymongo_client = pymongo.MongoClient(host=pymongo_connection_string, tlsAllowInvalidCertificates=True)
    # Initialize the Together API client with the provided API key
    together_client = together.Together(api_key=together_api_key)

    # Access the specific MongoDB database and collection
    db = pymongo_client[mongo_db_name]
    collection = db[mongo_collection_name]

    return together_client, pymongo_client, db, collection

def generate_embeddings(input_texts: List[str], embedding_model_string: str, together_client: together.Together) -> List[List[float]]:
    """
    Generate embeddings for given texts using a specified model from Together API.

    Args:
        input_texts (List[str]): A list of texts for which embeddings are required.
        embedding_model_string (str): Model identifier for embedding generation.
        together_client (together.Together): Client object for Together API.

    Returns:
        List[List[float]]: List of embeddings for each input text.
    """
    # Generate embeddings using the Together client
    outputs = together_client.embeddings.create(
        input=input_texts,
        model=embedding_model_string,
    )

    # Extract embeddings from the API response
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
                "limit": 10, # Number of results to return
                "index": index_name, # Specify the index used for vector search
            }
        }
    ])

    return results

def generate_augmented_prompt(db_results, keys_to_extract, query):
    """
    Construct an augmented prompt for the LLM based on database results and a query.

    Args:
        db_results (iterable): Results from the database query.
        keys_to_extract (list): List of keys to include in the prompt from each document.
        query (str): Researcher's query to be addressed by the LLM.

    Returns:
        str: A crafted prompt for the LLM.
    """
    db_data = ""
    source_links = []
    # Compile data from each relevant document into a structured format for the prompt
    for i, doc in enumerate(db_results):
        db_data += f"Title: {doc['title']}, Author: {doc['author_or_speaker']}\n"
        for k, v in doc.items():
            if k in keys_to_extract:  # Only include specified fields in the prompt
                db_data += f"{k}: {v}\n"
                if k == "pdf_url":
                    source_links.append(v)
        db_data += "\n"

    augmented_prompt = (
        "You are an LLM chat bot ready to help a researcher find information within given documents.\n"
        "Related documents to the query:\n"
        f"{db_data}\n\n"
        f"The researcher's query:\n"
        f"{query}"
    )

    return augmented_prompt, source_links

def query_LLM(augmented_prompt, together_client, model_string):
    """
    Query the LLM with the augmented prompt to get a response.

    Args:
        augmented_prompt (str): The crafted prompt for the LLM.
        together_client (together.Together): Client object for Together API.
        model_string (str): Model identifier for the LLM.

    Returns:
        together.types.chat_completions.ChatCompletionResponse: The LLM's response.
    """
    # Send the prompt to the LLM and get a response
    response = together_client.chat.completions.create(   
        messages=[{"role": "user", "content": augmented_prompt}],
        model=model_string,
        max_tokens=512,
        temperature=0.6,  
        top_k=40,         
        top_p=0.8,        
        repetition_penalty=1.2,  
        # stream=True
    )

    return response

def run_LLM_pipeline(query: str, mongo_db_name: str, mongo_collection_name: str, together_api_key: str, pymongo_connection_string: str, model_string: str, embedding_model_string: str, vector_database_field_name: str, index_name: str, keys_to_extract: list):
    """
    Orchestrates the entire process of querying a database and generating a response using an LLM.

    Args:
        query (str): The researcher's query.
        mongo_db_name (str): Name of the MongoDB database.
        mongo_collection_name (str): Name of the collection.
        together_api_key (str): API key for Together.
        pymongo_connection_string (str): Connection string for MongoDB.
        model_string (str): Model identifier for the LLM.
        embedding_model_string (str): Model for generating embeddings.
        vector_database_field_name (str): Field name for vector search.
        index_name (str): Index name for vector search.
        keys_to_extract (list): Fields to extract from the database for the LLM prompt.

    Returns:
        str: The LLM's response to the query.
    """
    # Setup API and database clients
    together_client, mongo_client, db, collection = setup_clients(together_api_key, pymongo_connection_string, mongo_db_name, mongo_collection_name)
    # Retrieve relevant documents from the database
    db_results = query_database(collection, query, embedding_model_string, vector_database_field_name, index_name, together_client)
    # Generate an augmented prompt for the LLM
    augmented_prompt, source_links = generate_augmented_prompt(db_results, keys_to_extract, query)
    # Query the LLM and retrieve the response
    response = query_LLM(augmented_prompt, together_client, model_string)

    return response.choices[0].message.content, source_links
