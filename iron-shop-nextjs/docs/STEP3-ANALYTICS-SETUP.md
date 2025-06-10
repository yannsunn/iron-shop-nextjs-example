# 📊 ステップ3: Analytics設定

## 🎯 概要
包括的なアナリティクス設定でサイトパフォーマンスとユーザー行動を詳細追跡します。

## 📋 事前準備

### 3.1 利用可能なAnalyticsサービス

#### 🎯 推奨構成（費用対効果順）

| サービス | 費用 | 機能 | おすすめ度 |
|----------|------|------|------------|
| **Vercel Analytics** | $20/月 | リアルタイム、Core Web Vitals | ⭐⭐⭐⭐⭐ |
| **Google Analytics 4** | 無料 | 詳細分析、コンバージョン追跡 | ⭐⭐⭐⭐⭐ |
| **Google Search Console** | 無料 | SEO、検索パフォーマンス | ⭐⭐⭐⭐⭐ |
| **Umami** | 無料 | プライバシー重視 | ⭐⭐⭐⭐ |
| **Plausible** | $9/月 | 軽量、GDPR準拠 | ⭐⭐⭐ |

### 3.2 データ収集戦略

#### 📊 追跡したいメトリクス
- **パフォーマンス**: ページ読み込み速度、Core Web Vitals
- **ユーザー行動**: ページビュー、滞在時間、離脱率
- **コンバージョン**: お問い合わせ送信、電話クリック
- **技術情報**: デバイス、ブラウザ、OS
- **SEO**: 検索キーワード、検索順位

## 🚀 Phase 1: Vercel Analytics設定

### 1.1 Vercel Analytics有効化（5分）

#### 📍 手順:
1. **Vercelダッシュボード** → プロジェクト選択
2. **Analytics** タブをクリック
3. **Enable Analytics** をクリック
4. プラン選択（Pro推奨: $20/月）

#### 🎛️ 利用可能な機能
```javascript
// 自動収集データ
- Page Views（ページビュー）
- Unique Visitors（ユニークビジター）
- Top Pages（人気ページ）
- Top Referrers（流入元）
- Devices & Browsers（デバイス・ブラウザ）
- Real-time data（リアルタイムデータ）
```

### 1.2 Vercel Speed Insights設定

#### 🏃‍♂️ Core Web Vitals追跡
```typescript
// src/app/layout.tsx に追加
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

#### 📦 依存関係追加
```bash
npm install @vercel/speed-insights
```

## 🔍 Phase 2: Google Analytics 4設定

### 2.1 GA4アカウント作成（10分）

#### 📍 手順:
1. [Google Analytics](https://analytics.google.com/) にアクセス
2. **測定開始** をクリック
3. **アカウント作成**:
   ```
   アカウント名: アイアンショップ Analytics
   国/地域: 日本
   ```
4. **プロパティ作成**:
   ```
   プロパティ名: アイアンショップ
   タイムゾーン: 日本標準時
   通貨: 日本円（JPY）
   ```
5. **ビジネス情報**:
   ```
   業種: 製造業
   ビジネス規模: 小規模
   利用目的: ウェブサイトの改善
   ```

### 2.2 GA4追跡コード設定

#### 🔧 Next.jsアプリへの実装

**1. Google Tag Manager設置:**
```typescript
// src/components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => (
  <>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
    />
    <Script strategy="lazyOnload" id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ga_id}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `}
    </Script>
  </>
)

export default GoogleAnalytics
```

**2. レイアウトに追加:**
```typescript
// src/app/layout.tsx
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  )
}
```

**3. 環境変数設定:**
```bash
# .env.local & Vercel
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2.3 イベント追跡設定

#### 🎯 カスタムイベント実装

**お問い合わせフォーム送信:**
```typescript
// src/components/Contact.tsx
import { gtag } from '@/lib/gtag'

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  // フォーム送信処理...
  
  // GA4イベント送信
  gtag('event', 'contact_form_submit', {
    event_category: 'engagement',
    event_label: 'footer_contact_form',
    value: 1,
  })
}
```

**電話番号クリック追跡:**
```typescript
// src/components/Footer.tsx
const handlePhoneClick = () => {
  gtag('event', 'phone_click', {
    event_category: 'engagement',
    event_label: 'footer_phone',
    value: 1,
  })
}

<a 
  href="tel:03-0000-0000" 
  onClick={handlePhoneClick}
>
  TEL: 03-0000-0000
</a>
```

**商品詳細表示:**
```typescript
// src/components/Products.tsx
const handleProductView = (productName: string) => {
  gtag('event', 'view_item', {
    event_category: 'ecommerce',
    event_label: productName,
    item_id: productName,
    item_name: productName,
    item_category: 'iron_products',
  })
}
```

## 🕷️ Phase 3: Google Search Console設定

### 3.1 Search Console登録（5分）

#### 📍 手順:
1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. **プロパティを追加** をクリック
3. **ドメイン** または **URLプレフィックス** 選択
4. サイトURL入力: `https://your-domain.com`
5. **所有権確認**:
   - HTMLファイルアップロード
   - DNS TXTレコード
   - Google Analytics連携（推奨）

### 3.2 サイトマップ送信

#### 🗺️ Next.js サイトマップ生成
```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/#products',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://your-domain.com/#gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://your-domain.com/#about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://your-domain.com/#contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}
```

#### 📤 サイトマップ送信手順:
1. Search Console → **サイトマップ**
2. 新しいサイトマップの追加: `sitemap.xml`
3. **送信** をクリック

### 3.3 構造化データ設定

#### 🏗️ JSON-LD構造化データ
```typescript
// src/components/StructuredData.tsx
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "アイアンショップ",
    "description": "職人の技が光る、こだわりのアイアン製品をお届けします",
    "url": "https://your-domain.com",
    "telephone": "03-0000-0000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "○○1-1-1",
      "addressLocality": "東京都○○区",
      "postalCode": "000-0000",
      "addressCountry": "JP"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://github.com/yannsunn/Aian"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default StructuredData
```

## 🔧 Phase 4: 高度なAnalytics設定

### 4.1 カスタムダッシュボード作成

#### 📊 Google Analytics 4ダッシュボード
```javascript
// 追跡したいKPI設定
重要指標:
1. セッション数（月次/週次）
2. 新規ユーザー率
3. 平均セッション時間
4. 直帰率
5. コンバージョン率（お問い合わせ）
6. 人気ページランキング
7. 流入経路別分析
8. デバイス別利用状況
```

### 4.2 自動レポート設定

#### 📧 定期レポート設定
1. **Google Analytics** → **ライブラリ**
2. **カスタムレポート** 作成
3. **Insights** → **自動化**
4. 週次/月次レポートをメール送信設定

### 4.3 コンバージョン目標設定

#### 🎯 目標設定例
```javascript
// GA4 コンバージョンイベント
1. contact_form_submit（お問い合わせ送信）
2. phone_click（電話番号クリック）
3. product_view（商品詳細表示）
4. scroll_90（90%スクロール到達）
5. session_start（セッション開始）
```

## 🔍 データ分析と活用

### 5.1 重要メトリクスの解釈

#### 📈 パフォーマンス指標
```
良好な指標:
- 直帰率: 40%以下
- 平均セッション時間: 2分以上
- ページ表示速度: 2秒以下
- コンバージョン率: 2%以上
```

### 5.2 改善アクション例

#### 🎯 データドリブンな改善策
```javascript
// データに基づく改善案
人気ページ分析 → より魅力的なコンテンツ作成
離脱率の高いページ → UI/UX改善
流入経路分析 → マーケティング戦略調整
デバイス分析 → レスポンシブ最適化
```

## 📊 設定完了チェックリスト

### ✅ 必須確認項目
- [ ] Vercel Analytics有効化
- [ ] Google Analytics 4設定完了
- [ ] Search Console登録・サイトマップ送信
- [ ] 基本イベント追跡設定
- [ ] リアルタイムデータ収集確認

### ✅ 推奨確認項目
- [ ] カスタムイベント追跡設定
- [ ] 構造化データ実装
- [ ] コンバージョン目標設定
- [ ] 定期レポート設定
- [ ] データ収集テスト完了

## 🚨 プライバシー対応

### GDPR/CCPA対応

#### 🔒 Cookie同意バナー実装
```typescript
// src/components/CookieConsent.tsx
'use client'

import { useState, useEffect } from 'react'

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    // GA4初期化
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          このサイトではCookieを使用してユーザー体験を向上させています。
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          同意する
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
```

## 🔄 次のステップ

Analytics設定完了後:
1. **1週間後**: 初期データ確認・分析
2. **1ヶ月後**: 詳細レポート作成・改善策検討
3. **継続的**: A/Bテスト・最適化実施

---

**⏱️ 推定所要時間: 60-90分**
**🎯 完了後の効果: データドリブンなサイト運営**