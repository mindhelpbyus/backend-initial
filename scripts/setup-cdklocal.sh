#!/bin/bash

# Install required npm packages globally
npm install -g aws-cdk-local aws-cdk

# Install required dependencies in the project
cd /Users/prabuv/MentalHealthProject/backend-initial
npm install --save-dev aws-cdk-lib @aws-cdk/aws-apigatewayv2-alpha @aws-cdk/aws-apigatewayv2-integrations-alpha

# Add cdklocal alias
echo 'export PATH="$PATH:$(npm prefix -g)/bin"' >> ~/.zshrc
echo 'alias cdklocal="cdklocal --no-watch"' >> ~/.zshrc

# Install Python dependencies
pip install -r requirements.txt

# Source the updated profile
source ~/.zshrc

echo "✅ CDK Local setup complete. Please run: source ~/.zshrc"
echo "Then you can use: cdklocal bootstrap && cdklocal deploy"