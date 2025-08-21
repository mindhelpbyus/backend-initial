#!/bin/bash

# Build and Deploy Script for Healthcare API
# This script builds Lambda functions (patients & doctors), updates CDK stack, and redeploys to LocalStack

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing_deps=()
    
    if ! command_exists node; then
        missing_deps+=("node")
    fi
    
    if ! command_exists npm; then
        missing_deps+=("npm")
    fi
    
    if ! command_exists aws; then
        missing_deps+=("aws-cli")
    fi
    
    if ! command_exists cdklocal; then
        missing_deps+=("cdklocal")
    fi
    
    if ! command_exists docker; then
        missing_deps+=("docker")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_error "Please install the missing dependencies and try again."
        exit 1
    fi
    
    print_success "All prerequisites are installed"
}

# Function to check if LocalStack is running
check_localstack() {
    print_status "Checking LocalStack status..."
    
    if ! curl -s http://localhost:4566/_localstack/health >/dev/null 2>&1; then
        print_error "LocalStack is not running or not accessible"
        print_status "Starting LocalStack with docker-compose..."
        
        if [ -f "docker-compose.yml" ]; then
            docker-compose up -d
            sleep 10  # Wait for LocalStack to start
            
            # Check again
            if ! curl -s http://localhost:4566/_localstack/health >/dev/null 2>&1; then
                print_error "Failed to start LocalStack"
                exit 1
            fi
        else
            print_error "docker-compose.yml not found. Please ensure LocalStack is running."
            exit 1
        fi
    fi
    
    print_success "LocalStack is running"
}

# Function to build Lambda functions
build_lambdas() {
    print_status "Building Lambda functions..."
    
    # Build patients Lambda
    if [ -d "src/lambdas/patients" ]; then
        print_status "Building patients Lambda..."
        cd src/lambdas/patients
        
        # Install dependencies
        if [ -f "package.json" ]; then
            print_status "Installing dependencies..."
            npm install
        fi
        
        # Build TypeScript
        if [ -f "tsconfig.json" ]; then
            print_status "Compiling TypeScript..."
            npx tsc
        fi
        
        cd ../../..
        print_success "Patients Lambda built successfully"
    else
        print_warning "Patients Lambda directory not found, skipping..."
    fi
    
    # Build doctors Lambda
    if [ -d "src/lambdas/doctors" ]; then
        print_status "Building doctors Lambda..."
        cd src/lambdas/doctors
        
        # Install dependencies
        if [ -f "package.json" ]; then
            print_status "Installing dependencies..."
            npm install
        fi
        
        # Build TypeScript
        if [ -f "tsconfig.json" ]; then
            print_status "Compiling TypeScript..."
            npx tsc
        fi
        
        cd ../../..
        print_success "Doctors Lambda built successfully"
    else
        print_warning "Doctors Lambda directory not found, skipping..."
    fi
}

# Function to bootstrap CDK (if needed)
bootstrap_cdk() {
    print_status "Checking CDK bootstrap status..."
    
    cd cdk
    
    # Check if bootstrap is needed
    if ! aws --endpoint-url=http://localhost:4566 s3 ls | grep -q "cdk-"; then
        print_status "Bootstrapping CDK..."
        cdklocal bootstrap
        print_success "CDK bootstrapped successfully"
    else
        print_success "CDK already bootstrapped"
    fi
    
    cd ..
}

# Function to deploy CDK stack
deploy_stack() {
    print_status "Deploying CDK stack..."
    
    cd cdk
    
    # Install CDK dependencies
    if [ -f "requirements.txt" ]; then
        print_status "Installing CDK dependencies..."
        pip install -r requirements.txt
    fi
    
    # Deploy the stack
    print_status "Deploying TelehealthBackend-dev stack..."
    cdklocal deploy --require-approval never
    
    if [ $? -eq 0 ]; then
        print_success "Stack deployed successfully"
    else
        print_error "Stack deployment failed"
        cd ..
        exit 1
    fi
    
    cd ..
}

# Function to get stack outputs
get_stack_outputs() {
    print_status "Retrieving stack outputs..."
    
    local outputs=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].Outputs' 2>/dev/null)
    
    if [ $? -eq 0 ] && [ "$outputs" != "null" ]; then
        echo "$outputs" | jq -r '.[] | "\(.OutputKey): \(.OutputValue)"'
        print_success "Stack outputs retrieved"
    else
        print_warning "Could not retrieve stack outputs"
    fi
}

# Function to test API health
test_api_health() {
    print_status "Testing API health..."
    
    # Get Lambda function name from stack outputs
    local lambda_arn=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].Outputs[?OutputKey==`PatientsLambdaArn`].OutputValue' \
        --output text 2>/dev/null)
    
    if [ -n "$lambda_arn" ] && [ "$lambda_arn" != "None" ]; then
        local function_name=$(echo "$lambda_arn" | cut -d':' -f7)
        print_status "Testing Lambda function: $function_name"
        
        # Create a simple test event
        local test_event='{
            "version": "2.0",
            "routeKey": "GET /health",
            "rawPath": "/health",
            "headers": {"content-type": "application/json"},
            "requestContext": {
                "http": {"method": "GET", "path": "/health"},
                "stage": "local"
            }
        }'
        
        # Invoke the function
        local result=$(aws --endpoint-url=http://localhost:4566 lambda invoke \
            --function-name "$function_name" \
            --payload "$test_event" \
            /tmp/lambda-response.json 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            print_success "Lambda function is responding"
        else
            print_warning "Lambda function test failed, but deployment may still be successful"
        fi
    else
        print_warning "Could not find Lambda function ARN for testing"
    fi
}

# Function to update API explorer configuration
update_api_explorer() {
    print_status "Updating API explorer configuration..."
    
    # Get the correct Lambda function name from stack outputs
    local lambda_arn=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].Outputs[?OutputKey==`PatientsLambdaArn`].OutputValue' \
        --output text 2>/dev/null)
    
    if [ -n "$lambda_arn" ] && [ "$lambda_arn" != "None" ]; then
        local function_name=$(echo "$lambda_arn" | cut -d':' -f7)
        print_status "Updating API explorer with Lambda function: $function_name"
        
        # Update the API explorer HTML file with the correct function name
        if [ -f "api-explorer.html" ]; then
            # Create a backup
            cp api-explorer.html api-explorer.html.bak
            
            # Update the function name in the JavaScript
            sed -i.tmp "s/const LAMBDA_FUNCTION = '[^']*'/const LAMBDA_FUNCTION = '$function_name'/" api-explorer.html
            rm -f api-explorer.html.tmp
            
            print_success "API explorer updated with correct Lambda function name"
        else
            print_warning "API explorer HTML file not found"
        fi
    else
        print_warning "Could not retrieve Lambda function name for API explorer update"
    fi
}

# Function to start API explorer server
start_api_explorer() {
    print_status "Starting API explorer server..."
    
    # Kill any existing server on port 8080
    if lsof -ti:8080 >/dev/null 2>&1; then
        print_status "Stopping existing server on port 8080..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        sleep 2
    fi
    
    # Start the server in background
    if [ -f "scripts/serve-api-explorer.py" ]; then
        python3 scripts/serve-api-explorer.py &
        local server_pid=$!
        sleep 3
        
        # Check if server started successfully
        if curl -s http://localhost:8080 >/dev/null 2>&1; then
            print_success "API explorer server started at http://localhost:8080/api-explorer.html"
            print_status "Server PID: $server_pid"
        else
            print_error "Failed to start API explorer server"
        fi
    else
        print_warning "API explorer server script not found"
    fi
}

# Function to show deployment summary
show_summary() {
    echo
    echo "=================================="
    echo "    DEPLOYMENT SUMMARY"
    echo "=================================="
    echo
    print_success "✅ Lambda functions built and deployed"
    print_success "✅ CDK stack deployed to LocalStack"
    print_success "✅ API explorer updated and running"
    echo
    echo "🔗 API Explorer: http://localhost:8080/api-explorer.html"
    echo "🔗 LocalStack Dashboard: http://localhost:4566"
    echo
    echo "Stack Outputs:"
    get_stack_outputs
    echo
    print_status "To view logs: docker-compose logs -f localstack"
    print_status "To stop services: docker-compose down"
    echo
}

# Main execution
main() {
    echo "=================================="
    echo "  Healthcare API Build & Deploy"
    echo "=================================="
    echo
    
    # Change to project root directory
    cd "$(dirname "$0")/.."
    
    # Run all steps
    check_prerequisites
    check_localstack
    build_lambdas
    bootstrap_cdk
    deploy_stack
    update_api_explorer
    test_api_health
    start_api_explorer
    show_summary
    
    print_success "🎉 Build and deployment completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo
        echo "Build and deploy Healthcare API (Patients & Doctors) to LocalStack"
        echo
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --build-only   Only build Lambda functions, don't deploy"
        echo "  --deploy-only  Only deploy, don't build"
        echo "  --no-server    Don't start the API explorer server"
        echo
        exit 0
        ;;
    --build-only)
        check_prerequisites
        build_lambdas
        print_success "Build completed"
        ;;
    --deploy-only)
        check_prerequisites
        check_localstack
        bootstrap_cdk
        deploy_stack
        update_api_explorer
        test_api_health
        show_summary
        ;;
    --no-server)
        check_prerequisites
        check_localstack
        build_lambdas
        bootstrap_cdk
        deploy_stack
        update_api_explorer
        test_api_health
        print_success "Deployment completed (server not started)"
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown option: $1"
        echo "Use --help for usage information"
        exit 1
        ;;
esac
