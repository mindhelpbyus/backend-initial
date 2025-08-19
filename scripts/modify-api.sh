#!/bin/bash

# API Modification Helper Script
# This script provides utilities for modifying and testing the Patient API

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to show help
show_help() {
    echo "API Modification Helper Script"
    echo
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo
    echo "Commands:"
    echo "  add-endpoint     Add a new API endpoint"
    echo "  modify-handler   Modify existing Lambda handler"
    echo "  test-endpoint    Test a specific endpoint"
    echo "  quick-deploy     Quick build and deploy after changes"
    echo "  watch           Watch for changes and auto-deploy"
    echo "  logs            Show Lambda function logs"
    echo "  status          Show deployment status"
    echo
    echo "Examples:"
    echo "  $0 add-endpoint --path '/health' --method GET"
    echo "  $0 test-endpoint --path '/auth/signup' --method POST"
    echo "  $0 quick-deploy"
    echo "  $0 logs --tail"
    echo
}

# Function to add a new endpoint
add_endpoint() {
    local path=""
    local method=""
    local description=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --path)
                path="$2"
                shift 2
                ;;
            --method)
                method="$2"
                shift 2
                ;;
            --description)
                description="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                return 1
                ;;
        esac
    done
    
    if [[ -z "$path" || -z "$method" ]]; then
        print_error "Path and method are required"
        echo "Usage: $0 add-endpoint --path '/new-endpoint' --method GET [--description 'Description']"
        return 1
    fi
    
    print_status "Adding new endpoint: $method $path"
    
    # Add route to CDK stack
    local stack_file="cdk/backend_stack.py"
    if [[ -f "$stack_file" ]]; then
        print_status "Adding route to CDK stack..."
        
        # Create backup
        cp "$stack_file" "$stack_file.bak"
        
        # Add the new route before the last CfnOutput
        local new_route="        http_api.add_routes(
            path=\"$path\",
            methods=[apigw.HttpMethod.${method}],
            integration=patients_integration
        )"
        
        # Insert before the last CfnOutput
        sed -i.tmp "/CfnOutput.*ApiUrl/i\\
$new_route\\
\\
" "$stack_file"
        rm -f "$stack_file.tmp"
        
        print_success "Route added to CDK stack"
    else
        print_error "CDK stack file not found: $stack_file"
        return 1
    fi
    
    # Add handler logic template
    local handler_file="src/lambdas/patients/src/handler.ts"
    if [[ -f "$handler_file" ]]; then
        print_status "Adding handler template..."
        
        # Create backup
        cp "$handler_file" "$handler_file.bak"
        
        # Add case to switch statement (simplified - user will need to customize)
        local handler_case="    case '$method $path':
      return await handle${method^}${path//\//_}(event);
"
        
        # Add function template
        local handler_function="
async function handle${method^}${path//\//_}(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    // TODO: Implement $method $path logic
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'New endpoint: $method $path',
        description: '${description:-Add your implementation here}'
      })
    };
  } catch (error) {
    console.error('Error in $method $path:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
"
        
        # Add to end of file (before export)
        sed -i.tmp "/export.*handler/i\\
$handler_function\\
" "$handler_file"
        rm -f "$handler_file.tmp"
        
        print_success "Handler template added"
        print_warning "Please customize the handler function: handle${method^}${path//\//_}"
    else
        print_error "Handler file not found: $handler_file"
        return 1
    fi
    
    print_success "Endpoint $method $path added successfully"
    print_status "Run '$0 quick-deploy' to deploy the changes"
}

# Function to test an endpoint
test_endpoint() {
    local path=""
    local method="GET"
    local body=""
    local token=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --path)
                path="$2"
                shift 2
                ;;
            --method)
                method="$2"
                shift 2
                ;;
            --body)
                body="$2"
                shift 2
                ;;
            --token)
                token="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                return 1
                ;;
        esac
    done
    
    if [[ -z "$path" ]]; then
        print_error "Path is required"
        echo "Usage: $0 test-endpoint --path '/auth/signup' [--method POST] [--body '{}'] [--token 'jwt-token']"
        return 1
    fi
    
    print_status "Testing endpoint: $method $path"
    
    # Get Lambda function name
    local lambda_arn=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].Outputs[?OutputKey==`PatientsLambdaArn`].OutputValue' \
        --output text 2>/dev/null)
    
    if [[ -z "$lambda_arn" || "$lambda_arn" == "None" ]]; then
        print_error "Could not find Lambda function. Is the stack deployed?"
        return 1
    fi
    
    local function_name=$(echo "$lambda_arn" | cut -d':' -f7)
    print_status "Using Lambda function: $function_name"
    
    # Create test event
    local headers='{"content-type": "application/json"}'
    if [[ -n "$token" ]]; then
        headers='{"content-type": "application/json", "authorization": "Bearer '"$token"'"}'
    fi
    
    # Create test event using proper JSON formatting
    local test_event
    if [[ -n "$body" ]]; then
        test_event=$(cat <<EOF
{
    "version": "2.0",
    "routeKey": "$method $path",
    "rawPath": "$path",
    "headers": $headers,
    "requestContext": {
        "http": {"method": "$method", "path": "$path"},
        "stage": "local"
    },
    "body": $(echo "$body" | jq -c . | jq -R .)
}
EOF
)
    else
        test_event=$(cat <<EOF
{
    "version": "2.0",
    "routeKey": "$method $path",
    "rawPath": "$path",
    "headers": $headers,
    "requestContext": {
        "http": {"method": "$method", "path": "$path"},
        "stage": "local"
    }
}
EOF
)
    fi
    
    # Invoke Lambda
    print_status "Invoking Lambda function..."
    local response_file="/tmp/lambda-test-response.json"
    local payload_file="/tmp/lambda-test-payload.json"
    
    # Write payload to file to avoid base64 encoding issues
    echo "$test_event" > "$payload_file"
    
    aws --endpoint-url=http://localhost:4566 lambda invoke \
        --function-name "$function_name" \
        --cli-binary-format raw-in-base64-out \
        --payload "file://$payload_file" \
        "$response_file" >/dev/null
    
    if [[ $? -eq 0 ]]; then
        print_success "Lambda invocation successful"
        echo
        echo "Response:"
        echo "========="
        cat "$response_file" | jq . 2>/dev/null || cat "$response_file"
        echo
    else
        print_error "Lambda invocation failed"
        return 1
    fi
}

# Function for quick deploy
quick_deploy() {
    print_status "Starting quick deployment..."
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    # Build and deploy
    ./scripts/build-and-deploy.sh --no-server
    
    print_success "Quick deployment completed"
}

# Function to watch for changes
watch_changes() {
    print_status "Watching for changes in src/ directory..."
    print_status "Press Ctrl+C to stop watching"
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    if command -v fswatch >/dev/null 2>&1; then
        fswatch -o src/ | while read f; do
            print_status "Changes detected, rebuilding..."
            ./scripts/build-and-deploy.sh --no-server
        done
    elif command -v inotifywait >/dev/null 2>&1; then
        while inotifywait -r -e modify,create,delete src/; do
            print_status "Changes detected, rebuilding..."
            ./scripts/build-and-deploy.sh --no-server
        done
    else
        print_error "File watching requires 'fswatch' or 'inotifywait'"
        print_status "Install with: brew install fswatch (macOS) or apt-get install inotify-tools (Linux)"
        return 1
    fi
}

# Function to show logs
show_logs() {
    local tail_logs=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --tail)
                tail_logs=true
                shift
                ;;
            *)
                print_error "Unknown option: $1"
                return 1
                ;;
        esac
    done
    
    print_status "Showing LocalStack logs..."
    
    if [[ "$tail_logs" == true ]]; then
        docker-compose logs -f localstack
    else
        docker-compose logs --tail=50 localstack
    fi
}

# Function to show deployment status
show_status() {
    print_status "Checking deployment status..."
    
    # Check LocalStack
    if curl -s http://localhost:4566/_localstack/health >/dev/null 2>&1; then
        print_success "✅ LocalStack is running"
    else
        print_error "❌ LocalStack is not running"
    fi
    
    # Check API Explorer
    if curl -s http://localhost:8080 >/dev/null 2>&1; then
        print_success "✅ API Explorer is running at http://localhost:8080/api-explorer.html"
    else
        print_warning "⚠️  API Explorer is not running"
    fi
    
    # Check stack
    local stack_status=$(aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].StackStatus' \
        --output text 2>/dev/null)
    
    if [[ -n "$stack_status" && "$stack_status" != "None" ]]; then
        if [[ "$stack_status" == "CREATE_COMPLETE" || "$stack_status" == "UPDATE_COMPLETE" ]]; then
            print_success "✅ CDK Stack: $stack_status"
        else
            print_warning "⚠️  CDK Stack: $stack_status"
        fi
    else
        print_error "❌ CDK Stack not found"
    fi
    
    # Show stack outputs
    echo
    print_status "Stack Outputs:"
    aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \
        --stack-name TelehealthBackend-dev \
        --query 'Stacks[0].Outputs' 2>/dev/null | \
        jq -r '.[] | "  \(.OutputKey): \(.OutputValue)"' 2>/dev/null || \
        print_warning "Could not retrieve stack outputs"
}

# Main execution
main() {
    local command="${1:-}"
    
    if [[ -z "$command" ]]; then
        show_help
        return 0
    fi
    
    # Change to project root directory
    cd "$(dirname "$0")/.."
    
    case "$command" in
        add-endpoint)
            shift
            add_endpoint "$@"
            ;;
        test-endpoint)
            shift
            test_endpoint "$@"
            ;;
        quick-deploy)
            quick_deploy
            ;;
        watch)
            watch_changes
            ;;
        logs)
            shift
            show_logs "$@"
            ;;
        status)
            show_status
            ;;
        --help|-h|help)
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo
            show_help
            return 1
            ;;
    esac
}

# Execute main function
main "$@"
