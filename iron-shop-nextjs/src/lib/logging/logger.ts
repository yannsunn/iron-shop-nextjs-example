import winston from 'winston';
import * as Sentry from '@sentry/nextjs';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(logColors);

// Create logger formats
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create transports
const transports = [];

// Console transport for development
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: developmentFormat,
    })
  );
}

// Console transport for production (JSON format)
if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.Console({
      format: productionFormat,
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  levels: logLevels,
  format: productionFormat,
  transports,
  exitOnError: false,
});

// Custom logger interface with Sentry integration
export const log = {
  error: (message: string, error?: Error | unknown, meta?: Record<string, any>) => {
    logger.error(message, { error: error instanceof Error ? error.stack : error, ...meta });
    
    if (error instanceof Error) {
      Sentry.captureException(error, {
        tags: { component: 'logger' },
        extra: { message, ...meta },
      });
    } else {
      Sentry.captureMessage(message, 'error');
    }
  },

  warn: (message: string, meta?: Record<string, any>) => {
    logger.warn(message, meta);
    
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(message, 'warning');
    }
  },

  info: (message: string, meta?: Record<string, any>) => {
    logger.info(message, meta);
  },

  http: (message: string, meta?: Record<string, any>) => {
    logger.http(message, meta);
  },

  debug: (message: string, meta?: Record<string, any>) => {
    logger.debug(message, meta);
  },

  // Security-specific logging
  security: (event: string, details: Record<string, any>) => {
    const securityEvent = {
      type: 'security',
      event,
      timestamp: new Date().toISOString(),
      ...details,
    };
    
    logger.warn(`Security Event: ${event}`, securityEvent);
    
    Sentry.captureMessage(`Security Event: ${event}`, {
      level: 'warning',
      tags: { 
        component: 'security',
        event_type: event,
      },
      extra: securityEvent,
    });
  },

  // Performance logging
  performance: (metric: string, value: number, unit = 'ms', meta?: Record<string, any>) => {
    const perfEvent = {
      type: 'performance',
      metric,
      value,
      unit,
      timestamp: new Date().toISOString(),
      ...meta,
    };
    
    logger.info(`Performance: ${metric} = ${value}${unit}`, perfEvent);
    
    // Send to Sentry as a custom metric
    Sentry.metrics.gauge(metric, value, {
      unit,
      tags: { component: 'performance', ...meta },
    });
  },

  // API request logging
  apiRequest: (method: string, path: string, statusCode: number, duration: number, userId?: string) => {
    const requestEvent = {
      type: 'api_request',
      method,
      path,
      statusCode,
      duration,
      userId,
      timestamp: new Date().toISOString(),
    };
    
    const level = statusCode >= 400 ? 'warn' : 'http';
    logger[level](`${method} ${path} ${statusCode} - ${duration}ms`, requestEvent);
    
    if (statusCode >= 400) {
      Sentry.addBreadcrumb({
        category: 'http',
        message: `${method} ${path}`,
        level: statusCode >= 500 ? 'error' : 'warning',
        data: requestEvent,
      });
    }
  },

  // User action logging
  userAction: (action: string, userId: string, meta?: Record<string, any>) => {
    const actionEvent = {
      type: 'user_action',
      action,
      userId,
      timestamp: new Date().toISOString(),
      ...meta,
    };
    
    logger.info(`User Action: ${action}`, actionEvent);
    
    Sentry.addBreadcrumb({
      category: 'user',
      message: action,
      level: 'info',
      data: actionEvent,
    });
  },
};

export default log;