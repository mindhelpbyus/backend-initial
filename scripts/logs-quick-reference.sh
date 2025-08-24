#!/bin/bash

# Quick Reference Script for Telehealth Backend Logging
# Provides shortcuts for common logging operations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Telehealth Backend Logs${NC}"
    echo -e "${BLUE}================================${NC}"
    echo
}

print_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo
    echo "Commands:"
    echo "  recent [SERVICE]     - View recent logs (last hour)"
    echo "  errors [SERVICE]     - View error logs (last 24 hours)"
    echo "  tail [SERVICE]       - Tail logs in real-time"
    echo "  analyze [SERVICE]    - Generate analysis report"
    echo "  search [SERVICE] [QUERY] - Search logs for specific content"
    echo "  performance [SERVICE] - View performance logs"
    echo "  auth [SERVICE]       - View authentication logs"
    echo "  status              - Check log system status"
    echo "  help                - Show this help message"
    echo
    echo "Services: patients, doctors, appointments"
    echo
    echo "Examples:"
    echo "  $0 recent patients"
    echo "  $0 errors doctors"
    echo "  $0 search appointments 'validation failed'"
    echo "  $0 analyze patients"
    echo
}

check_dependencies() {
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}Error: python3 is required but not installed${NC}"
        exit 1
    fi

    if ! python3 -c "import boto3" &> /dev/null; then
        echo -e "${RED}Error: boto3 is required. Install with: pip install boto3${NC}"
        exit 1
    fi
}

validate_service() {
    local service=$1
    if [[ ! "$service" =~ ^(patients|doctors|appointments)$ ]]; then
        echo -e "${RED}Error: Invalid service '$service'. Must be: patients, doctors, or appointments${NC}"
        exit 1
    fi
}

cmd_recent() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${GREEN}📋 Recent logs for $service service (last hour)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --hours 1 --limit 50
}

cmd_errors() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${RED}🚨 Error logs for $service service (last 24 hours)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --errors-only --hours 24
}

cmd_tail() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${YELLOW}📡 Tailing logs for $service service (Press Ctrl+C to stop)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --tail
}

cmd_analyze() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${BLUE}📊 Analyzing logs for $service service (last 24 hours)${NC}"
    echo
    python3 "$SCRIPT_DIR/analyze-logs.py" --service "$service" --hours 24
}

cmd_search() {
    local service=${1:-"patients"}
    local query=${2:-""}
    
    validate_service "$service"
    
    if [ -z "$query" ]; then
        echo -e "${RED}Error: Search query is required${NC}"
        echo "Usage: $0 search [SERVICE] [QUERY]"
        exit 1
    fi
    
    echo -e "${GREEN}🔍 Searching logs for '$query' in $service service (last 6 hours)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --query "$query" --hours 6
}

cmd_performance() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${YELLOW}⚡ Performance logs for $service service (last 2 hours)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --performance --hours 2
}

cmd_auth() {
    local service=${1:-"patients"}
    validate_service "$service"
    
    echo -e "${BLUE}🔐 Authentication logs for $service service (last 6 hours)${NC}"
    echo
    python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --query "authentication" --hours 6
}

cmd_status() {
    echo -e "${GREEN}📋 Log System Status${NC}"
    echo
    
    # Check if AWS CLI is configured
    if aws sts get-caller-identity &> /dev/null; then
        echo -e "${GREEN}✅ AWS CLI configured${NC}"
    else
        echo -e "${RED}❌ AWS CLI not configured${NC}"
    fi
    
    # Check log groups
    echo
    echo "Available log groups:"
    python3 "$SCRIPT_DIR/view-logs.py" --list-groups 2>/dev/null || echo -e "${RED}❌ Cannot access CloudWatch logs${NC}"
    
    # Check recent activity
    echo
    echo "Recent activity (last hour):"
    for service in patients doctors appointments; do
        count=$(python3 "$SCRIPT_DIR/view-logs.py" --service "$service" --hours 1 --limit 1000 2>/dev/null | grep -c "^\[" || echo "0")
        if [ "$count" -gt 0 ]; then
            echo -e "${GREEN}  $service: $count log entries${NC}"
        else
            echo -e "${YELLOW}  $service: No recent activity${NC}"
        fi
    done
}

# Interactive mode
interactive_mode() {
    print_header
    echo "Interactive Log Viewer"
    echo
    
    while true; do
        echo
        echo "Select an option:"
        echo "1) View recent logs"
        echo "2) View error logs"
        echo "3) Tail logs"
        echo "4) Analyze logs"
        echo "5) Search logs"
        echo "6) Performance logs"
        echo "7) Authentication logs"
        echo "8) System status"
        echo "9) Exit"
        echo
        read -p "Enter choice [1-9]: " choice
        
        case $choice in
            1)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_recent "$service"
                ;;
            2)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_errors "$service"
                ;;
            3)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_tail "$service"
                ;;
            4)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_analyze "$service"
                ;;
            5)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                read -p "Enter search query: " query
                cmd_search "$service" "$query"
                ;;
            6)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_performance "$service"
                ;;
            7)
                echo
                read -p "Enter service (patients/doctors/appointments): " service
                cmd_auth "$service"
                ;;
            8)
                cmd_status
                ;;
            9)
                echo "Goodbye!"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid choice. Please enter 1-9.${NC}"
                ;;
        esac
        
        echo
        read -p "Press Enter to continue..."
    done
}

# Main script logic
main() {
    check_dependencies
    
    if [ $# -eq 0 ]; then
        interactive_mode
        return
    fi
    
    local command=$1
    shift
    
    case $command in
        recent)
            cmd_recent "$@"
            ;;
        errors)
            cmd_errors "$@"
            ;;
        tail)
            cmd_tail "$@"
            ;;
        analyze)
            cmd_analyze "$@"
            ;;
        search)
            cmd_search "$@"
            ;;
        performance)
            cmd_performance "$@"
            ;;
        auth)
            cmd_auth "$@"
            ;;
        status)
            cmd_status
            ;;
        help|--help|-h)
            print_usage
            ;;
        *)
            echo -e "${RED}Unknown command: $command${NC}"
            echo
            print_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
