#!/bin/bash

echo "Setting up Python environment..."

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install required packages
pip install requests termcolor aws-cdk-lib "aws-cdk.aws-apigatewayv2-alpha>=2.0.0a0" "aws-cdk.aws-apigatewayv2-integrations-alpha>=2.0.0a0" constructs

# Verify installations
echo "Verifying installations..."
python3 -c "import requests; import termcolor; print('✅ Dependencies installed successfully')"

echo "
To activate the environment:
source venv/bin/activate

To run the tests:
python scripts/test-local-api.py
"