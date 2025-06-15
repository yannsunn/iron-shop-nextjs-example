# Example Deployment Guide

This is a sample/example version of the Iron Works website.

## Important Notes

🚨 **This is a sample site with example data**
- Contact information is fictional
- Company details are example data

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update the environment variables with your example domain:
```env
NEXT_PUBLIC_SITE_URL=https://your-example-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="Your Example Site"
```

## Deployment Steps

### 1. GitHub Repository
Create a new repository with "example" suffix:
```bash
git remote add origin https://github.com/yourusername/iron-shop-nextjs-example.git
```

### 2. Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Configure custom domain with "example" subdomain:
   - `iron-shop-example.yourdomain.com`
   - `portfolio-ironworks-example.vercel.app`

### 3. Custom Domain Setup
For custom domain with example suffix:
```
CNAME: iron-shop-example -> vercel-dns.com
```

## Portfolio Features Highlighted

✅ **Modern Next.js 14 Architecture**
- App Router implementation
- Server-side rendering optimization
- TypeScript for type safety

✅ **Advanced UI/UX Design**
- Responsive design for all devices
- Smooth animations and transitions
- Accessibility compliance (WCAG 2.1)

✅ **Performance Optimization**
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Core Web Vitals optimization

✅ **SEO Best Practices**
- Structured data implementation
- Meta tags optimization
- Sitemap and robots.txt

✅ **Security Features**
- Security headers configuration
- Form validation and sanitization
- XSS protection

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Deploy to example site
npm run deploy
```

## Demo Data Notice

All data in this example site is fictional:
- Customer testimonials are examples
- Business information is sample data
- Contact details are not functional
- Product information is for demonstration only

---

**Sample site for demonstration**