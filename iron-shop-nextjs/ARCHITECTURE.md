# 🏗️ **アイアンショップ - 限界突破アーキテクチャ設計書**

## 🚀 **システム全体図**

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
├─────────────────────────────────────────────────────────┤
│  Browser (Chrome/Safari/Firefox/Edge)                  │
│  ├─ Next.js App Router (RSC + Client Components)       │
│  ├─ React 18.3 (Concurrent Features)                   │
│  ├─ TypeScript 5.7 (Strict Mode)                       │
│  └─ Tailwind CSS 3.4 (JIT + Custom Design System)     │
├─────────────────────────────────────────────────────────┤
│                    PERFORMANCE LAYER                    │
├─────────────────────────────────────────────────────────┤
│  ├─ Image Optimization (WebP/AVIF)                     │
│  ├─ Code Splitting (Dynamic Imports)                   │
│  ├─ Bundle Analysis (@next/bundle-analyzer)            │
│  └─ Core Web Vitals Monitoring                         │
├─────────────────────────────────────────────────────────┤
│                    SECURITY LAYER                       │
├─────────────────────────────────────────────────────────┤
│  ├─ Content Security Policy (CSP)                      │
│  ├─ HTTP Security Headers                              │
│  ├─ Middleware Protection                              │
│  └─ Input Validation & Sanitization                    │
├─────────────────────────────────────────────────────────┤
│                   DEPLOYMENT LAYER                      │
├─────────────────────────────────────────────────────────┤
│  Vercel Edge Runtime                                   │
│  ├─ Global CDN (Edge Locations)                        │
│  ├─ Automatic HTTPS (SSL/TLS)                          │
│  ├─ DNS Management                                     │
│  └─ Analytics & Monitoring                             │
└─────────────────────────────────────────────────────────┘
```

## 🧩 **コンポーネントアーキテクチャ**

### **階層構造**
```
src/
├─ app/                    # Next.js 15 App Router
│  ├─ layout.tsx          # Root Layout (Global)
│  ├─ page.tsx            # Home Page
│  ├─ loading.tsx         # Loading UI
│  ├─ error.tsx           # Error Boundary
│  ├─ not-found.tsx       # 404 Page
│  ├─ globals.css         # Global Styles
│  ├─ robots.ts           # SEO - Robots.txt
│  └─ sitemap.ts          # SEO - Sitemap
├─ components/             # React Components
│  ├─ ui/                 # Primitive Components
│  │  ├─ Button.tsx       # Reusable Button
│  │  └─ Card.tsx         # Reusable Card
│  ├─ Header.tsx          # Navigation
│  ├─ Hero.tsx            # Hero Section
│  ├─ Gallery.tsx         # Portfolio Gallery
│  ├─ About.tsx           # Company Info
│  ├─ Contact.tsx         # Contact Form
│  ├─ Footer.tsx          # Footer
│  └─ StructuredData.tsx  # SEO Schema
├─ hooks/                 # Custom React Hooks
│  ├─ useIntersectionObserver.ts
│  ├─ useMousePosition.ts
│  └─ useScrollDirection.ts
├─ context/               # State Management
│  └─ AppContext.tsx      # Global App State
├─ lib/                   # Utilities
│  ├─ utils.ts           # Helper Functions
│  └─ constants.ts       # App Constants
└─ middleware.ts          # Next.js Middleware
```

## 🎨 **デザインシステム**

### **カラーパレット**
```typescript
// Primary Colors
iron: {
  light: '#f9f9f9',   // Background
  DEFAULT: '#333333', // Text
  dark: '#222222',    // Accent
}

// Semantic Colors
blue: {
  500: '#3b82f6',     // Primary Action
  600: '#2563eb',     // Hover State
  900: '#1e3a8a',     // Dark Accent
}

purple: {
  500: '#8b5cf6',     // Secondary
  600: '#7c3aed',     // Gradient
}
```

### **タイポグラフィ**
```typescript
// Font Stack
fontFamily: {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'sans-serif'
  ]
}

// Font Sizes
'2xs': '0.625rem',    // 10px
'xs': '0.75rem',      // 12px
'sm': '0.875rem',     // 14px
'base': '1rem',       // 16px
'lg': '1.125rem',     // 18px
'xl': '1.25rem',      // 20px
'2xl': '1.5rem',      // 24px
'3xl': '1.875rem',    // 30px
'4xl': '2.25rem',     // 36px
'5xl': '3rem',        // 48px
'6xl': '3.75rem',     // 60px
'7xl': '4.5rem',      // 72px
'8xl': '6rem',        // 96px
```

## ⚡ **パフォーマンス戦略**

### **画像最適化**
```typescript
// Next.js Image Configuration
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  quality: 85-100, // 用途別最適化
  minimumCacheTTL: 60,
}
```

### **コード分割**
```typescript
// Dynamic Imports
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <GallerySkeleton />,
  ssr: true
})

// Route-based Splitting
// Next.js が自動で実行
```

### **メモ化戦略**
```typescript
// Component Memoization
const GalleryItem = React.memo<GalleryItemProps>(({ ... }) => {
  // 重いレンダリング処理
})

// Value Memoization
const expensiveValue = useMemo(() => {
  return heavyCalculation(props)
}, [dependencies])

// Callback Memoization
const handleClick = useCallback(() => {
  // イベントハンドラー
}, [dependencies])
```

## 🔒 **セキュリティアーキテクチャ**

### **Content Security Policy**
```typescript
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' https://fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
```

### **HTTP セキュリティヘッダー**
```typescript
headers: [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

## 📊 **監視・分析**

### **パフォーマンス監視**
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Analyzer**: バンドルサイズ追跡
- **Lighthouse CI**: 自動パフォーマンステスト
- **Vercel Analytics**: リアルタイム監視

### **エラー追跡**
- **Error Boundaries**: React エラーキャッチ
- **Custom Error Pages**: 404/500 ページ
- **Console Logging**: 開発環境詳細ログ
- **Production Monitoring**: 本番環境監視

## 🚀 **デプロイメント戦略**

### **ビルドプロセス**
```bash
# 1. 依存関係インストール
npm ci

# 2. 型チェック
npm run type-check

# 3. Lint実行
npm run lint

# 4. フォーマットチェック
npm run format:check

# 5. ビルド実行
npm run build

# 6. デプロイ
vercel deploy --prod
```

### **環境管理**
- **Development**: ローカル開発環境
- **Preview**: プルリクエストプレビュー
- **Production**: 本番環境
- **Environment Variables**: 環境別設定

## 🔄 **状態管理アーキテクチャ**

### **Context + useReducer パターン**
```typescript
interface AppState {
  isMenuOpen: boolean
  currentSection: string
  theme: 'light' | 'dark'
  isLoading: boolean
  notifications: Notification[]
}

type AppAction =
  | { type: 'TOGGLE_MENU' }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }

// Reducer関数で状態更新を管理
function appReducer(state: AppState, action: AppAction): AppState
```

---

*この設計書は、技術的限界を突破した最先端アーキテクチャの実装指針です。*