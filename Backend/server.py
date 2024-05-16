from flask import Flask, request, jsonify
from pipeline import run_LLM_pipeline  # Ensure this function is an iterable.
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import os

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

@app.route('/sendquery', methods=['GET', 'POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def send_query():
    # Extract 'text' from the JSON request body, use empty string if 'text' is not found
    text = request.json.get('text','')
    # Generator function to yield responses
    response, source_links = run_LLM_pipeline(
        query=text,
        mongo_db_name='acep',
        mongo_collection_name='iser',
        together_api_key=TOGETHER_API_KEY,
        pymongo_connection_string=MONGODB_CONNECTION_STRING,
        model_string=LLAMA_3_MODEL_STRING,
        embedding_model_string='togethercomputer/m2-bert-80M-8k-retrieval',
        vector_database_field_name='embedding_together_m2-bert-8k-retrieval',
        index_name='SemanticSearch',
        keys_to_extract=["title", "subject", "keywords", "text", "doc_ID", "author_or_speaker", "pdf_url", "description"]
    )
    # Return a streaming HTTP response with type json
    return jsonify({'text': text, 'response': response, 'sources' : source_links})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
