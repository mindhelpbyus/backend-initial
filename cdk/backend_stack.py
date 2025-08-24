from aws_cdk import (
    Stack,
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda,
    aws_apigatewayv2 as apigw,
    aws_apigatewayv2_integrations as apigw_integrations,
    aws_iam as iam,
    aws_logs as logs,
    Duration,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct
import os
import subprocess
import shutil

class TelehealthBackendStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        patients_table = dynamodb.Table(
            self, "PatientsTable",
            table_name="PatientsTable",
            partition_key=dynamodb.Attribute(
                name="patientId",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
            point_in_time_recovery=True
        )

        patients_table.add_global_secondary_index(
            index_name="email-index",
            partition_key=dynamodb.Attribute(
                name="email",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="createdAt",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Create Doctors Table
        doctors_table = dynamodb.Table(
            self, "DoctorsTable",
            table_name="DoctorsTable",
            partition_key=dynamodb.Attribute(
                name="doctorId",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
            point_in_time_recovery=True
        )

        # Add GSI for email-based lookups
        doctors_table.add_global_secondary_index(
            index_name="email-index",
            partition_key=dynamodb.Attribute(
                name="email",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="createdAt",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Add GSI for specialization-based lookups
        doctors_table.add_global_secondary_index(
            index_name="specialization-index",
            partition_key=dynamodb.Attribute(
                name="specialization",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="createdAt",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Create Appointments Table
        appointments_table = dynamodb.Table(
            self, "AppointmentsTable",
            table_name="AppointmentsTable",
            partition_key=dynamodb.Attribute(
                name="appointmentId",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
            point_in_time_recovery=True
        )

        # Create Chat Sessions Table
        chat_sessions_table = dynamodb.Table(
            self, "ChatSessionsTable",
            table_name="ChatSessionsTable",
            partition_key=dynamodb.Attribute(
                name="sessionId",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
            point_in_time_recovery=True
        )

        # Add GSI for patient-based lookups
        appointments_table.add_global_secondary_index(
            index_name="patient-index",
            partition_key=dynamodb.Attribute(
                name="patientId",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="scheduleDate",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Add GSI for doctor-based lookups
        appointments_table.add_global_secondary_index(
            index_name="doctor-index",
            partition_key=dynamodb.Attribute(
                name="doctorId",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="scheduleDate",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Add GSI for status-based lookups
        appointments_table.add_global_secondary_index(
            index_name="status-index",
            partition_key=dynamodb.Attribute(
                name="appointmentStatus",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="createdAt",
                type=dynamodb.AttributeType.STRING
            )
        )

        # Create CloudWatch Log Groups for each Lambda function
        patients_log_group = logs.LogGroup(
            self, "PatientsLambdaLogGroup",
            log_group_name="/aws/lambda/PatientsLambda",
            retention=logs.RetentionDays.ONE_MONTH,
            removal_policy=RemovalPolicy.DESTROY
        )

        doctors_log_group = logs.LogGroup(
            self, "DoctorsLambdaLogGroup",
            log_group_name="/aws/lambda/DoctorsLambda",
            retention=logs.RetentionDays.ONE_MONTH,
            removal_policy=RemovalPolicy.DESTROY
        )

        appointments_log_group = logs.LogGroup(
            self, "AppointmentsLambdaLogGroup",
            log_group_name="/aws/lambda/AppointmentsLambda",
            retention=logs.RetentionDays.ONE_MONTH,
            removal_policy=RemovalPolicy.DESTROY
        )

        # Create API Gateway access log group
        api_access_log_group = logs.LogGroup(
            self, "ApiAccessLogGroup",
            log_group_name="/aws/apigateway/telehealth-api-access-logs",
            retention=logs.RetentionDays.ONE_WEEK,
            removal_policy=RemovalPolicy.DESTROY
        )

        lambda_role = iam.Role(
            self, "LambdaExecutionRole",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name("service-role/AWSLambdaBasicExecutionRole")
            ]
        )

        # Grant CloudWatch Logs permissions
        lambda_role.add_to_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=[
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups"
            ],
            resources=["*"]
        ))

        patients_table.grant_read_write_data(lambda_role)
        doctors_table.grant_read_write_data(lambda_role)
        appointments_table.grant_read_write_data(lambda_role)

        patients_lambda = _lambda.Function(
            self, "PatientsLambda",
            runtime=_lambda.Runtime.NODEJS_18_X,
            handler="dist/handler.handler",
            code=_lambda.Code.from_asset("../src/lambdas/patients"),
            role=lambda_role,
            timeout=Duration.seconds(30),
            log_group=patients_log_group,
            environment={
                "PATIENTS_TABLE": patients_table.table_name,
                "JWT_SECRET": "your-super-secret-jwt-key-change-in-production",
                "REGION": self.region,
                "NODE_ENV": "production",
                "LOG_LEVEL": "INFO",
                "SERVICE_NAME": "patients"
            }
        )

        # Create Doctors Lambda
        doctors_lambda = _lambda.Function(
            self, "DoctorsLambda",
            runtime=_lambda.Runtime.NODEJS_18_X,
            handler="dist/handler.handler",
            code=_lambda.Code.from_asset("../src/lambdas/doctors"),
            role=lambda_role,
            timeout=Duration.seconds(30),
            log_group=doctors_log_group,
            environment={
                "DOCTORS_TABLE": doctors_table.table_name,
                "JWT_SECRET": "your-super-secret-jwt-key-change-in-production",
                "REGION": self.region,
                "NODE_ENV": "production",
                "LOG_LEVEL": "INFO",
                "SERVICE_NAME": "doctors"
            }
        )

        # Create Appointments Lambda
        appointments_lambda = _lambda.Function(
            self, "AppointmentsLambda",
            runtime=_lambda.Runtime.NODEJS_18_X,
            handler="dist/handler.handler",
            code=_lambda.Code.from_asset("../src/lambdas/appointments"),
            role=lambda_role,
            timeout=Duration.seconds(30),
            log_group=appointments_log_group,
            environment={
                "APPOINTMENTS_TABLE": appointments_table.table_name,
                "JWT_SECRET": "your-super-secret-jwt-key-change-in-production",
                "REGION": self.region,
                "NODE_ENV": "production",
                "LOG_LEVEL": "INFO",
                "SERVICE_NAME": "appointments"
            }
        )

        # Create Chatbot Log Group
        chatbot_log_group = logs.LogGroup(
            self, "ChatbotLambdaLogGroup",
            log_group_name="/aws/lambda/ChatbotLambda",
            retention=logs.RetentionDays.ONE_MONTH,
            removal_policy=RemovalPolicy.DESTROY
        )

        # Grant chatbot access to chat sessions table
        chat_sessions_table.grant_read_write_data(lambda_role)

        # Create Chatbot Lambda
        chatbot_lambda = _lambda.Function(
            self, "ChatbotLambda",
            runtime=_lambda.Runtime.NODEJS_18_X,
            handler="dist/handler.handler",
            code=_lambda.Code.from_asset("../src/lambdas/chatbot"),
            role=lambda_role,
            timeout=Duration.seconds(30),
            log_group=chatbot_log_group,
            environment={
                "CHAT_SESSIONS_TABLE": chat_sessions_table.table_name,
                "JWT_SECRET": "your-super-secret-jwt-key-change-in-production",
                "OPENAI_API_KEY": "your-openai-api-key-here",
                "OPENAI_MODEL": "gpt-3.5-turbo",
                "MAX_TOKENS": "1000",
                "TEMPERATURE": "0.7",
                "REGION": self.region,
                "NODE_ENV": "production",
                "LOG_LEVEL": "INFO",
                "SERVICE_NAME": "chatbot"
            }
        )

        http_api = apigw.HttpApi(
            self, "TelehealthAPI",
            cors_preflight={
                "allow_origins": ["*"],
                "allow_methods": [apigw.CorsHttpMethod.GET, apigw.CorsHttpMethod.POST,
                               apigw.CorsHttpMethod.PUT, apigw.CorsHttpMethod.DELETE],
                "allow_headers": ["Content-Type", "Authorization"]
            }
        )

        patients_integration = apigw_integrations.HttpLambdaIntegration(
            "PatientsIntegration",
            patients_lambda
        )

        doctors_integration = apigw_integrations.HttpLambdaIntegration(
            "DoctorsIntegration",
            doctors_lambda
        )

        appointments_integration = apigw_integrations.HttpLambdaIntegration(
            "AppointmentsIntegration",
            appointments_lambda
        )

        chatbot_integration = apigw_integrations.HttpLambdaIntegration(
            "ChatbotIntegration",
            chatbot_lambda
        )

        # Auth routes (handled by patients lambda)
        http_api.add_routes(
            path="/auth/signup",
            methods=[apigw.HttpMethod.POST],
            integration=patients_integration
        )

        http_api.add_routes(
            path="/auth/login",
            methods=[apigw.HttpMethod.POST],
            integration=patients_integration
        )

        # Patient routes
        http_api.add_routes(
            path="/patients",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.POST],
            integration=patients_integration
        )

        http_api.add_routes(
            path="/patients/{patientId}",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.PUT, apigw.HttpMethod.DELETE],
            integration=patients_integration
        )

        http_api.add_routes(
            path="/patients/by-email",
            methods=[apigw.HttpMethod.GET],
            integration=patients_integration
        )

        http_api.add_routes(
            path="/patients/{patientId}/visits",
            methods=[apigw.HttpMethod.GET],
            integration=patients_integration
        )

        http_api.add_routes(
            path="/patients/{patientId}/reviews",
            methods=[apigw.HttpMethod.POST],
            integration=patients_integration
        )

        # Doctor routes
        http_api.add_routes(
            path="/doctors",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.POST],
            integration=doctors_integration
        )

        http_api.add_routes(
            path="/doctors/{doctorId}",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.PUT, apigw.HttpMethod.DELETE],
            integration=doctors_integration
        )

        http_api.add_routes(
            path="/doctors/by-email",
            methods=[apigw.HttpMethod.GET],
            integration=doctors_integration
        )

        http_api.add_routes(
            path="/doctors/by-specialization",
            methods=[apigw.HttpMethod.GET],
            integration=doctors_integration
        )

        # Appointment routes
        http_api.add_routes(
            path="/appointments",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.POST],
            integration=appointments_integration
        )

        http_api.add_routes(
            path="/appointments/{appointmentId}",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.PUT, apigw.HttpMethod.DELETE],
            integration=appointments_integration
        )

        http_api.add_routes(
            path="/appointments/patient",
            methods=[apigw.HttpMethod.GET],
            integration=appointments_integration
        )

        http_api.add_routes(
            path="/appointments/doctor",
            methods=[apigw.HttpMethod.GET],
            integration=appointments_integration
        )

        # Chatbot routes
        http_api.add_routes(
            path="/chat/start",
            methods=[apigw.HttpMethod.POST, apigw.HttpMethod.OPTIONS],
            integration=chatbot_integration
        )

        http_api.add_routes(
            path="/chat/message",
            methods=[apigw.HttpMethod.POST, apigw.HttpMethod.OPTIONS],
            integration=chatbot_integration
        )

        http_api.add_routes(
            path="/chat/sessions/{sessionId}",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.OPTIONS],
            integration=chatbot_integration
        )

        # Outputs
        CfnOutput(self, "ApiUrl", value=http_api.url)
        CfnOutput(self, "PatientsTableName", value=patients_table.table_name)
        CfnOutput(self, "PatientsLambdaArn", value=patients_lambda.function_arn)
        CfnOutput(self, "DoctorsTableName", value=doctors_table.table_name)
        CfnOutput(self, "DoctorsLambdaArn", value=doctors_lambda.function_arn)
        CfnOutput(self, "AppointmentsTableName", value=appointments_table.table_name)
        CfnOutput(self, "AppointmentsLambdaArn", value=appointments_lambda.function_arn)
        CfnOutput(self, "ChatSessionsTableName", value=chat_sessions_table.table_name)
        CfnOutput(self, "ChatbotLambdaArn", value=chatbot_lambda.function_arn)
