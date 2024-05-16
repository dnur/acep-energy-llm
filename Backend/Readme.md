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
    <p>Also, you can change <code>v1</code> into any names for the version such as v2</p>
</body>
</html>
