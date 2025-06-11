import { NextResponse } from 'next/server';

export interface SecurityHeadersOptions {
  contentSecurityPolicy?: string;
  referrerPolicy?: string;
  permissionsPolicy?: string;
  crossOriginEmbedderPolicy?: string;
  crossOriginOpenerPolicy?: string;
  crossOriginResourcePolicy?: string;
}

const defaultSecurityHeaders: Record<string, string> = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://vercel.live wss://ws-us3.pusher.com",
    "frame-src 'self' https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),

  // Prevent clickjacking
  'X-Frame-Options': 'DENY',

  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // XSS Protection
  'X-XSS-Protection': '1; mode=block',

  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions Policy (Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=()',
    'usb=()',
  ].join(', '),

  // Cross-Origin Policies
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',

  // HSTS (only for HTTPS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

  // Prevent DNS rebinding attacks
  'X-DNS-Prefetch-Control': 'off',

  // Download options for IE
  'X-Download-Options': 'noopen',

  // Prevent Adobe Flash and PDF files from including content from your site
  'X-Permitted-Cross-Domain-Policies': 'none',
};

export function setSecurityHeaders(response: NextResponse, options: SecurityHeadersOptions = {}): void {
  const headers = { ...defaultSecurityHeaders };

  // Override with custom options
  if (options.contentSecurityPolicy) {
    headers['Content-Security-Policy'] = options.contentSecurityPolicy;
  }
  if (options.referrerPolicy) {
    headers['Referrer-Policy'] = options.referrerPolicy;
  }
  if (options.permissionsPolicy) {
    headers['Permissions-Policy'] = options.permissionsPolicy;
  }
  if (options.crossOriginEmbedderPolicy) {
    headers['Cross-Origin-Embedder-Policy'] = options.crossOriginEmbedderPolicy;
  }
  if (options.crossOriginOpenerPolicy) {
    headers['Cross-Origin-Opener-Policy'] = options.crossOriginOpenerPolicy;
  }
  if (options.crossOriginResourcePolicy) {
    headers['Cross-Origin-Resource-Policy'] = options.crossOriginResourcePolicy;
  }

  // Apply all headers
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

// Content Security Policy for different environments
export const developmentCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:* ws://localhost:*",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: http:",
  "font-src 'self' data:",
  "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*",
  "frame-src 'self'",
  "object-src 'none'",
].join('; ');

export const productionCSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

// Rate limit headers
export function setRateLimitHeaders(response: NextResponse, limit: number, remaining: number, reset: number): void {
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());
}