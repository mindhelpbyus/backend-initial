#!/bin/bash

# Fix CDK Bootstrap Issues
# This script addresses the specific bootstrap and role assumption problems

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
TARGET_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

# Function to check current permissions
check_permissions() {
    print_status "Checking current permissions..."
    
    # Check STS permissions
    if aws sts get-caller-identity >/dev/null 2>&1; then
        print_success "✅ STS access available"
    else
        print_error "❌ STS access denied"
        return 1
    fi
    
    # Check S3 permissions
    if aws s3 ls >/dev/null 2>&1; then
        print_success "✅ S3 access available"
    else
        print_error "❌ S3 access denied - CDK bootstrap will fail"
        return 1
    fi
    
    # Check CloudFormation permissions
    if aws cloudformation list-stacks --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_success "✅ CloudFormation access available"
    else
        print_error "❌ CloudFormation access denied"
        return 1
    fi
    
    return 0
}

# Function to clean up existing bootstrap resources
cleanup_bootstrap() {
    print_status "Cleaning up existing bootstrap resources..."
    
    # Delete CDK bootstrap stack if it exists
    if aws cloudformation describe-stacks --stack-name CDKToolkit --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_status "Deleting existing CDK bootstrap stack..."
        aws cloudformation delete-stack --stack-name CDKToolkit --region "$TARGET_REGION"
        
        print_status "Waiting for stack deletion to complete..."
        aws cloudformation wait stack-delete-complete --stack-name CDKToolkit --region "$TARGET_REGION"
        print_success "CDK bootstrap stack deleted"
    fi
    
    # Clean up CDK assets bucket if it exists
    local bucket_name="cdk-hnb659fds-assets-$TARGET_ACCOUNT-$TARGET_REGION"
    if aws s3 ls "s3://$bucket_name" >/dev/null 2>&1; then
        print_status "Cleaning up CDK assets bucket: $bucket_name"
        aws s3 rm "s3://$bucket_name" --recursive >/dev/null 2>&1 || true
        aws s3 rb "s3://$bucket_name" >/dev/null 2>&1 || true
        print_success "CDK assets bucket cleaned up"
    fi
}

# Function to bootstrap CDK with proper trust policy
bootstrap_cdk_with_trust() {
    print_status "Bootstrapping CDK with proper trust policy..."
    
    cd cdk
    
    # Get current user ARN for trust policy
    local user_arn=$(aws sts get-caller-identity --query 'Arn' --output text)
    print_status "Current user ARN: $user_arn"
    
    # Bootstrap with trust policy that allows the current user
    print_status "Running CDK bootstrap with trust policy..."
    if cdk bootstrap aws://$TARGET_ACCOUNT/$TARGET_REGION \
        --trust "$user_arn" \
        --cloudformation-execution-policies "arn:aws:iam::aws:policy/AdministratorAccess" \
        --verbose; then
        
        print_success "CDK bootstrap completed successfully"
        cd ..
        return 0
    else
        print_error "CDK bootstrap failed"
        cd ..
        return 1
    fi
}

# Function to verify bootstrap
verify_bootstrap() {
    print_status "Verifying CDK bootstrap..."
    
    # Check if CDK bootstrap stack exists
    if aws cloudformation describe-stacks --stack-name CDKToolkit --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_success "✅ CDK bootstrap stack exists"
    else
        print_error "❌ CDK bootstrap stack not found"
        return 1
    fi
    
    # Check if assets bucket exists
    local bucket_name="cdk-hnb659fds-assets-$TARGET_ACCOUNT-$TARGET_REGION"
    if aws s3 ls "s3://$bucket_name" >/dev/null 2>&1; then
        print_success "✅ CDK assets bucket exists: $bucket_name"
    else
        print_error "❌ CDK assets bucket not found: $bucket_name"
        return 1
    fi
    
    # Check SSM parameter
    if aws ssm get-parameter --name "/cdk-bootstrap/hnb659fds/version" --region "$TARGET_REGION" >/dev/null 2>&1; then
        print_success "✅ CDK bootstrap SSM parameter exists"
    else
        print_error "❌ CDK bootstrap SSM parameter not found"
        return 1
    fi
    
    return 0
}

# Function to show next steps
show_next_steps() {
    echo
    echo "=================================="
    echo "    NEXT STEPS"
    echo "=================================="
    echo
    print_success "CDK Bootstrap is now properly configured!"
    echo
    print_status "You can now deploy the stack:"
    echo "  ./scripts/deploy-to-aws.sh"
    echo
    print_status "Or deploy directly with CDK:"
    echo "  cd cdk && cdk deploy --require-approval never"
    echo
}

# Main function
main() {
    echo "=================================="
    echo "  CDK Bootstrap Fix"
    echo "=================================="
    echo "Target Account: $TARGET_ACCOUNT"
    echo "Target Region: $TARGET_REGION"
    echo "=================================="
    echo
    
    # Check permissions first
    if ! check_permissions; then
        print_error "Insufficient permissions. Please apply the policy from cdk-deployment-policy.json first."
        exit 1
    fi
    
    # Clean up existing resources
    cleanup_bootstrap
    
    # Bootstrap with proper trust policy
    if bootstrap_cdk_with_trust; then
        # Verify bootstrap
        if verify_bootstrap; then
            show_next_steps
            print_success "🎉 CDK Bootstrap fix completed successfully!"
        else
            print_error "Bootstrap verification failed"
            exit 1
        fi
    else
        print_error "Bootstrap failed"
        exit 1
    fi
}

# Handle arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo
        echo "Fix CDK bootstrap issues for account $TARGET_ACCOUNT"
        echo
        echo "Options:"
        echo "  --help, -h        Show this help message"
        echo "  --cleanup-only    Only cleanup existing resources"
        echo "  --verify-only     Only verify current bootstrap"
        echo
        exit 0
        ;;
    --cleanup-only)
        check_permissions
        cleanup_bootstrap
        print_success "Cleanup completed"
        ;;
    --verify-only)
        verify_bootstrap
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
