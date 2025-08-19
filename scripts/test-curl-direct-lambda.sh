#!/bin/bash

# Direct Lambda invocation test script for local APIs
# This script tests the Lambda function directly via AWS Lambda invoke

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LAMBDA_FUNCTION="TelehealthBackend-dev-PatientsLambda2BB68394-9ead4f5b"
AWS_ENDPOINT="http://localhost:4566"
TOKEN=""
PATIENT_ID=""
TEST_EMAIL="test-$(date +%s)@example.com"

# Helper function to print colored output
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Helper function to invoke Lambda with event
invoke_lambda() {
    local method=$1
    local path=$2
    local body=$3
    local headers=$4
    local description=$5
    
    print_header "$description"
    echo "Method: $method"
    echo "Path: $path"
    
    if [ -n "$body" ]; then
        echo "Body: $body"
    fi
    
    if [ -n "$headers" ]; then
        echo "Headers: $headers"
    fi
    
    # Create the Lambda event payload
    local event="{
        \"requestContext\": {
            \"http\": {
                \"method\": \"$method\",
                \"path\": \"$path\"
            }
        },
        \"rawPath\": \"$path\",
        \"headers\": {$headers}
    }"
    
    if [ -n "$body" ]; then
        event=$(echo "$event" | jq --arg body "$body" '. + {"body": $body}')
    fi
    
    if [[ "$path" == *"?"* ]]; then
        local query_string="${path#*?}"
        local clean_path="${path%%?*}"
        event=$(echo "$event" | jq --arg qs "$query_string" --arg cp "$clean_path" '.rawPath = $cp | .queryStringParameters = ($qs | split("&") | map(split("=")) | map({(.[0]): .[1]}) | add)')
    fi
    
    echo "Event payload:"
    echo "$event" | jq .
    
    # Write event to temp file
    local temp_file=$(mktemp)
    echo "$event" > "$temp_file"
    
    echo "Response:"
    local response=$(aws lambda invoke \
        --function-name "$LAMBDA_FUNCTION" \
        --payload "file://$temp_file" \
        --endpoint-url "$AWS_ENDPOINT" \
        /tmp/lambda-response.json 2>&1)
    
    echo "Invoke response: $response"
    
    if [ -f /tmp/lambda-response.json ]; then
        echo "Lambda function response:"
        cat /tmp/lambda-response.json | jq .
        
        # Extract status code and body
        local status_code=$(cat /tmp/lambda-response.json | jq -r '.statusCode // "unknown"')
        local response_body=$(cat /tmp/lambda-response.json | jq -r '.body // "{}"')
        
        echo "Status Code: $status_code"
        echo "Response Body: $response_body"
        
        if [[ $status_code -ge 200 && $status_code -lt 300 ]]; then
            print_success "Request successful (Status: $status_code)"
        elif [[ $status_code -ge 400 && $status_code -lt 500 ]]; then
            print_error "Client error (Status: $status_code)"
        elif [[ $status_code -ge 500 ]]; then
            print_error "Server error (Status: $status_code)"
        fi
        
        # Return the response for token extraction
        echo "$response_body"
    else
        print_error "No response file generated"
    fi
    
    # Cleanup
    rm -f "$temp_file" /tmp/lambda-response.json
}

# Function to extract token from response
extract_token() {
    local response=$1
    echo "$response" | jq -r '.token // empty' 2>/dev/null || echo ""
}

# Function to extract patient ID from response
extract_patient_id() {
    local response=$1
    echo "$response" | jq -r '.patientId // empty' 2>/dev/null || echo ""
}

# Check if services are running
check_services() {
    print_header "Checking Services"
    
    # Check LocalStack
    if curl -s "http://localhost:4566/_localstack/health" > /dev/null; then
        print_success "LocalStack is running"
    else
        print_error "LocalStack is not running. Please start it with: docker-compose up -d"
        exit 1
    fi
    
    # Check if Lambda function exists
    if aws lambda get-function --function-name "$LAMBDA_FUNCTION" --endpoint-url "$AWS_ENDPOINT" > /dev/null 2>&1; then
        print_success "Lambda function is deployed"
    else
        print_error "Lambda function not found. Please deploy with: cd cdk && cdklocal deploy"
        exit 1
    fi
}

# Test Authentication Endpoints
test_auth() {
    print_header "Testing Authentication Endpoints"
    
    # Test Signup
    local signup_body="{\"email\":\"$TEST_EMAIL\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
    local signup_response=$(invoke_lambda "POST" "/auth/signup" "$signup_body" "" "User Signup")
    
    TOKEN=$(extract_token "$signup_response")
    PATIENT_ID=$(extract_patient_id "$signup_response")
    
    if [ -n "$TOKEN" ]; then
        print_success "Token obtained: ${TOKEN:0:20}..."
        print_success "Patient ID: $PATIENT_ID"
    else
        print_error "Failed to get token from signup"
    fi
    
    # Test Login
    local login_body="{\"email\":\"$TEST_EMAIL\",\"password\":\"password123\"}"
    invoke_lambda "POST" "/auth/login" "$login_body" "" "User Login"
    
    # Test Login with wrong password
    local wrong_login_body="{\"email\":\"$TEST_EMAIL\",\"password\":\"wrongpassword\"}"
    invoke_lambda "POST" "/auth/login" "$wrong_login_body" "" "Login with wrong password (should fail)"
}

# Test Patient Endpoints
test_patients() {
    print_header "Testing Patient Endpoints"
    
    # Test Get Patient by Email
    invoke_lambda "GET" "/patients/by-email?email=$TEST_EMAIL" "" "" "Get Patient by Email"
    
    # Test Get Patient by ID
    if [ -n "$PATIENT_ID" ]; then
        invoke_lambda "GET" "/patients/$PATIENT_ID" "" "" "Get Patient by ID"
    fi
    
    # Test Update Patient
    if [ -n "$PATIENT_ID" ] && [ -n "$TOKEN" ]; then
        local update_body="{\"firstName\":\"Updated\",\"lastName\":\"Name\"}"
        local auth_header="\"Authorization\": \"Bearer $TOKEN\""
        invoke_lambda "PUT" "/patients/$PATIENT_ID" "$update_body" "$auth_header" "Update Patient"
    fi
}

# Test Patient Sub-resources
test_patient_subresources() {
    if [ -z "$PATIENT_ID" ]; then
        print_error "Patient ID not available for sub-resource tests"
        return
    fi
    
    print_header "Testing Patient Sub-resources"
    
    # Test Get Visits
    invoke_lambda "GET" "/patients/$PATIENT_ID/visits" "" "" "Get Patient Visits"
    
    # Test Add Review
    if [ -n "$TOKEN" ]; then
        local review_body="{\"rating\":5,\"comment\":\"Great service!\",\"doctorId\":\"doc123\"}"
        local auth_header="\"Authorization\": \"Bearer $TOKEN\""
        invoke_lambda "POST" "/patients/$PATIENT_ID/reviews" "$review_body" "$auth_header" "Add Patient Review"
    fi
}

# Test Error Cases
test_error_cases() {
    print_header "Testing Error Cases"
    
    # Test invalid endpoints
    invoke_lambda "GET" "/invalid/endpoint" "" "" "Invalid Endpoint (should return 404)"
    
    # Test missing required fields
    invoke_lambda "POST" "/auth/signup" "{}" "" "Signup without required fields"
    invoke_lambda "POST" "/auth/login" "{}" "" "Login without required fields"
    
    # Test unauthorized access
    invoke_lambda "GET" "/patients" "" "" "Get Patients without auth"
    
    # Test invalid patient ID
    invoke_lambda "GET" "/patients/invalid-id" "" "" "Get Non-existent Patient"
}

# Main execution
main() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "  Direct Lambda Testing with AWS CLI"
    echo "=================================================="
    echo -e "${NC}"
    
    # Check if jq is available
    if ! command -v jq &> /dev/null; then
        print_error "jq is required but not installed. Please install jq first."
        exit 1
    fi
    
    check_services
    test_auth
    test_patients
    test_patient_subresources
    test_error_cases
    
    print_header "Test Summary"
    print_success "All Lambda tests completed!"
    print_info "Check the output above for detailed results"
    
    if [ -n "$TOKEN" ]; then
        print_info "User Token: ${TOKEN:0:30}..."
    fi
    
    if [ -n "$PATIENT_ID" ]; then
        print_info "Test Patient ID: $PATIENT_ID"
    fi
    
    echo -e "\n${GREEN}🎉 Testing complete!${NC}"
}

# Run main function
main "$@"
