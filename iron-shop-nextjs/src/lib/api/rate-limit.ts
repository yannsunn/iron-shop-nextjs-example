import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production)
const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> => {
    const identifier = getClientIdentifier(request);
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Get or create rate limit entry
    if (!store[identifier] || store[identifier].resetTime <= now) {
      store[identifier] = {
        count: 0,
        resetTime: now + config.windowMs,
      };
    }

    const entry = store[identifier];
    
    // Check if request is within rate limit
    if (entry.count >= config.maxRequests) {
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        reset: entry.resetTime,
      };
    }

    // Increment counter
    entry.count++;

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  };
}

function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIp || realIp || forwarded?.split(',')[0] || 'unknown';
  
  // Include User-Agent for additional fingerprinting
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return `${ip}:${userAgent}`;
}

// Pre-configured rate limiters
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3, // 3 submissions per 15 minutes
});

export const generalApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute
});

export const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
});