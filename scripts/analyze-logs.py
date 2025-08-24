#!/usr/bin/env python3
"""
Log Analysis Tool for Telehealth Backend
Generates reports and insights from CloudWatch logs
"""

import boto3
import json
import argparse
from datetime import datetime, timedelta
from collections import defaultdict, Counter
import re
from typing import List, Dict, Any
import statistics

class LogAnalyzer:
    def __init__(self, region: str = 'us-east-1'):
        self.logs_client = boto3.client('logs', region_name=region)
        self.region = region
        
        self.log_groups = {
            'patients': '/aws/lambda/PatientsLambda',
            'doctors': '/aws/lambda/DoctorsLambda',
            'appointments': '/aws/lambda/AppointmentsLambda',
            'api': '/aws/apigateway/telehealth-api-access-logs'
        }

    def get_logs(self, service: str, hours: int = 24, limit: int = 10000) -> List[Dict]:
        """Get logs for analysis"""
        if service not in self.log_groups:
            print(f"Invalid service '{service}'. Available: {list(self.log_groups.keys())}")
            return []

        log_group = self.log_groups[service]
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=hours)
        
        start_timestamp = int(start_time.timestamp() * 1000)
        end_timestamp = int(end_time.timestamp() * 1000)

        try:
            response = self.logs_client.filter_log_events(
                logGroupName=log_group,
                startTime=start_timestamp,
                endTime=end_timestamp,
                limit=limit
            )
            return response['events']
        except Exception as e:
            print(f"Error getting logs: {e}")
            return []

    def parse_structured_log(self, message: str) -> Dict[str, Any]:
        """Parse structured JSON log message"""
        try:
            return json.loads(message)
        except:
            # Try to extract key-value pairs from non-JSON logs
            parsed = {'raw_message': message}
            
            # Extract common patterns
            patterns = {
                'level': r'\b(DEBUG|INFO|WARN|ERROR)\b',
                'duration': r'(\d+)ms',
                'status_code': r'- (\d{3})',
                'method': r'\b(GET|POST|PUT|DELETE)\b',
                'operation': r'operation[:\s]+([^\s,]+)',
            }
            
            for key, pattern in patterns.items():
                match = re.search(pattern, message, re.IGNORECASE)
                if match:
                    parsed[key] = match.group(1)
            
            return parsed

    def analyze_error_patterns(self, events: List[Dict]) -> Dict[str, Any]:
        """Analyze error patterns and frequencies"""
        error_events = []
        error_types = Counter()
        error_messages = Counter()
        
        for event in events:
            log_data = self.parse_structured_log(event['message'])
            
            # Check if it's an error log
            is_error = (
                log_data.get('level') == 'ERROR' or
                'ERROR' in event['message'].upper() or
                'error' in log_data.get('operation', '').lower()
            )
            
            if is_error:
                error_events.append({
                    'timestamp': event['timestamp'],
                    'message': event['message'],
                    'parsed': log_data
                })
                
                # Categorize error types
                if 'validation' in event['message'].lower():
                    error_types['Validation Error'] += 1
                elif 'authentication' in event['message'].lower():
                    error_types['Authentication Error'] += 1
                elif 'database' in event['message'].lower() or 'dynamodb' in event['message'].lower():
                    error_types['Database Error'] += 1
                elif 'timeout' in event['message'].lower():
                    error_types['Timeout Error'] += 1
                else:
                    error_types['Other Error'] += 1
                
                # Count specific error messages
                error_msg = log_data.get('raw_message', event['message'])[:100]
                error_messages[error_msg] += 1

        return {
            'total_errors': len(error_events),
            'error_types': dict(error_types),
            'top_error_messages': dict(error_messages.most_common(10)),
            'recent_errors': error_events[-10:] if error_events else []
        }

    def analyze_performance(self, events: List[Dict]) -> Dict[str, Any]:
        """Analyze performance metrics"""
        durations = []
        slow_requests = []
        db_operations = []
        
        for event in events:
            log_data = self.parse_structured_log(event['message'])
            
            # Extract duration information
            duration_str = log_data.get('duration')
            if duration_str:
                try:
                    duration = int(duration_str)
                    durations.append(duration)
                    
                    # Flag slow requests (>5 seconds)
                    if duration > 5000:
                        slow_requests.append({
                            'timestamp': event['timestamp'],
                            'duration': duration,
                            'message': event['message'][:200]
                        })
                except ValueError:
                    pass
            
            # Track database operations
            if 'db_' in log_data.get('operation', ''):
                db_operations.append({
                    'timestamp': event['timestamp'],
                    'operation': log_data.get('operation'),
                    'duration': duration_str,
                    'success': log_data.get('success', True)
                })

        performance_stats = {}
        if durations:
            performance_stats = {
                'avg_duration': statistics.mean(durations),
                'median_duration': statistics.median(durations),
                'p95_duration': sorted(durations)[int(len(durations) * 0.95)] if len(durations) > 20 else max(durations),
                'min_duration': min(durations),
                'max_duration': max(durations),
                'total_requests': len(durations)
            }

        return {
            'performance_stats': performance_stats,
            'slow_requests': slow_requests,
            'db_operations': len(db_operations),
            'db_failures': len([op for op in db_operations if not op.get('success', True)])
        }

    def analyze_usage_patterns(self, events: List[Dict]) -> Dict[str, Any]:
        """Analyze API usage patterns"""
        endpoints = Counter()
        methods = Counter()
        status_codes = Counter()
        hourly_traffic = defaultdict(int)
        
        for event in events:
            log_data = self.parse_structured_log(event['message'])
            timestamp = datetime.fromtimestamp(event['timestamp'] / 1000)
            hour_key = timestamp.strftime('%Y-%m-%d %H:00')
            
            # Count HTTP methods
            method = log_data.get('method')
            if method:
                methods[method] += 1
            
            # Count status codes
            status_code = log_data.get('status_code')
            if status_code:
                status_codes[status_code] += 1
            
            # Extract endpoint from message
            if 'request' in event['message'].lower():
                # Try to extract endpoint from request logs
                path_match = re.search(r'(GET|POST|PUT|DELETE)\s+([^\s]+)', event['message'])
                if path_match:
                    endpoint = path_match.group(2)
                    endpoints[endpoint] += 1
            
            # Count hourly traffic
            if any(keyword in event['message'].lower() for keyword in ['request', 'incoming']):
                hourly_traffic[hour_key] += 1

        return {
            'top_endpoints': dict(endpoints.most_common(10)),
            'methods_distribution': dict(methods),
            'status_codes_distribution': dict(status_codes),
            'hourly_traffic': dict(sorted(hourly_traffic.items())),
            'total_requests': sum(methods.values()) if methods else 0
        }

    def analyze_authentication(self, events: List[Dict]) -> Dict[str, Any]:
        """Analyze authentication patterns"""
        auth_events = []
        auth_successes = 0
        auth_failures = 0
        failure_reasons = Counter()
        
        for event in events:
            if 'authentication' in event['message'].lower() or 'auth' in event['message'].lower():
                log_data = self.parse_structured_log(event['message'])
                
                auth_events.append({
                    'timestamp': event['timestamp'],
                    'message': event['message'],
                    'parsed': log_data
                })
                
                # Determine success/failure
                success = log_data.get('success')
                if success is True or 'successful' in event['message'].lower():
                    auth_successes += 1
                elif success is False or 'failed' in event['message'].lower():
                    auth_failures += 1
                    
                    # Extract failure reason
                    reason = log_data.get('reason', 'Unknown')
                    failure_reasons[reason] += 1

        return {
            'total_auth_attempts': len(auth_events),
            'successful_auths': auth_successes,
            'failed_auths': auth_failures,
            'success_rate': (auth_successes / len(auth_events) * 100) if auth_events else 0,
            'failure_reasons': dict(failure_reasons),
            'recent_auth_events': auth_events[-10:] if auth_events else []
        }

    def generate_report(self, service: str, hours: int = 24) -> Dict[str, Any]:
        """Generate comprehensive analysis report"""
        print(f"Analyzing logs for {service} service (last {hours} hours)...")
        
        events = self.get_logs(service, hours)
        if not events:
            return {'error': 'No logs found for analysis'}

        report = {
            'service': service,
            'analysis_period': f'{hours} hours',
            'total_log_events': len(events),
            'analysis_timestamp': datetime.utcnow().isoformat(),
            'errors': self.analyze_error_patterns(events),
            'performance': self.analyze_performance(events),
            'usage': self.analyze_usage_patterns(events),
            'authentication': self.analyze_authentication(events)
        }

        return report

    def print_report(self, report: Dict[str, Any]):
        """Print formatted analysis report"""
        if 'error' in report:
            print(f"Error: {report['error']}")
            return

        print("=" * 80)
        print(f"LOG ANALYSIS REPORT - {report['service'].upper()} SERVICE")
        print("=" * 80)
        print(f"Analysis Period: {report['analysis_period']}")
        print(f"Total Log Events: {report['total_log_events']:,}")
        print(f"Generated: {report['analysis_timestamp']}")
        print()

        # Error Analysis
        errors = report['errors']
        print("🚨 ERROR ANALYSIS")
        print("-" * 40)
        print(f"Total Errors: {errors['total_errors']}")
        if errors['error_types']:
            print("Error Types:")
            for error_type, count in errors['error_types'].items():
                print(f"  • {error_type}: {count}")
        
        if errors['top_error_messages']:
            print("\nTop Error Messages:")
            for msg, count in list(errors['top_error_messages'].items())[:5]:
                print(f"  • ({count}x) {msg[:80]}...")
        print()

        # Performance Analysis
        perf = report['performance']
        print("⚡ PERFORMANCE ANALYSIS")
        print("-" * 40)
        if perf['performance_stats']:
            stats = perf['performance_stats']
            print(f"Total Requests: {stats['total_requests']:,}")
            print(f"Average Duration: {stats['avg_duration']:.1f}ms")
            print(f"Median Duration: {stats['median_duration']:.1f}ms")
            print(f"95th Percentile: {stats['p95_duration']:.1f}ms")
            print(f"Slowest Request: {stats['max_duration']:.1f}ms")
        
        print(f"Slow Requests (>5s): {len(perf['slow_requests'])}")
        print(f"Database Operations: {perf['db_operations']}")
        print(f"Database Failures: {perf['db_failures']}")
        print()

        # Usage Analysis
        usage = report['usage']
        print("📊 USAGE ANALYSIS")
        print("-" * 40)
        print(f"Total API Requests: {usage['total_requests']:,}")
        
        if usage['methods_distribution']:
            print("HTTP Methods:")
            for method, count in usage['methods_distribution'].items():
                print(f"  • {method}: {count}")
        
        if usage['status_codes_distribution']:
            print("Status Codes:")
            for code, count in usage['status_codes_distribution'].items():
                print(f"  • {code}: {count}")
        
        if usage['top_endpoints']:
            print("Top Endpoints:")
            for endpoint, count in list(usage['top_endpoints'].items())[:5]:
                print(f"  • {endpoint}: {count}")
        print()

        # Authentication Analysis
        auth = report['authentication']
        print("🔐 AUTHENTICATION ANALYSIS")
        print("-" * 40)
        print(f"Total Auth Attempts: {auth['total_auth_attempts']}")
        print(f"Successful: {auth['successful_auths']}")
        print(f"Failed: {auth['failed_auths']}")
        print(f"Success Rate: {auth['success_rate']:.1f}%")
        
        if auth['failure_reasons']:
            print("Failure Reasons:")
            for reason, count in auth['failure_reasons'].items():
                print(f"  • {reason}: {count}")
        print()

def main():
    parser = argparse.ArgumentParser(description='Analyze CloudWatch logs for Telehealth Backend')
    parser.add_argument('--service', '-s', required=True,
                       choices=['patients', 'doctors', 'appointments'],
                       help='Service to analyze')
    parser.add_argument('--hours', '-t', type=int, default=24,
                       help='Hours to analyze (default: 24)')
    parser.add_argument('--output', '-o',
                       help='Output file for JSON report')
    parser.add_argument('--region', default='us-east-1',
                       help='AWS region (default: us-east-1)')

    args = parser.parse_args()

    analyzer = LogAnalyzer(region=args.region)
    report = analyzer.generate_report(args.service, args.hours)
    
    # Print report to console
    analyzer.print_report(report)
    
    # Save to file if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(report, f, indent=2)
        print(f"Report saved to {args.output}")

if __name__ == '__main__':
    main()
