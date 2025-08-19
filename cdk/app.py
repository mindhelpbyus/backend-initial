#!/usr/bin/env python3
"""
AWS CDK App for Telehealth Backend Infrastructure

This module defines the main CDK application that deploys the telehealth backend
infrastructure including DynamoDB tables, Lambda functions, and API Gateway.
"""

import os
import sys
from typing import Optional

import aws_cdk as cdk
from aws_cdk import Tags

from backend_stack import TelehealthBackendStack


def get_environment_config() -> dict:
    """
    Get environment configuration from environment variables or defaults.
    
    Returns:
        dict: Configuration dictionary with AWS region and account info
    """
    return {
        "region": os.environ.get("CDK_DEFAULT_REGION", "us-east-1"),
        "account": os.environ.get("CDK_DEFAULT_ACCOUNT"),
    }


def create_stack_name(base_name: str, stage: Optional[str] = None) -> str:
    """
    Create a stack name with optional stage suffix.
    
    Args:
        base_name: Base name for the stack
        stage: Optional stage/environment suffix (dev, staging, prod)
        
    Returns:
        str: Formatted stack name
    """
    stage = stage or os.environ.get("STAGE", "dev")
    return f"{base_name}-{stage}"


def main() -> None:
    """Main function to create and deploy the CDK app."""
    try:
        # Initialize CDK app
        app = cdk.App()
        
        # Get configuration
        env_config = get_environment_config()
        stage = os.environ.get("STAGE", "dev")
        
        # Create environment object
        env = cdk.Environment(
            region=env_config["region"],
            account=env_config["account"]
        )
        
        # Create stack name
        stack_name = create_stack_name("TelehealthBackend", stage)
        
        # Create the main stack
        stack = TelehealthBackendStack(
            app, 
            stack_name,
            env=env,
            description=f"Telehealth Backend Infrastructure - {stage.upper()} environment",
            # Add stack-level tags
            tags={
                "Project": "TelehealthBackend",
                "Environment": stage,
                "ManagedBy": "CDK",
                "Owner": "TelehealthTeam"
            }
        )
        
        # Add common tags to all resources in the stack
        Tags.of(stack).add("Project", "TelehealthBackend")
        Tags.of(stack).add("Environment", stage)
        Tags.of(stack).add("ManagedBy", "CDK")
        
        # Synthesize the app
        app.synth()
        
    except Exception as e:
        print(f"Error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()