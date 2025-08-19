#!/usr/bin/env python3
import requests
import sys
from termcolor import colored

def check_localstack():
    try:
        response = requests.get("http://localhost:4566/_localstack/health")
        return response.status_code == 200
    except:
        return False

def check_dynamodb():
    try:
        response = requests.get("http://localhost:8001")
        return response.status_code == 200
    except:
        return False

def check_api():
    try:
        # Try to hit a simple endpoint
        response = requests.post("http://localhost:4566/auth/signup",
                               json={"email": "test@example.com", "password": "test123"})
        return response.status_code in [201, 409]  # 409 means user exists, which is also OK
    except:
        return False

def main():
    print(colored("Checking services...", "cyan"))
    
    services = {
        "LocalStack": check_localstack(),
        "DynamoDB Admin": check_dynamodb(),
        "API Gateway": check_api()
    }
    
    all_running = True
    for service, is_running in services.items():
        status = "RUNNING" if is_running else "NOT RUNNING"
        color = "green" if is_running else "red"
        print(f"{service}: {colored(status, color)}")
        all_running = all_running and is_running
    
    if not all_running:
        print(colored("\nSome services are not running. Please run:", "yellow"))
        print("1. docker-compose up -d")
        print("2. cdklocal bootstrap")
        print("3. cdklocal deploy")
        sys.exit(1)
    else:
        print(colored("\n✅ All services are running!", "green"))

if __name__ == "__main__":
    main()