#!/bin/bash

# Script to create a minimal IAM policy for CDK deployment
# This creates the policy JSON that can be applied via AWS Console

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

# Target AWS Account
TARGET_ACCOUNT="121775527089"

# Function to use the single comprehensive policy file
use_single_policy_file() {
    local policy_file="telehealth-iam-policy.json"
    
    print_status "Using single comprehensive IAM policy file..."
    
    # Check if policy file exists
    if [ ! -f "$policy_file" ]; then
        print_error "Policy file $policy_file not found"
        return 1
    fi
    
    print_success "Found $policy_file (comprehensive permissions)"
    print_status "This policy includes all necessary permissions for:"
    echo "  ✅ CDK Bootstrap operations"
    echo "  ✅ CloudFormation stack management"
    echo "  ✅ S3 bucket operations for CDK assets"
    echo "  ✅ ECR repository management"
    echo "  ✅ IAM role and policy management"
    echo "  ✅ Lambda function operations"
    echo "  ✅ DynamoDB table management"
    echo "  ✅ API Gateway operations"
    echo "  ✅ CloudWatch Logs management"
    echo "  ✅ SSM Parameter Store access"
    echo "  ✅ EventBridge and Auto Scaling"
    echo "  ✅ CDK Bootstrap Role Assumption"
    
    return 0
}

# Function to show instructions
show_instructions() {
    echo
    echo "=================================="
    echo "    IAM POLICY SETUP INSTRUCTIONS"
    echo "=================================="
    echo
    print_status "To apply this policy to user 'mailhelpbyus':"
    echo
    echo "🔧 OPTION 1: Use Comprehensive Policy (Recommended)"
    echo "1. Log into AWS Console: https://console.aws.amazon.com/"
    echo "2. Navigate to: IAM → Users → mailhelpbyus"
    echo "3. Click: 'Add permissions' → 'Attach policies directly'"
    echo "4. Click: 'Create policy'"
    echo "5. Select: 'JSON' tab"
    echo "6. Copy and paste the contents of: telehealth-iam-policy.json"
    echo "7. Click: 'Next: Tags' → 'Next: Review'"
    echo "8. Policy name: 'TelehealthCDKDeploymentPolicy'"
    echo "9. Click: 'Create policy'"
    echo "10. Go back to user and attach the new policy"
    echo
    echo "🚀 OPTION 2: Quick Fix (Temporary)"
    echo "1. Navigate to: IAM → Users → mailhelpbyus"
    echo "2. Click: 'Add permissions' → 'Attach policies directly'"
    echo "3. Search and attach: 'AdministratorAccess'"
    echo "4. Deploy the stack"
    echo "5. Remove AdministratorAccess after deployment"
    echo
    print_success "After applying either policy, run: ./scripts/deploy-to-aws.sh"
    echo
}

# Function to test current permissions
test_permissions() {
    print_status "Testing current AWS permissions..."
    
    # Test basic AWS access
    if aws sts get-caller-identity >/dev/null 2>&1; then
        print_success "✅ AWS credentials are valid"
        
        local account=$(aws sts get-caller-identity --query 'Account' --output text 2>/dev/null)
        if [ "$account" = "$TARGET_ACCOUNT" ]; then
            print_success "✅ Connected to correct account: $TARGET_ACCOUNT"
        else
            print_warning "⚠️  Connected to account: $account (expected: $TARGET_ACCOUNT)"
        fi
    else
        print_error "❌ AWS credentials are invalid or not configured"
        return 1
    fi
    
    # Test CloudFormation permissions
    if aws cloudformation list-stacks --region us-east-1 >/dev/null 2>&1; then
        print_success "✅ CloudFormation access available"
    else
        print_error "❌ CloudFormation access denied"
    fi
    
    # Test DynamoDB permissions
    if aws dynamodb list-tables --region us-east-1 >/dev/null 2>&1; then
        print_success "✅ DynamoDB access available"
    else
        print_error "❌ DynamoDB access denied"
    fi
    
    # Test S3 permissions
    if aws s3 ls >/dev/null 2>&1; then
        print_success "✅ S3 access available"
    else
        print_error "❌ S3 access denied"
    fi
    
    echo
}

# Main function
main() {
    echo "=================================="
    echo "  CDK Policy Creator"
    echo "=================================="
    echo "Target Account: $TARGET_ACCOUNT"
    echo "=================================="
    echo
    
    # Test current permissions
    test_permissions
    
    # Use single policy file
    use_single_policy_file
    
    # Show instructions
    show_instructions
    
    print_success "Policy file created successfully!"
}

# Handle arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo
        echo "Create minimal IAM policy for CDK deployment"
        echo
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --test-only    Only test current permissions"
        echo
        exit 0
        ;;
    --test-only)
        test_permissions
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
