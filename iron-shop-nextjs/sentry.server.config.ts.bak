import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Enhanced error context for server-side
  beforeSend(event, hint) {
    // Add server-side context
    if (event.request) {
      // Remove sensitive headers
      if (event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['x-api-key'];
      }
      
      // Remove sensitive query parameters
      if (event.request.query_string) {
        const sensitiveParams = ['token', 'key', 'secret', 'password'];
        let queryString = event.request.query_string;
        sensitiveParams.forEach(param => {
          const regex = new RegExp(`[?&]${param}=[^&]*`, 'gi');
          queryString = queryString.replace(regex, `&${param}=[REDACTED]`);
        });
        event.request.query_string = queryString;
      }
    }
    
    return event;
  },
  
  // Environment and release configuration
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Server-specific configuration
  initialScope: {
    tags: {
      component: 'server',
    },
  },
  
  // Performance configuration
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Debugging
  debug: process.env.NODE_ENV === 'development',
});