import * as Sentry from '@sentry/nextjs';
import { log } from './logger';

export interface ErrorContext {
  userId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: ErrorContext;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: ErrorContext
  ) {
    super(message);
    
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 400, true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required', context?: ErrorContext) {
    super(message, 401, true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions', context?: ErrorContext) {
    super(message, 403, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', context?: ErrorContext) {
    super(message, 404, true, context);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests', context?: ErrorContext) {
    super(message, 429, true, context);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error', context?: ErrorContext) {
    super(message, 500, false, context);
  }
}

// Global error handler
export function handleError(error: Error | AppError, context?: ErrorContext): void {
  let errorToHandle = error;

  // Convert generic errors to AppError
  if (!(error instanceof AppError)) {
    errorToHandle = new InternalServerError(error.message, context);
    errorToHandle.stack = error.stack;
  }

  const appError = errorToHandle as AppError;
  
  // Log the error
  log.error(
    `${appError.name}: ${appError.message}`,
    appError,
    {
      statusCode: appError.statusCode,
      isOperational: appError.isOperational,
      context: appError.context || context,
    }
  );

  // Send to Sentry for non-operational errors or critical operational errors
  if (!appError.isOperational || appError.statusCode >= 500) {
    Sentry.withScope((scope) => {
      // Set error context
      if (appError.context) {
        scope.setContext('error_context', appError.context);
        
        if (appError.context.userId) {
          scope.setUser({ id: appError.context.userId });
        }
        
        if (appError.context.requestId) {
          scope.setTag('request_id', appError.context.requestId);
        }
        
        if (appError.context.url) {
          scope.setTag('url', appError.context.url);
        }
      }

      // Set error level
      scope.setLevel(appError.statusCode >= 500 ? 'error' : 'warning');
      
      // Set error type
      scope.setTag('error_type', appError.constructor.name);
      scope.setTag('status_code', appError.statusCode.toString());
      scope.setTag('operational', appError.isOperational.toString());

      Sentry.captureException(appError);
    });
  }

  // Log security-related errors
  if (appError.statusCode === 401 || appError.statusCode === 403) {
    log.security('authentication_error', {
      error: appError.message,
      statusCode: appError.statusCode,
      context: appError.context,
    });
  }

  // Exit process for unhandled non-operational errors in production
  if (!appError.isOperational && process.env.NODE_ENV === 'production') {
    log.error('Unhandled non-operational error. Shutting down...', appError);
    process.exit(1);
  }
}

// Process-level error handlers
export function setupGlobalErrorHandlers(): void {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    log.error('Uncaught Exception:', error);
    handleError(new InternalServerError('Uncaught Exception'));
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: unknown) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    log.error('Unhandled Rejection:', error);
    handleError(new InternalServerError('Unhandled Promise Rejection'));
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log.info('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    log.info('SIGINT received. Shutting down gracefully...');
    process.exit(0);
  });
}

// Error recovery utilities
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: Partial<ErrorContext>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error as Error, context as ErrorContext);
      throw error;
    }
  };
}

export function safeAsync<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  fallback?: R,
  context?: Partial<ErrorContext>
) {
  return async (...args: T): Promise<R | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error as Error, context as ErrorContext);
      return fallback;
    }
  };
}