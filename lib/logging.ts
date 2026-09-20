/**
 * Structured Logging Utility
 * 
 * Provides consistent logging with redaction of sensitive data.
 * Supports multiple log levels and structured output.
 */

import { serverEnv } from '@/config/env';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = LOG_LEVELS[serverEnv.LOG_LEVEL] ?? LOG_LEVELS.info;

// Fields to redact from logs
const REDACTED_FIELDS = [
  'password',
  'secret',
  'key',
  'token',
  'api_key',
  'apikey',
  'authorization',
  'cookie',
  'session',
  'credit_card',
  'ssn',
];

function redactSensitiveData(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(redactSensitiveData);
  }
  
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (REDACTED_FIELDS.some(field => lowerKey.includes(field))) {
      result[key] = '[REDACTED]';
    } else {
      result[key] = redactSensitiveData(value);
    }
  }
  return result;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

function formatLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
): LogEntry {
  const redactedContext = context ? (redactSensitiveData(context) as Record<string, unknown>) : undefined;
  
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context: redactedContext,
    error: error
      ? {
          name: error.name,
          message: error.message,
          stack: serverEnv.APP_ENV === 'development' ? error.stack : undefined,
        }
      : undefined,
  };
  return entry;
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
  if (LOG_LEVELS[level] < currentLevel) return;
  
  const entry = formatLogEntry(level, message, context, error);
  const output = JSON.stringify(entry);
  
  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => 
    log('debug', message, context),
  info: (message: string, context?: Record<string, unknown>) => 
    log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => 
    log('warn', message, context),
  error: (message: string, error?: Error, context?: Record<string, unknown>) => 
    log('error', message, context, error),
  
  // Convenience methods for common patterns
  request: (method: string, path: string, status: number, durationMs: number) =>
    logger.info('HTTP Request', {
      method,
      path,
      status,
      duration_ms: durationMs,
    }),
  
  database: (operation: string, table: string, durationMs: number) =>
    logger.debug('Database Operation', {
      operation,
      table,
      duration_ms: durationMs,
    }),
  
  api: (provider: string, endpoint: string, status: number, durationMs: number) =>
    logger.info('External API Call', {
      provider,
      endpoint,
      status,
      duration_ms: durationMs,
    }),
  
  job: (jobName: string, status: 'started' | 'completed' | 'failed', jobId?: string) =>
    logger.info('Background Job', {
      job_name: jobName,
      status,
      job_id: jobId,
    }),
};

export default logger;
