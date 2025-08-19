#!/bin/bash

# Comprehensive curl test script for local APIs
# This script tests all available endpoints in the patients API

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Configuration
API_BASE="http://localhost:4566"
TOKEN=""
ADMIN_TOKEN=""
PATIENT_ID=""
TEST_EMAIL="test-$(date +%s)@example.com"
ADMIN_EMAIL="admin-$(date +%s)@example.com"

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

# Helper function to make curl requests and display results
curl_test() {
    local method=$1
    local endpoint=$2
    local data=$3
    local headers=$4
    local description=$5
    
    print_header "$description"
    echo "Request: $method $API_BASE$endpoint"
    
    if [ -n "$data" ]; then
        echo "Data: $data"
    fi
    
    if [ -n "$headers" ]; then
        echo "Headers: $headers"
    fi
    
    echo "Response:"
    
    local curl_cmd="curl -s -w '\nHTTP Status: %{http_code}\n' -X $method"
    
    if [ -n "$headers" ]; then
        curl_cmd="$curl_cmd -H '$headers'"
    fi
    
    if [ -n "$data" ]; then
        curl_cmd="$curl_cmd -H 'Content-Type: application/json' -d '$data'"
    fi
    
    curl_cmd="$curl_cmd '$API_BASE$endpoint'"
    
    local response=$(eval $curl_cmd)
    echo "$response"
    
    # Extract HTTP status code
    local status_code=$(echo "$response" | grep "HTTP Status:" | cut -d' ' -f3)
    
    if [[ $status_code -ge 200 && $status_code -lt 300 ]]; then
        print_success "Request successful (Status: $status_code)"
    elif [[ $status_code -ge 400 && $status_code -lt 500 ]]; then
        print_error "Client error (Status: $status_code)"
    elif [[ $status_code -ge 500 ]]; then
        print_error "Server error (Status: $status_code)"
    fi
    
    echo "$response"
}

# Function to extract token from response
extract_token() {
    local response=$1
    echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4
}

# Function to extract patient ID from response
extract_patient_id() {
    local response=$1
    echo "$response" | grep -o '"patientId":"[^"]*"' | cut -d'"' -f4
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
    
    # Check DynamoDB Admin (optional)
    if curl -s "http://localhost:8001" > /dev/null; then
        print_success "DynamoDB Admin is running"
    else
        print_info "DynamoDB Admin is not running (optional)"
    fi
}

# Test Authentication Endpoints
test_auth() {
    print_header "Testing Authentication Endpoints"
    
    # Test Signup
    local signup_data="{\"email\":\"$TEST_EMAIL\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
    local signup_response=$(curl_test "POST" "/auth/signup" "$signup_data" "" "User Signup")
    TOKEN=$(extract_token "$signup_response")
    PATIENT_ID=$(extract_patient_id "$signup_response")
    
    if [ -n "$TOKEN" ]; then
        print_success "Token obtained: ${TOKEN:0:20}..."
        print_success "Patient ID: $PATIENT_ID"
    else
        print_error "Failed to get token from signup"
    fi
    
    # Test Login
    local login_data="{\"email\":\"$TEST_EMAIL\",\"password\":\"password123\"}"
    local login_response=$(curl_test "POST" "/auth/login" "$login_data" "" "User Login")
    
    # Test Signup with existing email (should fail)
    curl_test "POST" "/auth/signup" "$signup_data" "" "Duplicate Signup (should fail)"
    
    # Test Login with wrong password
    local wrong_login_data="{\"email\":\"$TEST_EMAIL\",\"password\":\"wrongpassword\"}"
    curl_test "POST" "/auth/login" "$wrong_login_data" "" "Login with wrong password (should fail)"
    
    # Create admin user for admin tests
    local admin_data="{\"email\":\"$ADMIN_EMAIL\",\"password\":\"admin123\",\"firstName\":\"Admin\",\"lastName\":\"User\",\"role\":\"admin\"}"
    local admin_response=$(curl_test "POST" "/auth/signup" "$admin_data" "" "Admin Signup")
    ADMIN_TOKEN=$(extract_token "$admin_response")
}

# Test Patient Endpoints
test_patients() {
    print_header "Testing Patient Endpoints"
    
    # Test Get Patients (requires admin)
    curl_test "GET" "/patients" "" "Authorization: Bearer $TOKEN" "Get Patients (should fail - not admin)"
    
    if [ -n "$ADMIN_TOKEN" ]; then
        curl_test "GET" "/patients" "" "Authorization: Bearer $ADMIN_TOKEN" "Get Patients (admin)"
    fi
    
    # Test Get Patient by Email
    curl_test "GET" "/patients/by-email?email=$TEST_EMAIL" "" "" "Get Patient by Email"
    
    # Test Get Patient by ID
    if [ -n "$PATIENT_ID" ]; then
        curl_test "GET" "/patients/$PATIENT_ID" "" "" "Get Patient by ID"
    fi
    
    # Test Create Patient (requires admin)
    local new_patient_data="{\"email\":\"newpatient@example.com\",\"firstName\":\"New\",\"lastName\":\"Patient\"}"
    curl_test "POST" "/patients" "$new_patient_data" "Authorization: Bearer $TOKEN" "Create Patient (should fail - not admin)"
    
    if [ -n "$ADMIN_TOKEN" ]; then
        curl_test "POST" "/patients" "$new_patient_data" "Authorization: Bearer $ADMIN_TOKEN" "Create Patient (admin)"
    fi
    
    # Test Update Patient
    if [ -n "$PATIENT_ID" ] && [ -n "$TOKEN" ]; then
        local update_data="{\"firstName\":\"Updated\",\"lastName\":\"Name\"}"
        curl_test "PUT" "/patients/$PATIENT_ID" "$update_data" "Authorization: Bearer $TOKEN" "Update Patient"
    fi
}

# Test Patient Sub-resources
test_patient_subresources() {
    if [ -z "$PATIENT_ID" ] || [ -z "$TOKEN" ]; then
        print_error "Patient ID or token not available for sub-resource tests"
        return
    fi
    
    print_header "Testing Patient Sub-resources"
    
    # Test Get Visits
    curl_test "GET" "/patients/$PATIENT_ID/visits" "" "" "Get Patient Visits"
    
    # Test Add Review
    local review_data="{\"rating\":5,\"comment\":\"Great service!\",\"doctorId\":\"doc123\"}"
    curl_test "POST" "/patients/$PATIENT_ID/reviews" "$review_data" "Authorization: Bearer $TOKEN" "Add Patient Review"
}

# Test Error Cases
test_error_cases() {
    print_header "Testing Error Cases"
    
    # Test invalid endpoints
    curl_test "GET" "/invalid/endpoint" "" "" "Invalid Endpoint (should return 404)"
    
    # Test missing required fields
    curl_test "POST" "/auth/signup" "{}" "" "Signup without required fields"
    curl_test "POST" "/auth/login" "{}" "" "Login without required fields"
    
    # Test unauthorized access
    curl_test "GET" "/patients" "" "" "Get Patients without auth"
    curl_test "PUT" "/patients/123" "{\"name\":\"test\"}" "" "Update Patient without auth"
    
    # Test invalid patient ID
    curl_test "GET" "/patients/invalid-id" "" "" "Get Non-existent Patient"
    
    # Test malformed JSON
    curl_test "POST" "/auth/signup" "invalid-json" "" "Malformed JSON"
}

# Test with different HTTP methods
test_method_variations() {
    print_header "Testing HTTP Method Variations"
    
    # Test unsupported methods on existing endpoints
    curl_test "PATCH" "/auth/signup" "" "" "PATCH on signup (should fail)"
    curl_test "DELETE" "/auth/login" "" "" "DELETE on login (should fail)"
    curl_test "POST" "/patients/by-email" "" "" "POST on get-by-email endpoint (should fail)"
}

# Main execution
main() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "  Comprehensive API Testing with curl"
    echo "=================================================="
    echo -e "${NC}"
    
    check_services
    test_auth
    test_patients
    test_patient_subresources
    test_error_cases
    test_method_variations
    
    print_header "Test Summary"
    print_success "All curl tests completed!"
    print_info "Check the output above for detailed results"
    
    if [ -n "$TOKEN" ]; then
        print_info "User Token: ${TOKEN:0:30}..."
    fi
    
    if [ -n "$ADMIN_TOKEN" ]; then
        print_info "Admin Token: ${ADMIN_TOKEN:0:30}..."
    fi
    
    if [ -n "$PATIENT_ID" ]; then
        print_info "Test Patient ID: $PATIENT_ID"
    fi
    
    echo -e "\n${GREEN}🎉 Testing complete!${NC}"
}

# Run main function
main "$@"
