# AWS API Gateway Authentication Issue - Debug Guide

## 🔍 Problem Analysis

The error "The security token included in the request is invalid" is occurring even for endpoints that should not require authentication (like `/auth/signup`). 

## 📊 Current Status

✅ **CORS Issues Resolved**: Proxy is working correctly  
✅ **API Gateway Deployed**: https://lf4digbabc.execute-api.us-east-1.amazonaws.com/  
✅ **No API Gateway Authorizer**: All routes have `AuthorizationType: NONE`  
❌ **Lambda Function Issue**: All requests returning 500 errors  

## 🧪 Debugging Steps

### Step 1: Test Direct API Gateway Access

Run the direct test script to bypass the proxy:

```bash
# Test with Python script
python3 test-direct-aws.py https://lf4digbabc.execute-api.us-east-1.amazonaws.com

# Test with curl script
./test-curl-aws.sh https://lf4digbabc.execute-api.us-east-1.amazonaws.com
```

### Step 2: Check CloudWatch Logs

1. Go to AWS Console → CloudWatch → Log Groups
2. Look for these log groups:
   - `/aws/lambda/PatientsLambda`
   - `/aws/lambda/DoctorsLambda` 
   - `/aws/lambda/AppointmentsLambda`
   - `/aws/lambda/ChatbotLambda`

3. Check for error messages in the logs when making requests

### Step 3: Check Lambda Function Configuration

1. Go to AWS Console → Lambda
2. Check these functions:
   - `TelehealthBackend-prod-PatientsLambda*`
   - `TelehealthBackend-prod-DoctorsLambda*`
   - `TelehealthBackend-prod-AppointmentsLambda*`

3. Verify environment variables are set correctly:
   - `JWT_SECRET`
   - `PATIENTS_TABLE` / `DOCTORS_TABLE` / `APPOINTMENTS_TABLE`
   - `REGION`

### Step 4: Test Lambda Functions Directly

Use AWS Console to test Lambda functions directly with test events.

## 🔧 Potential Issues & Solutions

### Issue 1: JWT Secret Mismatch
**Problem**: Lambda might be using a different JWT secret than expected  
**Solution**: Check environment variables in Lambda configuration

### Issue 2: DynamoDB Permissions
**Problem**: Lambda might not have permissions to access DynamoDB  
**Solution**: Check IAM role permissions

### Issue 3: Lambda Runtime Errors
**Problem**: Code might have runtime errors (missing dependencies, etc.)  
**Solution**: Check CloudWatch logs for detailed error messages

### Issue 4: API Gateway Integration Issues
**Problem**: API Gateway might not be properly integrated with Lambda  
**Solution**: Check API Gateway configuration and test integration

## 📝 Expected Behavior

For endpoints that don't require authentication:
- `/auth/signup` - Should work without any token
- `/auth/login` - Should work without any token  
- `/patients` (GET) - Should work without any token
- `/doctors` (GET) - Should work without any token

## 🚀 Quick Fix Commands

```bash
# View recent Lambda logs
python3 scripts/view-logs.py

# Test API directly
curl -X GET https://lf4digbabc.execute-api.us-east-1.amazonaws.com/doctors

# Test signup directly
curl -X POST https://lf4digbabc.execute-api.us-east-1.amazonaws.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📞 Next Steps

1. Run the direct tests to confirm if the issue is in the proxy or AWS
2. Check CloudWatch logs for specific error messages
3. Verify Lambda environment variables
4. Test Lambda functions directly in AWS Console
5. Check DynamoDB table permissions and connectivity

The key is to determine if this is a Lambda function issue, a DynamoDB connectivity issue, or an API Gateway integration problem.
