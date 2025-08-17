#!/usr/bin/env python3
import aws_cdk as cdk
from backend_stack import TelehealthBackendStack

app = cdk.App()
TelehealthBackendStack(app, "TelehealthBackendStack",
    env=cdk.Environment(
        region="us-east-1"
    )
)

app.synth()
