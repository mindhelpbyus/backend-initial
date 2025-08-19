#!/bin/bash

echo "Starting all services..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start Docker services
echo "Starting Docker services..."
docker-compose up -d

# Wait for LocalStack to be ready
echo "Waiting for LocalStack to be ready..."
until curl -s http://localhost:4566/_localstack/health > /dev/null; do
    sleep 2
done

# Deploy CDK stack
echo "Deploying CDK stack..."
cdklocal bootstrap
cdklocal deploy --require-approval never

# Run health check
echo "Running health check..."
poetry run python scripts/check-api-health.py