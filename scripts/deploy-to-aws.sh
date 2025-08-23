#!/bin/bash

# Deploy to AWS Script for Healthcare API
# This script deploys the CDK stack to the actual AWS account

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

# Target AWS Account
TARGET_ACCOUNT="121775527089"
TARGET_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

# Function to check AWS credentials
check_aws_credentials() {
    print_status "Checking AWS credentials..."
    
    if ! command -v aws >/dev/null 2>&1; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check if we can get caller identity
    local caller_identity
    if ! caller_identity=$(aws sts get-caller-identity 2>/dev/null); then
        print_error "AWS credentials are not configured or invalid."
        print_status "Please configure AWS credentials using one of these methods:"
        echo "  1. aws configure"
        echo "  2. Set environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
        echo "  3. Use AWS SSO: aws sso login"
        echo "  4. Use IAM roles if running on EC2"
        exit 1
    fi
    
    # Extract account ID
    local current_account
    current_account=$(echo "$caller_identity" | jq -r '.Account')
    
    if [ "$current_account" != "$TARGET_ACCOUNT" ]; then
        print_error "Current AWS account ($current_account) does not match target account ($TARGET_ACCOUNT)"
        print_status "Please configure credentials for account $TARGET_ACCOUNT"
        exit 1
    fi
    
    print_success "AWS credentials configured for account $TARGET_ACCOUNT"
}

# Function to check CDK prerequisites
check_cdk_prerequisites() {
    print_status "Checking CDK prerequisites..."
    
    if ! command -v cdk >/dev/null 2>&1; then
        print_error "AWS CDK is not installed. Installing..."
        npm install -g aws-cdk
    fi
    
    print_success "CDK is available"
}

# Function to build Lambda functions
build_lambdas() {
    print_status "Building Lambda functions..."
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Build all lambdas using the existing script
    if [ -f "scripts/build-lambdas.sh" ]; then
        chmod +x scripts/build-lambdas.sh
        ./scripts/build-lambdas.sh
    else
        print_error "build-lambdas.sh script not found"
        exit 1
    fi
    
    print_success "Lambda functions built successfully"
}

# Function to bootstrap CDK (if needed)
bootstrap_cdk() {
    print_status "Checking CDK bootstrap status..."
    
    cd cdk
    
    # Check if bootstrap is needed by trying to describe the bootstrap stack
    if ! aws cloudformation describe-stacks --stack-name CDKToolkit --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Bootstrapping CDK for account $TARGET_ACCOUNT in region $TARGET_REGION..."
        
        # Try bootstrap with custom execution policies to handle permission issues
        print_status "Attempting CDK bootstrap with custom policies..."
        if ! cdk bootstrap aws://$TARGET_ACCOUNT/$TARGET_REGION --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess 2>/dev/null; then
            print_warning "Standard bootstrap failed, trying alternative approach..."
            
            # Try with force flag
            if ! cdk bootstrap aws://$TARGET_ACCOUNT/$TARGET_REGION --force 2>/dev/null; then
                print_error "CDK bootstrap failed due to insufficient permissions."
                print_status "Please ensure the user has the following permissions:"
                echo "  - cloudformation:*"
                echo "  - s3:*"
                echo "  - iam:*"
                echo "  - ssm:*"
                print_status "You can attach the policy from aws-permissions-policy.json to resolve this."
                cd ..
                exit 1
            fi
        fi
        
        print_success "CDK bootstrapped successfully"
    else
        print_success "CDK already bootstrapped"
    fi
    
    cd ..
}

# Function to synthesize CDK stack
synthesize_stack() {
    print_status "Synthesizing CDK stack..."
    
    cd cdk
    
    # Set environment variables for the target account
    export CDK_DEFAULT_ACCOUNT="$TARGET_ACCOUNT"
    export CDK_DEFAULT_REGION="$TARGET_REGION"
    export STAGE="prod"  # Use prod for AWS deployment
    
    # Synthesize the stack
    cdk synth
    
    if [ $? -eq 0 ]; then
        print_success "Stack synthesized successfully"
    else
        print_error "Stack synthesis failed"
        cd ..
        exit 1
    fi
    
    cd ..
}

# Function to deploy CDK stack
deploy_stack() {
    print_status "Deploying CDK stack to AWS..."
    
    cd cdk
    
    # Set environment variables for the target account
    export CDK_DEFAULT_ACCOUNT="$TARGET_ACCOUNT"
    export CDK_DEFAULT_REGION="$TARGET_REGION"
    export STAGE="prod"  # Use prod for AWS deployment
    
    # Deploy the stack with enhanced error handling
    print_status "Deploying TelehealthBackend-prod stack..."
    
    # Try deployment with different approaches
    if cdk deploy --require-approval never 2>/dev/null; then
        print_success "Stack deployed successfully"
    elif cdk deploy --require-approval never --force 2>/dev/null; then
        print_success "Stack deployed successfully (with force flag)"
    else
        print_error "Stack deployment failed"
        print_status "Attempting to get more detailed error information..."
        
        # Try to get more detailed error
        cdk deploy --require-approval never --verbose 2>&1 | tail -20
        
        print_error "Deployment failed. Common issues:"
        echo "  1. Insufficient IAM permissions"
        echo "  2. Resource limits exceeded"
        echo "  3. Stack already exists with different configuration"
        print_status "Please check the error above and resolve the issue."
        print_status "You may need to attach the policy from aws-permissions-policy.json"
        
        cd ..
        exit 1
    fi
    
    cd ..
}

# Function to get stack outputs
get_stack_outputs() {
    print_status "Retrieving stack outputs..."
    
    local outputs
    outputs=$(aws cloudformation describe-stacks \
        --stack-name TelehealthBackend-prod \
        --region "$TARGET_REGION" \
        --query 'Stacks[0].Outputs' 2>/dev/null)
    
    if [ $? -eq 0 ] && [ "$outputs" != "null" ]; then
        echo "$outputs" | jq -r '.[] | "\(.OutputKey): \(.OutputValue)"'
        print_success "Stack outputs retrieved"
    else
        print_warning "Could not retrieve stack outputs"
    fi
}

# Function to show deployment summary
show_summary() {
    echo
    echo "=================================="
    echo "    AWS DEPLOYMENT SUMMARY"
    echo "=================================="
    echo
    print_success "✅ Lambda functions built and deployed"
    print_success "✅ CDK stack deployed to AWS account $TARGET_ACCOUNT"
    print_success "✅ Region: $TARGET_REGION"
    echo
    echo "Stack Outputs:"
    get_stack_outputs
    echo
    print_status "To view CloudFormation stack: https://console.aws.amazon.com/cloudformation/home?region=$TARGET_REGION"
    print_status "To view Lambda functions: https://console.aws.amazon.com/lambda/home?region=$TARGET_REGION"
    print_status "To view DynamoDB tables: https://console.aws.amazon.com/dynamodb/home?region=$TARGET_REGION"
    echo
}

# Main execution
main() {
    echo "=================================="
    echo "  Healthcare API AWS Deployment"
    echo "=================================="
    echo "Target Account: $TARGET_ACCOUNT"
    echo "Target Region: $TARGET_REGION"
    echo "=================================="
    echo
    
    # Change to project root directory
    cd "$(dirname "$0")/.."
    
    # Run all steps
    check_aws_credentials
    check_cdk_prerequisites
    build_lambdas
    bootstrap_cdk
    synthesize_stack
    deploy_stack
    show_summary
    
    print_success "🎉 AWS deployment completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo
        echo "Deploy Healthcare API to AWS account $TARGET_ACCOUNT"
        echo
        echo "Options:"
        echo "  --help, -h        Show this help message"
        echo "  --synth-only      Only synthesize, don't deploy"
        echo "  --deploy-only     Only deploy, don't build"
        echo
        echo "Prerequisites:"
        echo "  - AWS CLI configured with credentials for account $TARGET_ACCOUNT"
        echo "  - Node.js and npm installed"
        echo "  - Python 3 and pip installed"
        echo
        exit 0
        ;;
    --synth-only)
        check_aws_credentials
        check_cdk_prerequisites
        build_lambdas
        synthesize_stack
        print_success "Synthesis completed"
        ;;
    --deploy-only)
        check_aws_credentials
        check_cdk_prerequisites
        bootstrap_cdk
        deploy_stack
        show_summary
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
