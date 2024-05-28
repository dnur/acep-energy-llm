from flask import Flask, request, jsonify
from openai import chat
from sympy import per
from pipeline import run_LLM_pipeline 
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import os

# Load environment variables from a '.env' file
load_dotenv('env.env')

# Retrieve environment variables for database and API access
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
MONGODB_CONNECTION_STRING = os.getenv("MONGODB_CONNECTION_STRING")

MONGODB_DB_NAME = 'acep'
MONGODB_COLLECTION_NAME = 'iser'
LLAMA_3_MODEL_STRING = 'meta-llama/Llama-3-70b-chat-hf'
EMBEDDING_MODEL_STRING = 'togethercomputer/m2-bert-80M-8k-retrieval'
VECTOR_DATABASE_FIELD_NAME = 'embedding_together_m2-bert-8k-retrieval'
ATLAS_SEARCH_INDEX_NAME = 'SemanticSearch'
KEYS_TO_EXTRACT = ["text", "title", "author_or_speaker", "subject", "keywords", "description"]

MAX_CHAT_HISTORY_LENGTH = 10  # Set the maximum number of messages to keep in chat history

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS for all domains on all routes, allowing cross-origin requests
cors = CORS(app, origins=["*"])
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/sendquery', methods=['GET', 'POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def send_query():
    # Extract 'text' from the JSON request body, use empty string if 'text' is not found
    query = request.json.get('text', '')
    personality = request.json.get('personality', '')
    message_list = request.json.get('response', [])

    chat_history = []
    for message in message_list:
        reformatted_message = {'role': '', 'content' : ''}
        for k, v in message.items():
            if k == 'text':
                reformatted_message['content'] = v
            elif k == 'sender':
                if v == 'bot':
                    v = 'assistant'               
                reformatted_message['role'] = v
        chat_history.append(reformatted_message)

#     chat_history.append({'role': 'user', 'content': query})

    # Trim the chat history to the maximum length
    if len(chat_history) > MAX_CHAT_HISTORY_LENGTH:
        chat_history = chat_history[-MAX_CHAT_HISTORY_LENGTH:]
    # Generator function to yield responses
    response, source_links = run_LLM_pipeline(
        query=query,
        mongo_db_name=MONGODB_DB_NAME,
        mongo_collection_name=MONGODB_COLLECTION_NAME,
        together_api_key=TOGETHER_API_KEY,
        pymongo_connection_string=MONGODB_CONNECTION_STRING,
        model_string=LLAMA_3_MODEL_STRING,
        embedding_model_string=EMBEDDING_MODEL_STRING,
        vector_database_field_name=VECTOR_DATABASE_FIELD_NAME,
        index_name=ATLAS_SEARCH_INDEX_NAME,
        keys_to_extract=KEYS_TO_EXTRACT,
        chat_history=chat_history,  # Pass the chat history to the pipeline
        personality_chosen=personality
    )

    # Return a JSON response with the query text, LLM response, and source links
    return jsonify({'text': query, 'response': response, 'sources': source_links})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
