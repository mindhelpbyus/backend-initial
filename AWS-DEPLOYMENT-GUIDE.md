# AWS Deployment Guide for Telehealth Backend

## 🚨 Current Issue: IAM Permissions

The deployment failed because the IAM user `mailhelpbyus` lacks the necessary permissions to perform CDK operations. Here's how to resolve this:

## 🔧 Solution Options

### Option 1: Attach Required Policy to User (Recommended)

1. **Log into AWS Console** as an administrator
2. **Navigate to IAM** → Users → `mailhelpbyus`
3. **Click "Add permissions"** → "Attach policies directly"
4. **Create a new policy** using the JSON from `aws-permissions-policy.json`
5. **Attach the policy** to the user

### Option 2: Use Administrator Access (Quick Fix)

1. **Navigate to IAM** → Users → `mailhelpbyus`
2. **Attach the policy**: `AdministratorAccess`
3. **Note**: This gives full access - use with caution

### Option 3: Use Different Credentials

Use credentials for a user/role that already has sufficient permissions:

```bash
# Configure different credentials
aws configure --profile admin
# Then use the profile
export AWS_PROFILE=admin
```

## 📋 Required Permissions Summary

The user needs permissions for:
- **CloudFormation**: Create/update/delete stacks
- **S3**: CDK asset storage buckets
- **IAM**: Create roles and policies for Lambda functions
- **Lambda**: Create and manage Lambda functions
- **DynamoDB**: Create and manage tables
- **API Gateway**: Create HTTP APIs
- **CloudWatch Logs**: Create log groups
- **ECR**: Container registry (for CDK assets)

## 🚀 Deployment Steps (After Fixing Permissions)

1. **Verify credentials work**:
   ```bash
   aws sts get-caller-identity
   ```

2. **Run the deployment script**:
   ```bash
   ./scripts/deploy-to-aws.sh
   ```

3. **Monitor the deployment**:
   - The script will show progress
   - CDK bootstrap will run first (one-time setup)
   - Then the main stack deployment

## 📊 Expected Deployment Timeline

- **CDK Bootstrap**: 2-3 minutes (first time only)
- **Stack Deployment**: 5-10 minutes
- **Total Time**: ~7-13 minutes

## 🎯 What Gets Deployed

### DynamoDB Tables
- `PatientsTable` - Patient records with email GSI
- `DoctorsTable` - Doctor profiles with email and specialization GSIs
- `AppointmentsTable` - Appointments with patient, doctor, and status GSIs

### Lambda Functions
- `PatientsLambda` - Patient management and authentication
- `DoctorsLambda` - Doctor profile management
- `AppointmentsLambda` - Appointment scheduling and management

### API Gateway
- HTTP API with CORS enabled
- Routes for all patient, doctor, and appointment operations
- Authentication endpoints

### IAM Resources
- Lambda execution role with DynamoDB permissions
- Appropriate policies for secure access

## 🔍 Troubleshooting

### If Bootstrap Fails Again
```bash
# Try manual bootstrap with specific permissions
cdk bootstrap aws://121775527089/us-east-1 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
```

### If Stack Deployment Fails
```bash
# Check CloudFormation console for detailed error messages
# Or run with verbose logging
cdk deploy --verbose
```

### Common Issues
1. **Insufficient permissions**: Attach the provided policy
2. **Region mismatch**: Ensure you're deploying to `us-east-1`
3. **Account mismatch**: Verify credentials are for account `121775527089`

## 📱 Post-Deployment

After successful deployment, you'll receive:
- **API Gateway URL**: Use this for frontend integration
- **Lambda Function ARNs**: For monitoring and debugging
- **DynamoDB Table Names**: For data management

## 🔐 Security Considerations

1. **Remove AdministratorAccess** after deployment if used
2. **Use least-privilege policies** in production
3. **Enable CloudTrail** for audit logging
4. **Set up monitoring** with CloudWatch alarms

## 📞 Support

If you continue to experience issues:
1. Check the CloudFormation console for detailed error messages
2. Verify all permissions are correctly attached
3. Ensure the AWS CLI is configured for the correct account and region

---

**Next Step**: Fix the IAM permissions using one of the options above, then run `./scripts/deploy-to-aws.sh`
