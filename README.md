<div style="text-align:center"><img src="logo.png" /></div>

# **<p align="center">ACEP LLM for Energy Research Papers</p>**

## Google Drive (Pipeline Buckets)
https://drive.google.com/drive/folders/1fdL95uZcz_osgGyvFxCMpDb2QVxHdUau?usp=sharing


# Table of Contents


- [Project Information](#Project-Information)
    - [Backend](#Backend)
        - [PDF OCR Pipeline](#PDF-OCR-Pipeline)
        - [LLM Pipeline](#LLM-Pipeline)
    - [Frontend](#Frontend)
- [References](#References)


# Project Information

## Backend

This section will provide an overview of the PDF to JSON pipeline process as well as the vector database and LLM components of the chatbot.

![alt text](<Capstone Diagram (Backend) V2.0.png>)

### PDF OCR Pipeline

The PDF OCR (Optical Character Recognition) Pipeline handles processing inputted PDF documents and converts them into JSON files with metadata that can be fed into the LLM's vector database.

#### Buckets 1 & 2 (Google Drive)

PDFs are split into pages and moved to bucket 2.

#### Metadata Fetch (pdf2doi)

This step takes the PDFs from the first two buckets and uses the package pdf2doi to get the DOI for each document, then uses the DOI database to retrieve any preexisting metadata for the document which is outputed.


#### OCRs (DocumentAI & FormParser)

There are two OCRs utilized to get the information from the PDFs. DocumentAI is used to extract primarily the text information while FormParser is utilized for table extraction. Some of the metadata from the resulting JSONs are trimmed for file size contraints.

#### Bucket 3

> :memo: **Note:** This bucket is an artifact from the elastic search pipeline and might be deleted next quarter.

Bucket 3 is for the JSON files resulting from merging the OCR outputted JSONs and modifying the data to include the information from Metadata Fetch into a comprehensive JSON for each PDF document.

### LLM Pipeline

The LLM Pipeline primarily handles the LLM (Large Language Model), the vector database the model uses as reference, and the connection to the frontend website.

#### Vector Database (Milvus)

Takes the JSONs from Bucket 3 and stores the information in a vectorized form for the LLM to utilize.

#### LLM (GPT-3.5 Turbo)

> :memo: **Note:** GPT-3.5 Turbo will be switched for an alternative LLM due to the costly nature of OpenAI models.

The LLM currently used is GPT-3.5 Turbo. The model uses the information stored in the vector database to tune its responses to queries from the frontend through Flask.

#### LLM to Website (Flask)

Flask is utilized as the mediator for interacting with the LLM from the frontend interface.


## Frontend

### Overview
This software is a React-based Chatbot interface integrated with backend services to provide conversational responses to user queries. It utilizes React hooks for managing state and axios for making HTTP requests to the backend. The chat interface allows users to input queries and receive responses from the backend, along with relevant sources if available.

### Dependencies
* React: A JavaScript library for building user interfaces.
* axios: A promise-based HTTP client for the browser and Node.js.

### Components
#### HomePage
Provides the main chat interface, handles user input, sends queries to the backend, and displays responses.
#### Github Icon
Provides the GitHub icon as an SVG component.

### Usage
To use this software, integrate the HomePage component into your React application. Ensure that dependencies are installed, and backend services are running. Customize CSS styles and component behaviors as needed.
In the project's root directory you can: 

Run the app in the development mode by running
#### npm start
Open http://localhost:3000 to view it in the browser. The page will reload if edits are made and any lint errors will be be shown in the console. 
You will also see any lint errors in the console.

Build the app for prodcution mode by running 
#### npm run build 



### Deployment
Deploy the React application containing the HomePage component to Cloudflare Pages, a platform that simplifies the deployment process for React applications. Ensure proper configuration of backend services for handling user queries.


# References

[List of Links to Modules Used](https://docs.google.com/document/d/1DumMWUNak_VOsiL8Gzij9y_qDGQGdSNifbKFKREQ5nk/edit?usp=sharing)
