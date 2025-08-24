export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogContext {
  requestId?: string;
  userId?: string;
  patientId?: string;
  doctorId?: string;
  appointmentId?: string;
  operation?: string;
  path?: string;
  method?: string;
  userAgent?: string;
  ip?: string;
  duration?: number;
  statusCode?: number;
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  service: string;
  environment: string;
}

export class Logger {
  private service: string;
  private environment: string;
  private logLevel: LogLevel;

  constructor(service: string, environment: string = process.env.NODE_ENV || 'development') {
    this.service = service;
    this.environment = environment;
    this.logLevel = this.getLogLevel();
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO';
    switch (level) {
      case 'DEBUG': return LogLevel.DEBUG;
      case 'INFO': return LogLevel.INFO;
      case 'WARN': return LogLevel.WARN;
      case 'ERROR': return LogLevel.ERROR;
      default: return LogLevel.INFO;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private createLogEntry(level: string, message: string, context?: LogContext, error?: Error): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      environment: this.environment
    };

    if (context) {
      entry.context = context;
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return entry;
  }

  private log(level: LogLevel, levelName: string, message: string, context?: LogContext, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry = this.createLogEntry(levelName, message, context, error);
    
    // In production, use structured JSON logging
    if (this.environment === 'production') {
      console.log(JSON.stringify(entry));
    } else {
      // In development, use more readable format
      const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
      const errorStr = error ? ` | Error: ${error.message}` : '';
      console.log(`[${entry.timestamp}] ${levelName}: ${message}${contextStr}${errorStr}`);
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, 'INFO', message, context);
  }

  warn(message: string, context?: LogContext, error?: Error): void {
    this.log(LogLevel.WARN, 'WARN', message, context, error);
  }

  error(message: string, context?: LogContext, error?: Error): void {
    this.log(LogLevel.ERROR, 'ERROR', message, context, error);
  }

  // Convenience methods for common operations
  logRequest(method: string, path: string, context?: LogContext): void {
    this.info(`Incoming ${method} request`, {
      ...context,
      method,
      path,
      operation: 'request_start'
    });
  }

  logResponse(method: string, path: string, statusCode: number, duration: number, context?: LogContext): void {
    const message = `${method} ${path} - ${statusCode}`;
    const logContext = {
      ...context,
      method,
      path,
      statusCode,
      duration,
      operation: 'request_complete'
    };

    if (statusCode >= 400) {
      this.error(message, logContext);
    } else if (statusCode >= 300) {
      this.warn(message, logContext);
    } else {
      this.info(message, logContext);
    }
  }

  logDatabaseOperation(operation: string, table: string, success: boolean, duration: number, context?: LogContext): void {
    const message = `Database ${operation} on ${table} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const logContext = {
      ...context,
      operation: `db_${operation}`,
      table,
      duration,
      success
    };
    
    if (success) {
      this.info(message, logContext);
    } else {
      this.error(message, logContext);
    }
  }

  logAuthentication(success: boolean, userId?: string, reason?: string, context?: LogContext): void {
    const message = success ? 'Authentication successful' : `Authentication failed: ${reason}`;
    const logContext = {
      ...context,
      userId,
      operation: 'authentication',
      success,
      reason
    };
    
    if (success) {
      this.info(message, logContext);
    } else {
      this.warn(message, logContext);
    }
  }

  logValidationError(errors: string[], context?: LogContext): void {
    this.warn('Validation failed', {
      ...context,
      operation: 'validation',
      errors
    });
  }

  logBusinessLogic(operation: string, success: boolean, details?: any, context?: LogContext): void {
    const message = `Business operation: ${operation} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const logContext = {
      ...context,
      operation: `business_${operation}`,
      success,
      details
    };
    
    if (success) {
      this.info(message, logContext);
    } else {
      this.error(message, logContext);
    }
  }
}

// Create service-specific loggers
export const createLogger = (service: string): Logger => {
  return new Logger(service);
};

// Performance monitoring utility
export class PerformanceMonitor {
  private startTime: number;
  private logger: Logger;
  private operation: string;
  private context: LogContext;

  constructor(logger: Logger, operation: string, context: LogContext = {}) {
    this.logger = logger;
    this.operation = operation;
    this.context = context;
    this.startTime = Date.now();
    
    this.logger.debug(`Starting operation: ${operation}`, {
      ...context,
      operation: `${operation}_start`
    });
  }

  end(success: boolean = true, additionalContext?: LogContext): number {
    const duration = Date.now() - this.startTime;
    const message = `Operation ${this.operation} completed in ${duration}ms - ${success ? 'SUCCESS' : 'FAILED'}`;
    const logContext = {
      ...this.context,
      ...additionalContext,
      operation: `${this.operation}_complete`,
      duration,
      success
    };
    
    if (success) {
      this.logger.info(message, logContext);
    } else {
      this.logger.error(message, logContext);
    }

    return duration;
  }

  endWithError(error: Error, additionalContext?: LogContext): number {
    const duration = Date.now() - this.startTime;
    this.logger.error(`Operation ${this.operation} failed after ${duration}ms`, {
      ...this.context,
      ...additionalContext,
      operation: `${this.operation}_error`,
      duration
    }, error);

    return duration;
  }
}

// Middleware for Lambda request/response logging
export const withLogging = (handler: Function, logger: Logger) => {
  return async (event: any, context: any) => {
    const requestId = context.awsRequestId;
    const startTime = Date.now();
    
    // Extract request information
    const method = event.requestContext?.http?.method || 'UNKNOWN';
    const path = event.rawPath || event.requestContext?.http?.path || 'UNKNOWN';
    const userAgent = event.headers?.['user-agent'] || 'UNKNOWN';
    const ip = event.requestContext?.http?.sourceIp || 'UNKNOWN';

    const logContext: LogContext = {
      requestId,
      method,
      path,
      userAgent,
      ip
    };

    logger.logRequest(method, path, logContext);

    try {
      const result = await handler(event, context);
      const duration = Date.now() - startTime;
      
      logger.logResponse(method, path, result.statusCode || 200, duration, {
        ...logContext,
        responseSize: result.body ? result.body.length : 0
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error('Unhandled error in Lambda handler', {
        ...logContext,
        duration
      }, error as Error);

      // Re-throw the error to maintain original behavior
      throw error;
    }
  };
};
