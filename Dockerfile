# Use the official Python image as the base image
FROM python:3.9-slim as base

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Use a lightweight image for the final stage
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the container
COPY . .

# Expose port 8080 to allow external access
EXPOSE 8080

# Command to run the Flask application
CMD ["python", "main.py"]
