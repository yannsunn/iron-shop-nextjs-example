// const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-analyzer-report.html',
        })
      );
      return config;
    },
  }),

  // Security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        {
          key: 'Content-Security-Policy',
          value: process.env.NODE_ENV === 'development'
            ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:* ws://localhost:*; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: http:; font-src 'self' data:; connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*; frame-src 'self'; object-src 'none';"
            : "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://vercel.live wss://ws-us3.pusher.com; frame-src 'self' https://vercel.live; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
        },
      ],
    },
  ],

  // Redirects and rewrites
  redirects: async () => [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
  ],

  // Experimental features
  experimental: {
    optimizePackageImports: ['@sentry/nextjs'],
  },

  // Type checking
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Build configuration
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-value',
  },
};

// Sentry configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  
  // Upload source maps to Sentry
  hideSourceMaps: true,
  
  // Disable source map uploading in development
  dryRun: process.env.NODE_ENV === 'development',
  
  // Organization and project
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Release configuration
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Include source maps from all source files
  include: ['.next'],
  
  // Ignore certain files
  ignore: ['node_modules', 'webpack.config.js'],
  
  // Automatically set up error monitoring
  automaticVercelMonitors: true,
};

module.exports = nextConfig;
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);