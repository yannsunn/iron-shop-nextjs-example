import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring (lower sample rate for edge)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.5,
  
  // Environment and release configuration
  environment: process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Edge-specific configuration
  initialScope: {
    tags: {
      component: 'edge',
    },
  },
  
  // Minimal debugging for edge runtime
  debug: false,
});