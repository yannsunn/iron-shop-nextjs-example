# ⚡ ステップ4: パフォーマンス監視と最適化

## 🎯 概要
継続的なパフォーマンス監視とサイト最適化で最高のユーザー体験を提供します。

## 📊 監視対象メトリクス

### 4.1 Core Web Vitals（重要度: 最高）

#### 🚀 Google推奨基準値
```javascript
Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5秒
- FID (First Input Delay): < 100ms  
- CLS (Cumulative Layout Shift): < 0.1

その他重要指標:
- FCP (First Contentful Paint): < 1.5秒
- TTFB (Time to First Byte): < 600ms
- Speed Index: < 3.0秒
```

### 4.2 ビジネスメトリクス

#### 💼 KPI指標
```javascript
パフォーマンス影響指標:
- コンバージョン率 (目標: 2%以上)
- 直帰率 (目標: 40%以下)
- セッション時間 (目標: 2分以上)
- ページビュー/セッション (目標: 3以上)
- リピート率 (目標: 30%以上)
```

## 🔧 Phase 1: 監視ツール設定

### 1.1 Vercel Speed Insights強化

#### 📍 詳細設定実装
```typescript
// src/lib/performance.ts
export const trackPerformance = () => {
  if (typeof window !== 'undefined') {
    // Web Vitals追跡
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
}

// カスタムパフォーマンス追跡
export const trackCustomMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // ページ読み込み完了時間
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      console.log(`Page load time: ${loadTime}ms`)
      
      // Analytics送信
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          event_category: 'performance',
          value: Math.round(loadTime),
        })
      }
    })
  }
}
```

#### 🎛️ コンポーネント統合
```typescript
// src/app/layout.tsx
import { trackPerformance, trackCustomMetrics } from '@/lib/performance'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    trackPerformance()
    trackCustomMetrics()
  }, [])

  return (
    <html lang="ja">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 1.2 外部監視ツール導入

#### 🌐 推奨監視サービス

| サービス | 費用 | 機能 | 監視頻度 |
|----------|------|------|----------|
| **UptimeRobot** | 無料-$7/月 | 稼働監視、SSL証明書 | 5分間隔 |
| **Pingdom** | $10/月 | 詳細分析、世界各地から | 1分間隔 |
| **GTmetrix** | 無料-$15/月 | パフォーマンス分析 | 手動/自動 |
| **PageSpeed Insights API** | 無料 | Google公式指標 | API経由 |

#### 🚨 アラート設定例
```javascript
// UptimeRobot設定例
監視URL: https://your-domain.com
チェック間隔: 5分
アラート条件:
- サイトダウン: 即座に通知
- 応答時間 > 3秒: 3回連続で通知
- SSL証明書期限: 30日前に通知

通知方法:
- Email: your-email@example.com
- Slack: #alerts チャンネル
- SMS: 重要なアラートのみ
```

### 1.3 リアルユーザー監視（RUM）

#### 📊 カスタムRUM実装
```typescript
// src/lib/rum.ts
interface PerformanceData {
  url: string
  loadTime: number
  ttfb: number
  fcp: number
  lcp: number
  cls: number
  fid: number
  userAgent: string
  timestamp: number
}

export class RUMTracker {
  private data: PerformanceData[] = []

  constructor() {
    this.initializeTracking()
  }

  private initializeTracking() {
    if (typeof window === 'undefined') return

    // Navigation API使用
    this.trackNavigation()
    
    // Web Vitals追跡
    this.trackWebVitals()
    
    // 定期的にデータ送信
    this.scheduleDataSending()
  }

  private trackNavigation() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const data: PerformanceData = {
        url: window.location.href,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        fcp: 0, // Web Vitalsで設定
        lcp: 0, // Web Vitalsで設定
        cls: 0, // Web Vitalsで設定
        fid: 0, // Web Vitalsで設定
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }

      this.data.push(data)
    })
  }

  private trackWebVitals() {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP }) => {
      getCLS((metric) => this.updateMetric('cls', metric.value))
      getFID((metric) => this.updateMetric('fid', metric.value))
      getFCP((metric) => this.updateMetric('fcp', metric.value))
      getLCP((metric) => this.updateMetric('lcp', metric.value))
    })
  }

  private updateMetric(metricName: keyof PerformanceData, value: number) {
    if (this.data.length > 0) {
      const lastEntry = this.data[this.data.length - 1]
      lastEntry[metricName] = value
    }
  }

  private scheduleDataSending() {
    // 5分ごとにデータ送信
    setInterval(() => {
      this.sendData()
    }, 5 * 60 * 1000)

    // ページ離脱時にもデータ送信
    window.addEventListener('beforeunload', () => {
      this.sendData()
    })
  }

  private sendData() {
    if (this.data.length === 0) return

    // Google Analytics 4に送信
    this.data.forEach(entry => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance_data', {
          event_category: 'rum',
          custom_map: entry,
        })
      }
    })

    // 独自エンドポイントに送信（オプション）
    fetch('/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.data),
    }).catch(console.error)

    // データクリア
    this.data = []
  }
}

// 初期化
export const rum = new RUMTracker()
```

## ⚡ Phase 2: パフォーマンス最適化

### 2.1 画像最適化強化

#### 🖼️ Next.js Image最適化設定
```javascript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 実験的機能
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}
```

#### 📱 レスポンシブ画像実装
```typescript
// src/components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

const OptimizedImage = ({ src, alt, className, priority = false }: OptimizedImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7Dh5zH23HlrhQxgbsM="
      onLoadingComplete={(result) => {
        console.log('Image loaded:', result.naturalWidth, 'x', result.naturalHeight)
      }}
    />
  )
}

export default OptimizedImage
```

### 2.2 コード分割とレイジーローディング

#### 🔄 動的インポート実装
```typescript
// src/components/LazyComponents.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// 重いコンポーネントを動的ロード
const HeavyGallery = dynamic(() => import('./Gallery'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />,
  ssr: false, // クライアントサイドでのみロード
})

const LazyContactForm = dynamic(() => import('./Contact'), {
  loading: () => <div>お問い合わせフォームを読み込み中...</div>,
})

// Intersection Observer使用の遅延ロード
const LazySection = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref}>
      {isVisible ? children : <div className="h-64 bg-gray-100 animate-pulse" />}
    </div>
  )
}

export { HeavyGallery, LazyContactForm, LazySection }
```

### 2.3 キャッシュ戦略最適化

#### 🗄️ Next.js キャッシュ設定
```typescript
// src/app/layout.tsx
export const metadata = {
  // ...他の設定
}

// 静的生成設定
export const revalidate = 3600 // 1時間ごとに再生成

// src/lib/cache.ts
interface CacheConfig {
  key: string
  ttl: number
  data: any
}

class ClientCache {
  private cache = new Map<string, { data: any; expiry: number }>()

  set(key: string, data: any, ttlSeconds: number = 300) {
    const expiry = Date.now() + ttlSeconds * 1000
    this.cache.set(key, { data, expiry })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

export const clientCache = new ClientCache()
```

## 📊 Phase 3: 継続的監視とアラート

### 3.1 自動パフォーマンステスト

#### 🤖 GitHub Actions設定
```yaml
# .github/workflows/performance.yml
name: Performance Testing

on:
  push:
    branches: [main, nextjs-version]
  schedule:
    - cron: '0 0 * * *' # 毎日実行

jobs:
  performance-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Audit URLs using Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://your-domain.com
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

#### ⚙️ Lighthouse CI設定
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 3.2 パフォーマンス予算設定

#### 💰 予算設定例
```javascript
// Performance Budget
{
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 150 // 150KB
    },
    {
      "resourceType": "stylesheet", 
      "budget": 50 // 50KB
    },
    {
      "resourceType": "image",
      "budget": 500 // 500KB
    },
    {
      "resourceType": "total",
      "budget": 1000 // 1MB
    }
  ],
  "resourceCounts": [
    {
      "resourceType": "script",
      "budget": 10
    }
  ],
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 1500
    },
    {
      "metric": "largest-contentful-paint", 
      "budget": 2500
    }
  ]
}
```

### 3.3 アラートシステム構築

#### 🚨 Slack通知設定
```typescript
// src/lib/alerts.ts
interface AlertData {
  metric: string
  value: number
  threshold: number
  url: string
  timestamp: number
}

export class PerformanceAlerts {
  private webhookUrl = process.env.SLACK_WEBHOOK_URL

  async sendAlert(data: AlertData) {
    if (!this.webhookUrl) return

    const message = {
      text: "⚠️ パフォーマンスアラート",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚨 パフォーマンス基準値超過"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*メトリック:* ${data.metric}`
            },
            {
              type: "mrkdwn", 
              text: `*現在値:* ${data.value}ms`
            },
            {
              type: "mrkdwn",
              text: `*基準値:* ${data.threshold}ms`
            },
            {
              type: "mrkdwn",
              text: `*URL:* ${data.url}`
            }
          ]
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "PageSpeed Insightsで確認"
              },
              url: `https://pagespeed.web.dev/report?url=${encodeURIComponent(data.url)}`
            }
          ]
        }
      ]
    }

    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      })
    } catch (error) {
      console.error('Failed to send alert:', error)
    }
  }
}

export const alerts = new PerformanceAlerts()
```

## 🔧 Phase 4: 高度な最適化

### 4.1 Service Worker実装

#### ⚡ PWA機能追加
```typescript
// public/sw.js
const CACHE_NAME = 'iron-shop-v1'
const urlsToCache = [
  '/',
  '/images/hero.jpg',
  '/images/iron1.jpg',
  '/images/iron2.jpg',
  '/images/iron3.jpg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあれば返す、なければネットワークから取得
        return response || fetch(event.request)
      })
  )
})
```

### 4.2 CDN最適化

#### 🌐 Vercel Edge Network活用
```typescript
// vercel.json
{
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "regions": ["nrt1", "hnd1"], // 東京リージョン優先
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/(.*\\.(css|js))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 📊 設定完了チェックリスト

### ✅ 必須監視項目
- [ ] Core Web Vitals監視設定
- [ ] 稼働監視（UptimeRobot等）設定
- [ ] パフォーマンス予算設定
- [ ] 自動テスト（Lighthouse CI）設定
- [ ] アラート通知設定

### ✅ 推奨最適化項目
- [ ] 画像最適化強化
- [ ] コード分割実装
- [ ] キャッシュ戦略最適化
- [ ] PWA機能実装
- [ ] CDN設定最適化

### ✅ 継続監視項目
- [ ] 週次パフォーマンスレポート確認
- [ ] 月次改善点抽出・実装
- [ ] 競合サイト比較分析
- [ ] ユーザーフィードバック収集

## 🔄 継続的改善プロセス

### 改善サイクル（PDCA）

#### 📈 週次確認事項
```javascript
Weekly Review:
1. Core Web Vitalsスコア確認
2. サーバー稼働率確認
3. エラーログ確認
4. ユーザーフィードバック確認
5. 競合サイト分析
```

#### 📊 月次分析・改善
```javascript
Monthly Analysis:
1. 詳細パフォーマンスレポート作成
2. A/Bテスト結果分析
3. コンバージョン率改善点抽出
4. 技術的負債の整理
5. 新機能・改善の優先順位決定
```

---

**⏱️ 推定所要時間: 120-180分**
**🎯 完了後の効果: 最高レベルのサイトパフォーマンス**