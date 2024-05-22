from flask import Flask, request, jsonify, session
from openai import chat
from pipeline import run_LLM_pipeline 
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import os
from datetime import timedelta

# Load environment variables from a '.env' file
load_dotenv('env.env')

# Retrieve environment variables for database and API access
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
MONGODB_CONNECTION_STRING = os.getenv("MONGODB_CONNECTION_STRING")
LLAMA_3_MODEL_STRING = os.getenv("LLAMA_3_MODEL_STRING")

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS for all domains on all routes, allowing cross-origin requests
cors = CORS(app, origins=["*"])
app.config['CORS_HEADERS'] = 'Content-Type'

# Configure Flask session
app.secret_key = os.getenv("FLASK_SECRET_KEY", "your_default_secret_key")  # Set your secret key for session management
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)  # Set session lifetime

MAX_CHAT_HISTORY_LENGTH = 10  # Set the maximum number of messages to keep in chat history

@app.route('/sendquery', methods=['GET', 'POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def send_query():
    # Extract 'text' from the JSON request body, use empty string if 'text' is not found
    query = request.json.get('text', '')
    personality = request.json.get('personality', '')

    # Retrieve chat history from the session, or initialize if not present
    chat_history = session.get('chat_history', [])

    # Trim the chat history to the maximum length
    if len(chat_history) > MAX_CHAT_HISTORY_LENGTH:
        chat_history = chat_history[-MAX_CHAT_HISTORY_LENGTH:]
    # Generator function to yield responses
    response, source_links, chat_history = run_LLM_pipeline(
        query=query,
        mongo_db_name='acep',
        mongo_collection_name='iser',
        together_api_key=TOGETHER_API_KEY,
        pymongo_connection_string=MONGODB_CONNECTION_STRING,
        model_string=LLAMA_3_MODEL_STRING,
        embedding_model_string='togethercomputer/m2-bert-80M-8k-retrieval',
        vector_database_field_name='embedding_together_m2-bert-8k-retrieval',
        index_name='SemanticSearch',
        keys_to_extract=["text", "title", "author_or_speaker", "subject", "keywords", "description"],
        chat_history=chat_history,  # Pass the chat history to the pipeline
        personality_chosen=personality
    )
    # Update the chat history in the session
    session['chat_history'] = chat_history

    # Return a JSON response with the query text, LLM response, and source links
    return jsonify({'text': query, 'response': response, 'sources': source_links})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
