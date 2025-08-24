#!/bin/bash

# Simple log tailing script for demo
LOG_FILE="demo-logs.json"

echo "📡 Tailing demo logs from $LOG_FILE (Press Ctrl+C to stop)"
echo "=================================================="

if [ ! -f "$LOG_FILE" ]; then
    echo "❌ Log file $LOG_FILE not found. Run the demo first:"
    echo "   node scripts/test-logging-demo.js"
    exit 1
fi

# Use tail -f to follow the log file, with jq for pretty formatting if available
if command -v jq &> /dev/null; then
    echo "🎨 Using jq for pretty formatting..."
    tail -f "$LOG_FILE" | while read line; do
        echo "$line" | jq '.'
        echo "---"
    done
else
    echo "📄 Raw JSON output (install jq for pretty formatting)..."
    tail -f "$LOG_FILE"
fi
