#!/usr/bin/env node

// Simple demo script to show logging functionality
const fs = require('fs');
const path = require('path');

// Mock the logger functionality for demo
class MockLogger {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.logFile = path.join(__dirname, '..', 'demo-logs.json');
  }

  log(level, message, context = {}, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.serviceName,
      context,
      ...(error && { error: { message: error.message, stack: error.stack } })
    };

    // Append to log file
    fs.appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
    
    // Also output to console for immediate visibility
    console.log(JSON.stringify(logEntry, null, 2));
  }

  info(message, context = {}) {
    this.log('INFO', message, context);
  }

  warn(message, context = {}) {
    this.log('WARN', message, context);
  }

  error(message, context = {}, error = null) {
    this.log('ERROR', message, context, error);
  }

  logAuthentication(success, userId, reason, context = {}) {
    this.log(success ? 'INFO' : 'WARN', 
      success ? 'Authentication successful' : 'Authentication failed',
      { ...context, operation: 'authentication', success, userId, reason }
    );
  }

  logDatabaseOperation(operation, table, success, duration, context = {}) {
    this.log(success ? 'INFO' : 'ERROR',
      `Database ${operation} on ${table} - ${success ? 'SUCCESS' : 'FAILED'}`,
      { ...context, operation: `db_${operation}`, table, duration, success }
    );
  }

  logBusinessLogic(operation, success, data, context = {}) {
    this.log(success ? 'INFO' : 'ERROR',
      `Business operation: ${operation} - ${success ? 'SUCCESS' : 'FAILED'}`,
      { ...context, operation: 'business_logic', businessOperation: operation, success, data }
    );
  }
}

// Clear previous demo logs
const logFile = path.join(__dirname, '..', 'demo-logs.json');
if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile);
}

console.log('🚀 Starting Telehealth Backend Logging Demo...\n');

const logger = new MockLogger('patients');

// Simulate various logging scenarios
console.log('📝 Simulating API request logging...');
logger.info('Incoming POST request', {
  requestId: 'req-123-abc',
  method: 'POST',
  path: '/auth/login',
  userAgent: 'Mozilla/5.0 (Demo Browser)',
  ip: '192.168.1.100'
});

setTimeout(() => {
  console.log('\n🔐 Simulating authentication logging...');
  logger.logAuthentication(true, 'patient-456', undefined, {
    requestId: 'req-123-abc',
    email: 'demo@example.com'
  });
}, 1000);

setTimeout(() => {
  console.log('\n💾 Simulating database operation logging...');
  logger.logDatabaseOperation('query', 'PatientsTable', true, 45, {
    requestId: 'req-123-abc',
    index: 'email-index',
    itemCount: 1
  });
}, 2000);

setTimeout(() => {
  console.log('\n🏥 Simulating business logic logging...');
  logger.logBusinessLogic('patient_login', true, { patientId: 'patient-456' }, {
    requestId: 'req-123-abc'
  });
}, 3000);

setTimeout(() => {
  console.log('\n⚠️  Simulating error logging...');
  try {
    throw new Error('Demo database connection timeout');
  } catch (error) {
    logger.error('Database connection failed', {
      requestId: 'req-124-def',
      operation: 'db_connection'
    }, error);
  }
}, 4000);

setTimeout(() => {
  console.log('\n✅ Demo completed! Log file created at: demo-logs.json');
  console.log('\n📊 You can now tail these logs using:');
  console.log('   tail -f demo-logs.json');
  console.log('   or');
  console.log('   ./scripts/tail-demo-logs.sh');
}, 5000);
