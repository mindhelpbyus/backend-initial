#!/usr/bin/env python3
"""
CloudWatch Logs Viewer for Telehealth Backend
Provides easy access to view and filter Lambda function logs
"""

import boto3
import json
import argparse
from datetime import datetime, timedelta
import sys
from typing import List, Dict, Optional

class LogViewer:
    def __init__(self, region: str = 'us-east-1'):
        self.logs_client = boto3.client('logs', region_name=region)
        self.region = region
        
        # Define log groups for each service
        self.log_groups = {
            'patients': '/aws/lambda/PatientsLambda',
            'doctors': '/aws/lambda/DoctorsLambda',
            'appointments': '/aws/lambda/AppointmentsLambda',
            'api': '/aws/apigateway/telehealth-api-access-logs'
        }

    def list_log_groups(self) -> List[str]:
        """List all available log groups"""
        try:
            response = self.logs_client.describe_log_groups()
            return [lg['logGroupName'] for lg in response['logGroups']]
        except Exception as e:
            print(f"Error listing log groups: {e}")
            return []

    def get_log_streams(self, log_group: str, limit: int = 10) -> List[Dict]:
        """Get recent log streams for a log group"""
        try:
            response = self.logs_client.describe_log_streams(
                logGroupName=log_group,
                orderBy='LastEventTime',
                descending=True,
                limit=limit
            )
            return response['logStreams']
        except Exception as e:
            print(f"Error getting log streams for {log_group}: {e}")
            return []

    def get_logs(self, 
                 service: str = None,
                 log_group: str = None, 
                 hours: int = 1, 
                 filter_pattern: str = None,
                 limit: int = 100) -> List[Dict]:
        """
        Get logs from CloudWatch
        
        Args:
            service: Service name (patients, doctors, appointments, api)
            log_group: Direct log group name (overrides service)
            hours: Number of hours to look back
            filter_pattern: CloudWatch filter pattern
            limit: Maximum number of log events to return
        """
        
        # Determine log group
        if log_group:
            target_log_group = log_group
        elif service and service in self.log_groups:
            target_log_group = self.log_groups[service]
        else:
            print(f"Invalid service '{service}'. Available services: {list(self.log_groups.keys())}")
            return []

        # Calculate time range
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=hours)
        
        start_timestamp = int(start_time.timestamp() * 1000)
        end_timestamp = int(end_time.timestamp() * 1000)

        try:
            kwargs = {
                'logGroupName': target_log_group,
                'startTime': start_timestamp,
                'endTime': end_timestamp,
                'limit': limit
            }
            
            if filter_pattern:
                kwargs['filterPattern'] = filter_pattern

            response = self.logs_client.filter_log_events(**kwargs)
            return response['events']
            
        except Exception as e:
            print(f"Error getting logs from {target_log_group}: {e}")
            return []

    def format_log_event(self, event: Dict, show_json: bool = False) -> str:
        """Format a log event for display"""
        timestamp = datetime.fromtimestamp(event['timestamp'] / 1000)
        message = event['message'].strip()
        
        # Try to parse as JSON for better formatting
        if show_json:
            try:
                parsed = json.loads(message)
                message = json.dumps(parsed, indent=2)
            except:
                pass  # Not JSON, keep original message
        
        return f"[{timestamp.strftime('%Y-%m-%d %H:%M:%S')}] {message}"

    def search_logs(self, 
                   service: str = None,
                   query: str = None,
                   hours: int = 1,
                   level: str = None) -> List[Dict]:
        """
        Search logs with specific criteria
        
        Args:
            service: Service to search in
            query: Text to search for
            hours: Hours to look back
            level: Log level (ERROR, WARN, INFO, DEBUG)
        """
        
        # Build filter pattern
        filter_parts = []
        
        if level:
            filter_parts.append(f'"{level.upper()}"')
        
        if query:
            filter_parts.append(f'"{query}"')
        
        filter_pattern = ' '.join(filter_parts) if filter_parts else None
        
        return self.get_logs(
            service=service,
            hours=hours,
            filter_pattern=filter_pattern
        )

    def get_error_logs(self, service: str = None, hours: int = 24) -> List[Dict]:
        """Get error logs from the specified service"""
        return self.search_logs(service=service, level='ERROR', hours=hours)

    def get_performance_logs(self, service: str = None, hours: int = 1) -> List[Dict]:
        """Get performance-related logs (duration, database operations)"""
        filter_pattern = '"duration" OR "ms" OR "db_"'
        return self.get_logs(service=service, hours=hours, filter_pattern=filter_pattern)

    def tail_logs(self, service: str, follow: bool = True):
        """Tail logs in real-time (simplified version)"""
        print(f"Tailing logs for {service} service...")
        print("Press Ctrl+C to stop")
        
        try:
            while follow:
                events = self.get_logs(service=service, hours=0.1, limit=10)
                for event in events:
                    print(self.format_log_event(event))
                
                if not follow:
                    break
                    
                import time
                time.sleep(5)  # Check every 5 seconds
                
        except KeyboardInterrupt:
            print("\nStopped tailing logs")

def main():
    parser = argparse.ArgumentParser(description='View CloudWatch logs for Telehealth Backend')
    parser.add_argument('--service', '-s', 
                       choices=['patients', 'doctors', 'appointments', 'api'],
                       help='Service to view logs for')
    parser.add_argument('--log-group', '-g', 
                       help='Direct log group name')
    parser.add_argument('--hours', '-t', type=int, default=1,
                       help='Hours to look back (default: 1)')
    parser.add_argument('--filter', '-f',
                       help='CloudWatch filter pattern')
    parser.add_argument('--query', '-q',
                       help='Search query')
    parser.add_argument('--level', '-l',
                       choices=['DEBUG', 'INFO', 'WARN', 'ERROR'],
                       help='Filter by log level')
    parser.add_argument('--limit', type=int, default=100,
                       help='Maximum number of log events (default: 100)')
    parser.add_argument('--json', action='store_true',
                       help='Pretty print JSON log messages')
    parser.add_argument('--errors-only', action='store_true',
                       help='Show only error logs')
    parser.add_argument('--performance', action='store_true',
                       help='Show performance-related logs')
    parser.add_argument('--tail', action='store_true',
                       help='Tail logs in real-time')
    parser.add_argument('--list-groups', action='store_true',
                       help='List all available log groups')
    parser.add_argument('--region', default='us-east-1',
                       help='AWS region (default: us-east-1)')

    args = parser.parse_args()

    # Initialize log viewer
    viewer = LogViewer(region=args.region)

    # List log groups if requested
    if args.list_groups:
        print("Available log groups:")
        for group in viewer.list_log_groups():
            print(f"  {group}")
        return

    # Validate service or log group
    if not args.service and not args.log_group:
        print("Error: Must specify either --service or --log-group")
        parser.print_help()
        return

    # Handle different modes
    if args.tail:
        if not args.service:
            print("Error: --tail requires --service")
            return
        viewer.tail_logs(args.service)
        return

    # Get logs based on mode
    if args.errors_only:
        events = viewer.get_error_logs(service=args.service, hours=args.hours)
    elif args.performance:
        events = viewer.get_performance_logs(service=args.service, hours=args.hours)
    elif args.query or args.level:
        events = viewer.search_logs(
            service=args.service,
            query=args.query,
            hours=args.hours,
            level=args.level
        )
    else:
        events = viewer.get_logs(
            service=args.service,
            log_group=args.log_group,
            hours=args.hours,
            filter_pattern=args.filter,
            limit=args.limit
        )

    # Display results
    if not events:
        print("No log events found")
        return

    print(f"Found {len(events)} log events:")
    print("-" * 80)
    
    for event in events:
        print(viewer.format_log_event(event, show_json=args.json))
        print()

if __name__ == '__main__':
    main()
