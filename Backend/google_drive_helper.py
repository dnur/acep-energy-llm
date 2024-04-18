import PyPDF2
import os
import io
import json

import llm_main

from google.cloud import documentai
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from dotenv import load_dotenv
from googleapiclient.http import MediaIoBaseDownload, MediaIoBaseUpload

load_dotenv(dotenv_path='test2.env')

PROJECT_ID = os.getenv("PROJECT_ID")
LOCATION = os.getenv("LOCATION")
DOCUMENT_OCR_PROCESSOR_ID = os.getenv("DOCUMENT_OCR_PROCESSOR_ID")
FORM_PARSER_PROCESSOR_ID = os.getenv("FORM_PARSER_PROCESSOR_ID")

FILE_PATH = os.getenv("FILE_PATH")
MIME_TYPE = os.getenv("MIME_TYPE")

# Function to list all subfolders in a given Google Drive folder
def list_subfolders(service, folder_id):
    subfolders = []
    query = f"'{folder_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false"
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = response.get('files', [])
    for item in items:
        subfolders.append((item['id'], item['name']))
    return subfolders

# Function to list all PDF files in a given Google Drive folder
def list_pdf_files(service, folder_id):
    pdf_files = []
    query = f"'{folder_id}' in parents and mimeType='application/pdf' and trashed=false"
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = response.get('files', [])
    for item in items:
        pdf_files.append((item['id'], item['name']))
    return pdf_files

# Function to list all JSON files in a given Google Drive folder
def list_json_files(service, folder_id):
    json_files = []
    query = f"'{folder_id}' in parents and mimeType='application/json' and trashed=false"
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = response.get('files', [])
    for item in items:
        json_files.append((item['id'], item['name']))
    return json_files



# Check if a subfolder with the name exists in a given Google Drive folder, if not, create it
def get_or_create_folder(service, folder_name, parent_folder_id):
    query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and '{parent_folder_id}' in parents and trashed=false"
    response = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    folders = response.get('files', [])
    
    if folders:
        # Folder already exists
        return folders[0]['id']
    else:
        # Create a new folder
        folder_metadata = {
            'name': folder_name,
            'mimeType': 'application/vnd.google-apps.folder',
            'parents': [parent_folder_id]
        }
        folder = service.files().create(body=folder_metadata, fields='id').execute()
        return folder.get('id')

# Checks and refreshes Google Drive API credentials, initiating user login if necessary.
def check_creds():
    """
    Manages Google Drive API credentials, ensuring current user authentication. 
    If existing credentials are found and valid, they are used. 
    Otherwise, the function initiates an authorization flow for the user to log in and grant access. 
    Refreshes expired credentials automatically and saves new credentials for future use.
    """

    # If modifying these scopes, delete the file token.json.
    SCOPES = ['https://www.googleapis.com/auth/drive']

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds

# Extracts pages from PDFs in a Google Drive source folder and saves them as individual PDFs in a specified destination folder.
def pdf_to_pages(creds, bucket1 = '1-OcjRs7SFL-J9i1ekKe5CQElPlZ0Utcs', bucket2 = '1N6ShPsKoxcUtn-Ky75Uk4J3qgQPXo2hw'):
    """
    Grabs PDFs from the source folder (bucket1) in Google Drive.
    Extracts pages from each PDF and saves them each into a new PDF file.
    These PDF files will be in a bucket2/{file_name} folder in Google Drive.
    Each PDF's pages will be in its own folder named after that original PDF.

    :param creds: Credentials for the Google Drive API, used to authenticate and interact with Google Drive files and folders.
    :param bucket1: Folder ID of the source folder in Google Drive where PDF files are stored.
    :param bucket2: Folder ID of the folder in Google Drive where the individually split PDF files' pages are stored and organized into subfolders.
    """
    try:
        service = build('drive', 'v3', credentials=creds)

        # Query to search for PDF files in the source folder
        query = f"'{bucket1}' in parents and mimeType='application/pdf' and trashed=false"
        response = service.files().list(q=query,
                                        spaces='drive',
                                        fields='files(id, name)').execute()
        items = response.get('files', [])
        
        if not items:
            print("No PDF files found.")
            return

        for item in items:
            file_id = item['id']
            file_name = item['name']
            print(f'Processing file: {file_name}')

            request = service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()

            fh.seek(0)
            reader = PyPDF2.PdfReader(fh)

            # Folder for separated pages
            folder_name = file_name.rsplit('.', 1)[0]
            folder_metadata = {
                'name': folder_name,
                'mimeType': 'application/vnd.google-apps.folder',
                'parents': [bucket2]
            }
            folder = service.files().create(body=folder_metadata, fields='id').execute()
            folder_id = folder.get('id')

            num_pages = len(reader.pages)

            # Inside your loop where you are uploading files to Google Drive
            for page_num in range(num_pages):
                writer = PyPDF2.PdfWriter()
                writer.add_page(reader.pages[page_num])

                output_pdf = io.BytesIO()
                writer.write(output_pdf)
                output_pdf.seek(0)

                file_metadata = {
                    'name': f'{folder_name}_page_{page_num + 1}.pdf',
                    'parents': [folder_id]
                }
                # Here we use MediaIoBaseUpload with a BytesIO object
                media = MediaIoBaseUpload(output_pdf, mimetype='application/pdf', resumable=True)
                service.files().create(body=file_metadata, media_body=media, fields='id').execute()

        print("PDF extraction and saving to Google Drive completed.")
    except Exception as e:
        print(f"An error occurred: {e}")      

# Processes PDF files from Google Drive using Document AI to extract data, then saves the extracted data as JSON files in a specified destination folder.
def extract_json_from_pages(creds, bucket2, bucket3):
    """
    Iterates through each subfolder within a specified source folder (bucket2) in Google Drive, processing all contained PDF files. 
    For each PDF, the file is downloaded and sent to Google Document AI for OCR and data extraction. 
    The resulting data is converted to JSON, selectively retaining primarily text content. 
    This JSON is then saved in a new or existing corresponding subfolder within a specified destination folder in Google Drive, organized by the original PDF file names.

    :param creds: Credentials for the Google Drive API, used to authenticate and interact with Google Drive files and folders.
    :param bucket2: Folder ID of the folder in Google Drive where the individually split PDF files' pages are stored and organized into subfolders.
    :param bucket3: Folder ID of the destination folder in Google Drive where extracted JSON files will be saved, maintaining the organization from the source folder.
    """

    lib = llm_main.create_library() # note: default behavior - if library with same name already exists, then it loads existing library

    service = build('drive', 'v3', credentials=creds)
    docai_client = documentai.DocumentProcessorServiceClient()
    resource_name = docai_client.processor_path(project=PROJECT_ID, location=LOCATION, processor=DOCUMENT_OCR_PROCESSOR_ID)

    # First, list all subfolders in the main bucket
    subfolders = list_subfolders(service, bucket2)

    if not subfolders:
        print("No subfolders found.")
        return

    for folder_id, folder_name in subfolders:
        # List all PDF files in each subfolder
        pdf_files = list_pdf_files(service, folder_id)
        if not pdf_files:
            print(f"No PDF files found in folder '{folder_name}'.")
            continue

        # Get or create a subfolder in bucket3 for the current folder_name
        json_folder_id = get_or_create_folder(service, folder_name, bucket3)

        for file_id, file_name in pdf_files:
            print(f'Processing file: {file_name} in folder: {folder_name}')

            # Download PDF file
            request = service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                _, done = downloader.next_chunk()
            fh.seek(0)

            # Prepare request for Document AI
            content = fh.read()
            raw_document = documentai.RawDocument(content=content, mime_type='application/pdf')
            request = documentai.ProcessRequest(name=resource_name, raw_document=raw_document)

            # Process document with Document AI
            result = docai_client.process_document(request=request)

            # Convert the processed document to a Python dictionary
            document_dict = documentai.Document.to_dict(result.document)

            # The name for the JSON file
            json_file_name = f"{file_name.rsplit('.', 1)[0]}.json"
            file_metadata = {
                'name': json_file_name,
                'parents': [json_folder_id]
            }
            
            for key in list(document_dict.keys()):
                if key != "text":
                    del document_dict[key]
            
            document_json = json.dumps(document_dict)

            # Save the JSON string to a file
            with open(json_file_name, 'w', encoding='utf-8') as f:
                f.write(document_json)

            output_logs = lib.add_file(json_file_name)
            print(output_logs)
            os.remove(json_file_name)

            # Use MediaIoBaseUpload to upload the JSON file
            # Convert the JSON string to bytes and upload
            media = MediaIoBaseUpload(io.BytesIO(document_json.encode('utf-8')), mimetype='application/json')
            service.files().create(body=file_metadata, media_body=media, fields='id').execute()

            print(f"Extracted JSON for '{file_name}' saved to Google Drive in folder '{folder_name}'.")

# Pipeline function to convert PDFs in bucket1 to JSON in bucket3         
def pdf_to_json(bucket1, bucket2, bucket3):
    creds = check_creds()
    pdf_to_pages(creds, bucket1, bucket2)
    extract_json_from_pages(creds, bucket2, bucket3)

# import llm_main

# from llmware.parsers import TextParser

# class CustomTextParser(TextParser):
#     def json_file_handler(self, filepath):
#         # Your custom implementation here
#         print(f"Custom handling for JSON file: {filepath}")

def json_to_vector(bucket3):
    # creds = check_creds()
    # service = build('drive', 'v3', credentials=creds) 
    # subfolders = list_subfolders(service, bucket3)

    # if not subfolders:
    #     print("No subfolders found.")
    #     return
    
    # print(subfolders)

    # for folder_id, folder_name in subfolders:
    #     # List all JSON files in each subfolder
    #     json_files = list_json_files(service, folder_id)
    #     print(json_files)
    #     if not json_files:
    #         print(f"No JSON files found in folder '{folder_name}'.")
    #         continue

    # print(json_files)
    pass #TODO    

# def scraper(bucket_to_put_it_in):


# Python 
# add each PDF link to the metadata in the JSON
# add title of the PDF      
# connect 


# Python webscraper

