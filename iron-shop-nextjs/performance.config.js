module.exports = {
  // Bundle size budgets (in bytes)
  budgets: {
    // Main bundle size limits
    'main.js': 250 * 1024, // 250KB
    'vendor.js': 500 * 1024, // 500KB
    'total.js': 750 * 1024, // 750KB total JS
    'total.css': 50 * 1024, // 50KB total CSS
    
    // Individual page limits
    'pages/*.js': 100 * 1024, // 100KB per page
    
    // Asset limits
    'images/*': 500 * 1024, // 500KB per image
    'fonts/*': 100 * 1024, // 100KB per font
  },

  // Performance metrics thresholds
  metrics: {
    // Core Web Vitals
    LCP: 2.5, // Largest Contentful Paint (seconds)
    FID: 0.1, // First Input Delay (seconds)
    CLS: 0.1, // Cumulative Layout Shift
    
    // Additional metrics
    FCP: 1.8, // First Contentful Paint (seconds)
    TTFB: 0.8, // Time to First Byte (seconds)
    TTI: 3.8, // Time to Interactive (seconds)
    TBT: 0.2, // Total Blocking Time (seconds)
    SI: 3.4, // Speed Index (seconds)
  },

  // Lighthouse performance thresholds
  lighthouse: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 90,
    pwa: 80,
  },

  // Network conditions for testing
  networkConditions: {
    // Mobile 3G
    mobile3G: {
      downloadThroughput: 1.6 * 1024 * 1024 / 8, // 1.6 Mbps
      uploadThroughput: 750 * 1024 / 8, // 750 Kbps
      latency: 150, // 150ms
    },
    // Fast 3G
    fast3G: {
      downloadThroughput: 1.6 * 1024 * 1024 / 8, // 1.6 Mbps
      uploadThroughput: 750 * 1024 / 8, // 750 Kbps
      latency: 75, // 75ms
    },
    // 4G
    mobile4G: {
      downloadThroughput: 9 * 1024 * 1024 / 8, // 9 Mbps
      uploadThroughput: 9 * 1024 * 1024 / 8, // 9 Mbps
      latency: 20, // 20ms
    },
  },

  // Performance monitoring configuration
  monitoring: {
    // Real User Monitoring (RUM) sampling rate
    rumSampleRate: 0.1, // 10% of users
    
    // Synthetic monitoring intervals
    syntheticInterval: '*/30 * * * *', // Every 30 minutes
    
    // Alert thresholds
    alerts: {
      // Alert if performance score drops below threshold
      performanceScore: 85,
      
      // Alert if any Core Web Vital exceeds threshold
      coreWebVitals: {
        LCP: 4.0, // Alert if LCP > 4s
        FID: 0.3, // Alert if FID > 300ms
        CLS: 0.25, // Alert if CLS > 0.25
      },
      
      // Bundle size increase alerts
      bundleSizeIncrease: 0.1, // Alert if bundle size increases by 10%
    },
  },

  // Performance optimization hints
  optimizations: {
    // Image optimization
    images: {
      formats: ['webp', 'avif'],
      quality: 85,
      progressive: true,
      lazy: true,
    },
    
    // Code splitting
    codeSplitting: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 100000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    
    // Preloading strategies
    preload: {
      // Critical resources to preload
      critical: [
        '/fonts/main.woff2',
        '/images/hero.webp',
      ],
      
      // Resources to prefetch
      prefetch: [
        '/images/gallery-1.webp',
        '/images/gallery-2.webp',
      ],
    },
  },

  // Browser support for performance features
  browserSupport: {
    webp: ['Chrome >= 23', 'Firefox >= 65', 'Safari >= 14'],
    avif: ['Chrome >= 85', 'Firefox >= 86'],
    lazy: ['Chrome >= 76', 'Firefox >= 75', 'Safari >= 15.4'],
    preload: ['Chrome >= 50', 'Firefox >= 85', 'Safari >= 11.1'],
  },
};