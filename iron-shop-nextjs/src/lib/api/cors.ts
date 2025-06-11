import { NextRequest, NextResponse } from 'next/server';

interface CORSOptions {
  origin?: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultCORSOptions: CORSOptions = {
  origin: false, // Default to no CORS for security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  credentials: false,
  maxAge: 86400, // 24 hours
};

export function corsMiddleware(options: CORSOptions = {}) {
  const config = { ...defaultCORSOptions, ...options };

  return (request: NextRequest): NextResponse | null => {
    const origin = request.headers.get('origin');
    const method = request.method;

    // Handle preflight requests
    if (method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      
      // Check if origin is allowed
      if (isOriginAllowed(origin, config.origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
      }
      
      if (config.credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      if (config.methods?.length) {
        response.headers.set('Access-Control-Allow-Methods', config.methods.join(', '));
      }
      
      if (config.allowedHeaders?.length) {
        response.headers.set('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
      }
      
      if (config.maxAge) {
        response.headers.set('Access-Control-Max-Age', config.maxAge.toString());
      }
      
      return response;
    }

    return null; // Let the request continue
  };
}

export function setCORSHeaders(response: NextResponse, origin: string | null, options: CORSOptions = {}): void {
  const config = { ...defaultCORSOptions, ...options };

  if (isOriginAllowed(origin, config.origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
  }
  
  if (config.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  if (config.methods?.length) {
    response.headers.set('Access-Control-Allow-Methods', config.methods.join(', '));
  }
}

function isOriginAllowed(origin: string | null, allowedOrigin: string | string[] | boolean | undefined): boolean {
  if (!allowedOrigin) return false;
  if (allowedOrigin === true) return true;
  if (!origin) return false;

  if (typeof allowedOrigin === 'string') {
    return origin === allowedOrigin;
  }

  if (Array.isArray(allowedOrigin)) {
    return allowedOrigin.includes(origin);
  }

  return false;
}

// Pre-configured CORS settings
export const publicAPICORS = corsMiddleware({
  origin: true, // Allow all origins for public APIs
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: false,
});

export const restrictedAPICORS = corsMiddleware({
  origin: [
    'https://iron-shop-nextjs.vercel.app',
    'https://ironshop.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
});

export const contactFormCORS = corsMiddleware({
  origin: [
    'https://iron-shop-nextjs.vercel.app',
    'https://ironshop.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
});