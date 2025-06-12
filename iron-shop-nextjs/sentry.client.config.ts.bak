import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Enhanced error context
  beforeSend(event, hint) {
    // Filter out non-critical errors in production
    if (process.env.NODE_ENV === 'production') {
      // Skip ResizeObserver loop limit exceeded errors
      if (event.exception?.values?.[0]?.value?.includes('ResizeObserver loop limit exceeded')) {
        return null;
      }
      
      // Skip certain console warnings
      if (event.level === 'warning' && event.logger === 'console') {
        return null;
      }
    }
    
    return event;
  },
  
  // Environment and release configuration
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Privacy settings
  beforeBreadcrumb(breadcrumb) {
    // Don't capture console logs in production
    if (process.env.NODE_ENV === 'production' && breadcrumb.category === 'console') {
      return null;
    }
    return breadcrumb;
  },
  
  // Integration configuration
  integrations: [
    new Sentry.Replay({
      // Mask all text and inputs for privacy
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
  
  // Performance configuration
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Debugging
  debug: process.env.NODE_ENV === 'development',
});