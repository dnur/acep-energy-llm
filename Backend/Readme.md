# Setting Up Python and Virtual Environment

This guide outlines the steps to install Python and the necessary libraries using Anaconda as the recommended package manager. Although we recommend Anaconda, similar steps can be followed using other environment managers like `pyenv`.

## Prerequisites

Before beginning, ensure your computer meets the following requirements:
- Access to the internet to download necessary software.
- Appropriate system permissions to install software.

## Installation Steps

### 1. Install Anaconda

Anaconda simplifies package management and deployment. Follow these steps to install it:

- **Download Anaconda**: Visit the [Anaconda Installation Guide](https://docs.anaconda.com/free/anaconda/install/index.html) and download the version suitable for your operating system.
- **Install Anaconda**: Follow the on-screen instructions to complete the installation.

### 2. Create and Activate a Virtual Environment

Once Anaconda is installed, use it to create an isolated Python environment:

- **Open Anaconda Prompt**: Launch the Conda Prompt from your Start Menu.
- **Create the Environment**:
  ```bash
  conda create -n ACEP_ENERGY_LLM python=3.11
  ```
  This command creates a new environment named ACEP_ENERGY_LLM with Python 3.11.
- **Activate the Environment**:
  ```bash
  conda activate ACEP_ENERGY_LLM
  ```
  Upon activation, the environment name ACEP_ENERGY_LLM should appear in parentheses on the left of your path, indicating that it is currently active.
- **Clone this repository**
  Navigate to the directory in which you want to download this repository (you can use `cd <NEXT DIRECTORY NAME>` to navigate) and run:
  ```bash
  git clone https://github.com/dnur/acep-energy-llm.git
  ```
- **Navigate into this repository and then the Backend folder**
  ```bash
  cd acep-energy-llm
  ```
  then,
  ```bash
  cd Backend
  ```
- **Install the required libraries**
  ```bash
  pip install -r requirements.txt
  ```
  Now you will have all your Python libraries installed and `main.py` is ready to be run! If you are using VSCode, remember to change your Python environment on the bottom right to ACEP_ENERGY_LLM to ensure that the proper environment is activated there before running the code.

<!DOCTYPE html>
<html>
<head>
    <h1>Deploying Flask App on Google Cloud Run.</h1>
</head>
<body>
    <p>Follow these steps to deploy your Flask application on Google Cloud Run. </p>
    <p>This is using windows CMD.</p>
    <h2>Steps</h2>
    <ol>
        <li>
            <strong>Authenticate with Google Cloud</strong>
            <p>Use the following command to login to your Google Cloud account:</p>
            <pre><code>gcloud auth login</code></pre>
        </li>
        <li>
            <strong>Set the Google Cloud Project</strong>
            <p>Replace <code>PROJECT_ID</code> with your actual project ID:</p>
            <pre><code>gcloud config set project PROJECT_ID</code></pre>
        </li>
        <li>
            <strong>Enable Necessary Google Cloud Services</strong>
            <p>Enable the Cloud Run and Container Registry APIs:</p>
            <pre><code>gcloud services enable run.googleapis.com</code></pre>
            <pre><code>gcloud services enable containerregistry.googleapis.com</code></pre>
        </li>
        <li>
            <strong>Configure Docker to Use Google Cloud</strong>
            <p>Authenticate Docker to use your Google Cloud account:</p>
            <pre><code>gcloud auth configure-docker</code></pre>
        </li>
        <li>
            <strong>Build the Docker Image</strong>
            <p>Replace <code>PROJECT_ID</code> and <code>PROJECT_NAME</code> with your project ID and desired Docker image name:</p>
            <pre><code>docker build -t gcr.io/PROJECT_ID/PROJECT_NAME:v1 .</code></pre>
        </li>
        <li>
            <strong>Push the Docker Image to Google Container Registry</strong>
            <p>Push the built Docker image to your Google Container Registry:</p>
            <pre><code>docker push gcr.io/PROJECT_ID/PROJECT_NAME:v1</code></pre>
        </li>
        <li>
            <strong>Deploy the Flask App on Google Cloud Run</strong>
            <p>Deploy your Flask app using the following command. Replace <code>PROJECT_ID</code> and <code>PROJECT_NAME</code> with your project ID and Docker image name:</p>
            <pre><code>gcloud run deploy flaskapp --image gcr.io/PROJECT_ID/PROJECT_NAME:v1 --platform managed --region us-west1 --allow-unauthenticated</code></pre>
        </li>
    </ol>
    <p>Note: We use <code>us-west1</code> here; feel free to use any region that is closer to you.</p>
    <p>Also, you can change <code>v1</code> into any names for the version such as <code>v2</code></p>
</body>
</html>
