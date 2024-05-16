Here is the instruction of how to get the flaskapp to run on your google cloud run.
Use 'gcloud auth login' to login to your account for authentication
Use 'gcloud config set project PROJECT_ID' (Project_ID = your project ID) to choose the correct project.
Use 'gcloud services enable run.googleapis.com' and 'gcloud services enable containerregistry.googleapis.com' to enable nessassary google cloud services.
Use 'gcloud auth configure-docker' to authenticate gcloud to use docker.
Use 'docker build -t gcr.io/Project_ID/Project_name:v1 .' (Project_name = docker image name you are building)
Use 'docker push gcr.io/Project_ID/Project_name:v1' to push the docker build to the gcr.
Use 'gcloud run deploy flaskapp --image gcr.io/Project_ID/Project_name:v1 --platform managed --region us-west1 --allow-unauthenticated' note we use us-west1 here 
feel free to use any service that is close to you.
