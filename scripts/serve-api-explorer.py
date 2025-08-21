#!/usr/bin/env python3
"""
Simple HTTP server to serve the API Explorer and proxy requests to LocalStack.
This eliminates CORS issues by serving from the same origin.
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import os
from urllib.error import HTTPError

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # Handle Lambda invocation proxy
        if self.path.startswith('/lambda-proxy/'):
            self.handle_lambda_proxy()
        # Handle API Gateway proxy
        elif self.path.startswith('/api-proxy'):
            self.handle_api_proxy()
        else:
            super().do_POST()

    def do_GET(self):
        # Handle API Gateway proxy for GET requests
        if self.path.startswith('/api-proxy'):
            self.handle_api_proxy()
        else:
            super().do_GET()

    def do_PUT(self):
        # Handle API Gateway proxy for PUT requests
        if self.path.startswith('/api-proxy'):
            self.handle_api_proxy()
        else:
            super().do_PUT()

    def do_DELETE(self):
        # Handle API Gateway proxy for DELETE requests
        if self.path.startswith('/api-proxy'):
            self.handle_api_proxy()
        else:
            super().do_DELETE()

    def handle_lambda_proxy(self):
        try:
            # Extract function name from path
            function_name = self.path.replace('/lambda-proxy/', '')
            
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            # Forward to LocalStack Lambda API
            localstack_url = f'http://localhost:4566/2015-03-31/functions/{function_name}/invocations'
            
            req = urllib.request.Request(
                localstack_url,
                data=post_data,
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req) as response:
                result = response.read()
                
            # Send response back to browser
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(result)
            
        except HTTPError as e:
            error_response = {
                'errorMessage': f'Lambda invocation failed: {e.code} {e.reason}',
                'errorType': 'LambdaInvocationError'
            }
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode())
            
        except Exception as e:
            error_response = {
                'errorMessage': f'Proxy error: {str(e)}',
                'errorType': 'ProxyError'
            }
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode())

    def handle_api_proxy(self):
        try:
            # Extract API path from proxy path
            # /api-proxy/auth/signup -> /auth/signup
            api_path = self.path.replace('/api-proxy', '')
            
            # Read request body for POST/PUT requests
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = None
            if content_length > 0:
                post_data = self.rfile.read(content_length)
            
            # Forward to LocalStack API Gateway
            # Use the API Gateway URL from CloudFormation outputs
            api_gateway_url = f'https://unknown.execute-api.localhost.localstack.cloud:4566{api_path}'
            
            # Prepare headers
            headers = {}
            if post_data:
                headers['Content-Type'] = 'application/json'
            
            # Copy authorization header if present
            if 'Authorization' in self.headers:
                headers['Authorization'] = self.headers['Authorization']
            
            # Create request
            req = urllib.request.Request(
                api_gateway_url,
                data=post_data,
                headers=headers,
                method=self.command
            )
            
            with urllib.request.urlopen(req) as response:
                result = response.read()
                status_code = response.getcode()
                
            # Send response back to browser
            self.send_response(status_code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(result)
            
        except HTTPError as e:
            # Read error response body
            error_body = e.read() if hasattr(e, 'read') else b'{}'
            
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(error_body)
            
        except Exception as e:
            error_response = {
                'errorMessage': f'API Gateway proxy error: {str(e)}',
                'errorType': 'APIGatewayProxyError'
            }
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(error_response).encode())

def find_available_port(start_port=8080, max_attempts=10):
    """Find an available port starting from start_port"""
    import socket
    
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    
    raise OSError(f"No available ports found in range {start_port}-{start_port + max_attempts - 1}")

def main():
    # Find an available port
    try:
        PORT = find_available_port()
    except OSError as e:
        print(f"❌ Error: {e}")
        return 1
    
    # Change to the project root directory
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    try:
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            print(f"🚀 API Explorer server running at http://localhost:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"🔗 Open http://localhost:{PORT}/api-explorer.html in your browser")
            print("Press Ctrl+C to stop the server")
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped")
                return 0
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use")
            print("💡 Try killing any existing processes or wait a moment and try again")
            return 1
        else:
            print(f"❌ Error starting server: {e}")
            return 1

if __name__ == "__main__":
    main()
