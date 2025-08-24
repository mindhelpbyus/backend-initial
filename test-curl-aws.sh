#!/bin/bash

# Test AWS API Gateway directly with curl
# Usage: ./test-curl-aws.sh <API_GATEWAY_URL>

if [ $# -eq 0 ]; then
    echo "Usage: $0 <API_GATEWAY_URL>"
    echo "Example: $0 https://lf4digbabc.execute-api.us-east-1.amazonaws.com"
    exit 1
fi

API_URL="${1%/}"  # Remove trailing slash if present

echo "=========================================="
echo "Testing AWS API Gateway with curl"
echo "API URL: $API_URL"
echo "=========================================="

echo ""
echo "1. Testing GET /doctors (should work without auth):"
echo "curl -X GET $API_URL/doctors"
echo "Response:"
curl -X GET "$API_URL/doctors" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "=========================================="
echo ""
echo "2. Testing POST /auth/signup (should work without auth):"
echo "curl -X POST $API_URL/auth/signup"
echo "Response:"
curl -X POST "$API_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-curl@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "=========================================="
echo ""
echo "3. Testing POST /patients (should work without auth):"
echo "curl -X POST $API_URL/patients"
echo "Response:"
curl -X POST "$API_URL/patients" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient-curl@example.com",
    "firstName": "Patient",
    "lastName": "Test"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "=========================================="
echo "Test completed!"
echo "=========================================="
