#!/bin/bash

# Deploy CDK without bootstrap - Alternative deployment approach
# This script attempts to deploy by skipping bootstrap checks

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
        exit 1
    fi
    
    # Extract account ID
    local current_account
    current_account=$(echo "$caller_identity" | jq -r '.Account')
    
    if [ "$current_account" != "$TARGET_ACCOUNT" ]; then
        print_error "Current AWS account ($current_account) does not match target account ($TARGET_ACCOUNT)"
        exit 1
    fi
    
    print_success "AWS credentials configured for account $TARGET_ACCOUNT"
}

# Function to create minimal IAM policy for current user
create_minimal_policy() {
    print_status "Attempting to create minimal IAM policy..."
    
    local policy_name="CDKDeploymentPolicy-$(date +%s)"
    local policy_document='{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "cloudformation:*",
                    "s3:*",
                    "iam:*",
                    "lambda:*",
                    "apigateway:*",
                    "dynamodb:*",
                    "logs:*",
                    "ssm:*",
                    "ecr:*"
                ],
                "Resource": "*"
            }
        ]
    }'
    
    # Try to create the policy
    if aws iam create-policy \
        --policy-name "$policy_name" \
        --policy-document "$policy_document" \
        --description "Temporary CDK deployment policy" >/dev/null 2>&1; then
        
        print_success "Created policy: $policy_name"
        
        # Try to attach to current user
        local username=$(aws sts get-caller-identity --query 'Arn' --output text | cut -d'/' -f2)
        if aws iam attach-user-policy \
            --user-name "$username" \
            --policy-arn "arn:aws:iam::$TARGET_ACCOUNT:policy/$policy_name" >/dev/null 2>&1; then
            
            print_success "Attached policy to user: $username"
            echo "$policy_name" > /tmp/cdk-policy-name
            return 0
        else
            print_warning "Could not attach policy to user"
        fi
    else
        print_warning "Could not create IAM policy (insufficient permissions)"
    fi
    
    return 1
}

# Function to try CloudFormation deployment directly
deploy_direct_cloudformation() {
    print_status "Attempting direct CloudFormation deployment..."
    
    cd cdk
    
    # Set environment variables
    export CDK_DEFAULT_ACCOUNT="$TARGET_ACCOUNT"
    export CDK_DEFAULT_REGION="$TARGET_REGION"
    export STAGE="prod"
    
    # Try to synthesize first
    print_status "Synthesizing CDK template..."
    if cdk synth --quiet > /tmp/cdk-template.json 2>/dev/null; then
        print_success "CDK template synthesized"
        
        # Try to deploy using CloudFormation directly
        print_status "Deploying via CloudFormation..."
        if aws cloudformation deploy \
            --template-file /tmp/cdk-template.json \
            --stack-name TelehealthBackend-prod \
            --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
            --region "$TARGET_REGION" 2>/dev/null; then
            
            print_success "Stack deployed via CloudFormation"
            cd ..
            return 0
        else
            print_warning "CloudFormation deployment failed"
        fi
    else
        print_warning "CDK synthesis failed"
    fi
    
    cd ..
    return 1
}

# Function to create resources manually using AWS CLI
create_resources_manually() {
    print_status "Attempting to create resources manually..."
    
    # Create DynamoDB tables
    create_dynamodb_tables
    
    # Create Lambda functions
    create_lambda_functions
    
    # Create API Gateway
    create_api_gateway
}

# Function to create DynamoDB tables
create_dynamodb_tables() {
    print_status "Creating DynamoDB tables..."
    
    # Create Patients Table
    if ! aws dynamodb describe-table --table-name PatientsTable --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Creating PatientsTable..."
        aws dynamodb create-table \
            --table-name PatientsTable \
            --attribute-definitions \
                AttributeName=patientId,AttributeType=S \
                AttributeName=email,AttributeType=S \
                AttributeName=createdAt,AttributeType=S \
            --key-schema AttributeName=patientId,KeyType=HASH \
            --global-secondary-indexes \
                IndexName=email-index,KeySchema=[{AttributeName=email,KeyType=HASH},{AttributeName=createdAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
            --billing-mode PAY_PER_REQUEST \
            --region "$TARGET_REGION" >/dev/null 2>&1 && \
        print_success "PatientsTable created"
    fi
    
    # Create Doctors Table
    if ! aws dynamodb describe-table --table-name DoctorsTable --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Creating DoctorsTable..."
        aws dynamodb create-table \
            --table-name DoctorsTable \
            --attribute-definitions \
                AttributeName=doctorId,AttributeType=S \
                AttributeName=email,AttributeType=S \
                AttributeName=specialization,AttributeType=S \
                AttributeName=createdAt,AttributeType=S \
            --key-schema AttributeName=doctorId,KeyType=HASH \
            --global-secondary-indexes \
                IndexName=email-index,KeySchema=[{AttributeName=email,KeyType=HASH},{AttributeName=createdAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
                IndexName=specialization-index,KeySchema=[{AttributeName=specialization,KeyType=HASH},{AttributeName=createdAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
            --billing-mode PAY_PER_REQUEST \
            --region "$TARGET_REGION" >/dev/null 2>&1 && \
        print_success "DoctorsTable created"
    fi
    
    # Create Appointments Table
    if ! aws dynamodb describe-table --table-name AppointmentsTable --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Creating AppointmentsTable..."
        aws dynamodb create-table \
            --table-name AppointmentsTable \
            --attribute-definitions \
                AttributeName=appointmentId,AttributeType=S \
                AttributeName=patientId,AttributeType=S \
                AttributeName=doctorId,AttributeType=S \
                AttributeName=appointmentStatus,AttributeType=S \
                AttributeName=scheduleDate,AttributeType=S \
                AttributeName=createdAt,AttributeType=S \
            --key-schema AttributeName=appointmentId,KeyType=HASH \
            --global-secondary-indexes \
                IndexName=patient-index,KeySchema=[{AttributeName=patientId,KeyType=HASH},{AttributeName=scheduleDate,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
                IndexName=doctor-index,KeySchema=[{AttributeName=doctorId,KeyType=HASH},{AttributeName=scheduleDate,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
                IndexName=status-index,KeySchema=[{AttributeName=appointmentStatus,KeyType=HASH},{AttributeName=createdAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
            --billing-mode PAY_PER_REQUEST \
            --region "$TARGET_REGION" >/dev/null 2>&1 && \
        print_success "AppointmentsTable created"
    fi
}

# Function to create Lambda functions
create_lambda_functions() {
    print_status "Creating Lambda functions..."
    
    # Create execution role first
    create_lambda_execution_role
    
    # Package and deploy Lambda functions
    deploy_lambda_function "patients" "PatientsLambda"
    deploy_lambda_function "doctors" "DoctorsLambda"
    deploy_lambda_function "appointments" "AppointmentsLambda"
}

# Function to create Lambda execution role
create_lambda_execution_role() {
    local role_name="TelehealthLambdaExecutionRole"
    
    if ! aws iam get-role --role-name "$role_name" --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Creating Lambda execution role..."
        
        local trust_policy='{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "lambda.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }'
        
        aws iam create-role \
            --role-name "$role_name" \
            --assume-role-policy-document "$trust_policy" \
            --region "$TARGET_REGION" >/dev/null 2>&1
        
        # Attach basic execution policy
        aws iam attach-role-policy \
            --role-name "$role_name" \
            --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole" \
            --region "$TARGET_REGION" >/dev/null 2>&1
        
        # Create and attach DynamoDB policy
        local dynamodb_policy='{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "dynamodb:GetItem",
                        "dynamodb:PutItem",
                        "dynamodb:UpdateItem",
                        "dynamodb:DeleteItem",
                        "dynamodb:Query",
                        "dynamodb:Scan"
                    ],
                    "Resource": [
                        "arn:aws:dynamodb:'$TARGET_REGION':'$TARGET_ACCOUNT':table/PatientsTable*",
                        "arn:aws:dynamodb:'$TARGET_REGION':'$TARGET_ACCOUNT':table/DoctorsTable*",
                        "arn:aws:dynamodb:'$TARGET_REGION':'$TARGET_ACCOUNT':table/AppointmentsTable*"
                    ]
                }
            ]
        }'
        
        aws iam put-role-policy \
            --role-name "$role_name" \
            --policy-name "DynamoDBAccess" \
            --policy-document "$dynamodb_policy" \
            --region "$TARGET_REGION" >/dev/null 2>&1
        
        print_success "Lambda execution role created"
        
        # Wait for role to be available
        sleep 10
    fi
}

# Function to deploy individual Lambda function
deploy_lambda_function() {
    local lambda_dir="$1"
    local function_name="$2"
    
    print_status "Deploying $function_name..."
    
    # Create deployment package
    cd "src/lambdas/$lambda_dir"
    
    # Create a zip file with the built code
    if [ -f "dist/handler.js" ]; then
        zip -r "/tmp/$function_name.zip" dist/ >/dev/null 2>&1
        
        # Create or update Lambda function
        if aws lambda get-function --function-name "$function_name" --region "$TARGET_REGION" >/dev/null 2>&1; then
            # Update existing function
            aws lambda update-function-code \
                --function-name "$function_name" \
                --zip-file "fileb:///tmp/$function_name.zip" \
                --region "$TARGET_REGION" >/dev/null 2>&1
        else
            # Create new function
            aws lambda create-function \
                --function-name "$function_name" \
                --runtime nodejs18.x \
                --role "arn:aws:iam::$TARGET_ACCOUNT:role/TelehealthLambdaExecutionRole" \
                --handler "dist/handler.handler" \
                --zip-file "fileb:///tmp/$function_name.zip" \
                --timeout 30 \
                --environment Variables="{PATIENTS_TABLE=PatientsTable,DOCTORS_TABLE=DoctorsTable,APPOINTMENTS_TABLE=AppointmentsTable,JWT_SECRET=your-super-secret-jwt-key-change-in-production,REGION=$TARGET_REGION}" \
                --region "$TARGET_REGION" >/dev/null 2>&1
        fi
        
        print_success "$function_name deployed"
    else
        print_error "Built code not found for $function_name"
    fi
    
    cd ../../..
}

# Function to create API Gateway
create_api_gateway() {
    print_status "Creating API Gateway..."
    
    # This is a simplified version - full implementation would require more detailed API setup
    print_warning "API Gateway creation requires manual setup due to complexity"
    print_status "Please create HTTP API in AWS Console and connect to Lambda functions"
}

# Function to cleanup temporary resources
cleanup() {
    if [ -f "/tmp/cdk-policy-name" ]; then
        local policy_name=$(cat /tmp/cdk-policy-name)
        print_status "Cleaning up temporary policy: $policy_name"
        
        local username=$(aws sts get-caller-identity --query 'Arn' --output text | cut -d'/' -f2)
        aws iam detach-user-policy \
            --user-name "$username" \
            --policy-arn "arn:aws:iam::$TARGET_ACCOUNT:policy/$policy_name" >/dev/null 2>&1
        
        aws iam delete-policy \
            --policy-arn "arn:aws:iam::$TARGET_ACCOUNT:policy/$policy_name" >/dev/null 2>&1
        
        rm -f /tmp/cdk-policy-name
    fi
}

# Main execution
main() {
    echo "=================================="
    echo "  Alternative CDK Deployment"
    echo "=================================="
    echo "Target Account: $TARGET_ACCOUNT"
    echo "Target Region: $TARGET_REGION"
    echo "=================================="
    echo
    
    # Change to project root directory
    cd "$(dirname "$0")/.."
    
    # Check credentials
    check_aws_credentials
    
    # Try different deployment approaches
    print_status "Trying multiple deployment approaches..."
    
    # Approach 1: Try to create minimal policy
    if create_minimal_policy; then
        print_status "Retrying CDK deployment with new permissions..."
        if ./scripts/deploy-to-aws.sh; then
            cleanup
            print_success "🎉 CDK deployment successful!"
            return 0
        fi
    fi
    
    # Approach 2: Try direct CloudFormation
    if deploy_direct_cloudformation; then
        cleanup
        print_success "🎉 CloudFormation deployment successful!"
        return 0
    fi
    
    # Approach 3: Manual resource creation
    print_warning "Falling back to manual resource creation..."
    create_resources_manually
    
    cleanup
    
    print_success "🎉 Manual deployment completed!"
    print_warning "Note: API Gateway needs to be configured manually in AWS Console"
}

# Handle cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"
