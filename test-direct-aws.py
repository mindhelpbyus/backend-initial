#!/usr/bin/env python3
"""
Direct test of AWS API Gateway to debug the authentication issue
"""

import requests
import json
import sys

def test_aws_api_direct(api_url):
    """Test AWS API Gateway directly without proxy"""
    
    # Test signup endpoint (should not require auth)
    signup_url = f"{api_url}/auth/signup"
    signup_data = {
        "email": "test-direct@example.com",
        "password": "password123",
        "firstName": "Test",
        "lastName": "User"
    }
    
    print(f"Testing direct AWS API call to: {signup_url}")
    print(f"Request data: {json.dumps(signup_data, indent=2)}")
    
    try:
        response = requests.post(
            signup_url,
            json=signup_data,
            headers={
                'Content-Type': 'application/json'
            },
            timeout=30
        )
        
        print(f"\nResponse Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        try:
            response_json = response.json()
            print(f"Response Body: {json.dumps(response_json, indent=2)}")
        except:
            print(f"Response Body (raw): {response.text}")
            
        return response.status_code == 201
        
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False

def test_get_doctors(api_url):
    """Test get doctors endpoint (should not require auth)"""
    
    doctors_url = f"{api_url}/doctors"
    
    print(f"\nTesting GET doctors: {doctors_url}")
    
    try:
        response = requests.get(
            doctors_url,
            headers={
                'Content-Type': 'application/json'
            },
            timeout=30
        )
        
        print(f"Response Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        try:
            response_json = response.json()
            print(f"Response Body: {json.dumps(response_json, indent=2)}")
        except:
            print(f"Response Body (raw): {response.text}")
            
        return response.status_code == 200
        
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 test-direct-aws.py <API_GATEWAY_URL>")
        print("Example: python3 test-direct-aws.py https://lf4digbabc.execute-api.us-east-1.amazonaws.com")
        sys.exit(1)
    
    api_url = sys.argv[1].rstrip('/')
    
    print("=" * 60)
    print("AWS API Gateway Direct Test")
    print("=" * 60)
    
    # Test signup
    signup_success = test_aws_api_direct(api_url)
    
    # Test get doctors
    doctors_success = test_get_doctors(api_url)
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Signup test: {'✅ PASSED' if signup_success else '❌ FAILED'}")
    print(f"Get doctors test: {'✅ PASSED' if doctors_success else '❌ FAILED'}")
    
    if not signup_success and not doctors_success:
        print("\n🔍 DEBUGGING SUGGESTIONS:")
        print("1. Check if API Gateway URL is correct")
        print("2. Verify API Gateway is deployed and accessible")
        print("3. Check if there's an authorizer configured on API Gateway")
        print("4. Verify Lambda functions are deployed and working")
        print("5. Check CloudWatch logs for Lambda execution errors")
