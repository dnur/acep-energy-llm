from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import os

import llm_main

FOLDER_PULL = llm_main.create_library(library_name="lib_test")
FOLDER_PULL.add_files('C://Users//najib//Desktop//Uni//UW//2024//ENGINE//OCR//OCR//source')

app = Flask(__name__)
cors = CORS(app, origins=["*"])
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['FOLDER_PULL'] = FOLDER_PULL


@app.route('/sendquery', methods = ['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])

def send_query():
    text = request.json.get('text', '')
    response  = llm_main.llm_power(FOLDER_PULL, text)
    return jsonify({'text': text, 'response': response})

if __name__ == '__main__':
    app.run(debug=True)