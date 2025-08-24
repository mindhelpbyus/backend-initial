export declare enum LogLevel {
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
export declare class Logger {
    private service;
    private environment;
    private logLevel;
    constructor(service: string, environment?: string);
    private getLogLevel;
    private shouldLog;
    private createLogEntry;
    private log;
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext, error?: Error): void;
    error(message: string, context?: LogContext, error?: Error): void;
    logRequest(method: string, path: string, context?: LogContext): void;
    logResponse(method: string, path: string, statusCode: number, duration: number, context?: LogContext): void;
    logDatabaseOperation(operation: string, table: string, success: boolean, duration: number, context?: LogContext): void;
    logAuthentication(success: boolean, userId?: string, reason?: string, context?: LogContext): void;
    logValidationError(errors: string[], context?: LogContext): void;
    logBusinessLogic(operation: string, success: boolean, details?: any, context?: LogContext): void;
}
export declare const createLogger: (service: string) => Logger;
export declare class PerformanceMonitor {
    private startTime;
    private logger;
    private operation;
    private context;
    constructor(logger: Logger, operation: string, context?: LogContext);
    end(success?: boolean, additionalContext?: LogContext): number;
    endWithError(error: Error, additionalContext?: LogContext): number;
}
export declare const withLogging: (handler: Function, logger: Logger) => (event: any, context: any) => Promise<any>;
//# sourceMappingURL=logger.d.ts.map