<div style="text-align:center"><img src="Assets/logo.png" /></div>

# **<p align="center">ACEP LLM for Energy Research Papers</p>**


# Overview 
<div style="text-align:center"><img src="Assets/Overall Project Diagram v3.png" /></div>


# Table of Contents


- [Project Information](#Project-Information)
    - [Project Background](##Background)
    - [Backend](#Backend)
        -[Backend Setup Guide](#Backend-Setup-Guide)
    - [Frontend](#Frontend)
        -[Frontend Setup Guide](#Frontend-Setup-Guide)
    - [Local Implementation](#Local-Implementation)
    - [Deployment](#Deployment)
    - [Website](#Our-Website)
    - [References](#References)


# Project Information

## Background
Our goal for this project was to create a chatbot for energy researchers at the Alaska Center for Energy and Power to streamline information and make it easier to find relevant documents for these researchers. We were able to do this by creating a RAG model. Retrieval-Augmented Generation (RAG) model combines the capabilities of a retriever and a generator to enhance the performance of tasks like question answering and content generation. The following will show the process and pipeline of this RAG model. 

## Backend

This section will provide an overview of the PDF to JSON pipeline process as well as the vector database and LLM components of the chatbot.  

### Backend Setup Guide

[A guide to set up the backend](Backend/Readme.md)

### PDF OCR Pipeline

The PDF OCR (Optical Character Recognition) Pipeline handles processing inputted PDF documents and converts them into JSON files with metadata that can be fed into the LLM's vector database.

#### Metadata Fetch (pdf2doi)

This step takes the PDFs and uses the package pdf2doi to get the DOI for each document, then uses the DOI database to retrieve any preexisting metadata for the document which is outputed.


#### OCRs (Tesseract)

We are using Tesseract to parse our PDF documents and create our JSON files for more information and creating better embeddings. 

#### Chunker

The Chunker groups together similar words from the OCR and creates different meaningful phrases for our vector database. 

#### LLM Pipeline

The LLM Pipeline primarily handles the LLM (Large Language Model), the vector database the model uses as reference, and the connection to the frontend website.

#### Vector Database (MongoDB)

Takes the JSONs and stores the information from the Chunker in a vectorized form for the LLM to utilize.

#### Language Model Implementation

<div style="text-align:center"><img src="Assets/RAG Query Diagram.png" /></div>


#### LLM (Llama 3)

The LLM currently used is LLama3, we use TogetherAI to access this model. The model uses the information stored in the vector database to tune its responses to queries from the frontend through Flask.

#### LLM to Website (Flask)

Flask is utilized as the mediator for interacting with the LLM from the frontend interface by sending API requests between the two.


## Frontend

### Overview
This software is a React-based Chatbot interface integrated with backend services to provide conversational responses to user queries. It utilizes React hooks for managing state and axios for making HTTP requests to the backend. The chat interface allows users to input queries and receive responses from the backend, along with relevant sources if available.  

<div style="text-align:center"><img src="Assets/Poster Fronend v2.png" /></div>


### Dependencies
#### Flask
Acts as the backend framework that mediates interactions between the frontend interface and the LLM. It handles HTTP requests and responses, enabling seamless communication between the LLM and the website.

#### Axios
A promise-based HTTP client used in the frontend React App to make HTTP requests to the backend. It facilitates the communication between the React.js frontend and the Flask backend.

#### React.js 
The frontend framework used to build the user interface of the website. It manages the state and components of the application,  allowing developers to create interactive and dynamic user interfaces, ensuring a responsive and engaging user experience.

#### Cloudflare Pages 
The deployment platform for the frontend website. It simplifies the deployment process with seamless Git integration, ensuring the UI updates automatically with each push. Cloudflare's global network ensures fast delivery and built-in SSL security.

#### Website 
User access point to the system, using a chat room as the interactive interface It is built with React.js and deployed on Cloudflare Pages, providing an intuitive platform for users to input queries and receive responses.

### Components
#### HomePage
Provides the main chat interface, handles user input, sends queries to the backend, and displays responses.
#### Github Icon
Provides the GitHub icon as an SVG component.


## Local Implementation

### Usage

To use this software, Ensure that dependencies are installed and the API calls are changed to local instances. Integrate the HomePage component into your React application.Customize CSS styles and component behaviors as needed.

In the projects's Backend directory you can run the server locally by running:

#### python main.py

In the project's Frontend directory you can run the app in the development mode by running:

#### npm start
Open http://localhost:3000 to view it in the browser. The page will reload if edits are made and any lint errors will be be shown in the console. 
You will also see any lint errors in the console.

Build the app for production mode by running 
#### npm run build 

## Deployment
We deployed our React application containing the HomePage component to Cloudflare Pages, a platform that simplifies the deployment process for React applications. Our Backend flask app was deployed using Google Cloud Run to efficiently containerize our app and interact with the frontend. 

## Our Website:
Check out our website here: [Website](https://chat.lab.acep.uaf.edu/)


## References

[List of Links to Modules Used](https://docs.google.com/document/d/1Isk_NAO8wUKQ3e7VfeDZfl8wjNirx8Z06M-9j8bWJqU/edit?usp=sharing)
