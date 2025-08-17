# Telehealth Backend (prototype)

This repository contains a prototype backend for a tele-mental-health platform:
- AWS CDK (Python) stack to provision a DynamoDB table, Lambda and HTTP API
- Single Node.js/TypeScript Lambda that handles patient auth + CRUD (prototype)
- Build & seed scripts

See `cdk/` for CDK app and `src/lambdas/patients` for the Lambda handler.

Quick start:
1. `npm install`
2. `npm run build`
3. Create and activate a Python venv inside `cdk/`, install `requirements.txt`
4. `npm run cdk:deploy` (after building the Lambda)
