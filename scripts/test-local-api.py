#!/usr/bin/env python3
import requests
import json
import sys
from termcolor import colored

# Local API endpoint
API_ENDPOINT = "http://localhost:4566"
TOKEN = None

def print_response(response, title):
    print(f"\n{colored(f'=== {title} ===', 'blue')}")
    print(f"Status: {colored(response.status_code, 'green' if response.status_code < 400 else 'red')}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")

def test_signup():
    global TOKEN
    print(colored("\nTesting Signup...", "yellow"))
    data = {
        "email": "test@example.com",
        "password": "password123",
        "firstName": "Test",
        "lastName": "User"
    }
    response = requests.post(f"{API_ENDPOINT}/auth/signup", json=data)
    print_response(response, "Signup")
    if response.status_code == 201:
        TOKEN = response.json().get('token')
        return True
    return False

def test_login():
    global TOKEN
    print(colored("\nTesting Login...", "yellow"))
    data = {
        "email": "test@example.com",
        "password": "password123"
    }
    response = requests.post(f"{API_ENDPOINT}/auth/login", json=data)
    print_response(response, "Login")
    if response.status_code == 200:
        TOKEN = response.json().get('token')
        return True
    return False

def test_get_patients():
    print(colored("\nTesting Get Patients...", "yellow"))
    headers = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}
    response = requests.get(f"{API_ENDPOINT}/patients", headers=headers)
    print_response(response, "Get Patients")

def test_get_patient_by_email():
    print(colored("\nTesting Get Patient by Email...", "yellow"))
    headers = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}
    response = requests.get(
        f"{API_ENDPOINT}/patients/by-email",
        params={"email": "test@example.com"},
        headers=headers
    )
    print_response(response, "Get Patient by Email")

def main():
    try:
        print(colored("Starting API Tests...", "cyan"))
        
        # Test signup first
        if not test_signup():
            if not test_login():  # If signup fails, try login
                print(colored("\nFailed to authenticate!", "red"))
                sys.exit(1)
        
        # Test other endpoints
        test_get_patients()
        test_get_patient_by_email()
        
        print(colored("\nAll tests completed!", "green"))
        
    except requests.exceptions.ConnectionError:
        print(colored("\nError: Could not connect to the local API. Is LocalStack running?", "red"))
        print("Make sure to:\n1. Start LocalStack (docker-compose up -d)\n2. Deploy the stack (cdklocal deploy)")
        sys.exit(1)
    except Exception as e:
        print(colored(f"\nError: {str(e)}", "red"))
        sys.exit(1)

if __name__ == "__main__":
    main()