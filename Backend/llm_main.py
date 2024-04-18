import os
from venv import create
from llmware.setup import Setup
from llmware.library import Library
from llmware.prompts import Prompt, HumanInTheLoop
from llmware.retrieval import Query 
from llmware.configs import LLMWareConfig
import random 
from dotenv import load_dotenv

load_dotenv()
# API_KEY = os.getenv("API_KEY")
API_KEY = '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'

def create_library(library_name='lib_test', embedding_model='mini-lm-sbert', vector_db='milvus'):
    lib = Library()
    lib.create_new_library(f'{library_name}')
    lib.install_new_embedding(embedding_model_name=embedding_model, vector_db=vector_db)
    return lib 

# lib.add_files(library_path)

def llm_power(lib, query):
    prompter = Prompt().load_model("gpt-3.5-turbo-instruct", from_hf=False, api_key=API_KEY) 
    query_results = Query(lib).text_query(query, result_count=10)
    prompter.add_source_query_results(query_results)
    responses = prompter.prompt_with_source(query, prompt_name="default_with_context")
    for response in responses:
        if 'llm_response' in response:
            print (" > LLM response:\n" + response["llm_response"])
           
    if 'llm_response' in response:
        return response["llm_response"] 
    else:
        return "I'm not too sure. I couldn't find enough context in your library."

LLMWareConfig.set_config('debug_mode', 1)    
def llm_demo():
    lib = create_library('lib_demo')
    parsing_output = lib.add_files(input_folder_path='source')
    print('update: parsing output - ', parsing_output)

    output = lib.export_library_to_jsonl_file('Test_Output/', 'llm_demo')
    

# llm_power(create_library('source'), 'who are the commissioners?')
# lib.ad    
# llm_power(create_library('lib_test'), )
# 'lib_test'
    
# llm_demo()
