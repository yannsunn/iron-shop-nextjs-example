# Vercel デプロイメント設定

## 🚀 クイックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyannsunn%2FAian&project-name=iron-shop-nextjs&root-directory=iron-shop-nextjs)

## 📋 デプロイ前チェックリスト

### ✅ 必須設定

- [ ] Repository: `yannsunn/Aian`
- [ ] Root Directory: `iron-shop-nextjs`
- [ ] Framework: Next.js
- [ ] Node.js Version: 18.x

### ✅ ビルド設定

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### ✅ 環境変数

#### 公開変数（NEXT_PUBLIC_）
```bash
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_SITE_NAME=アイアンショップ
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
```

#### 秘密変数（サーバーサイド）
```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
NOTION_API_TOKEN=ntn_xxx
VERCEL_ACCESS_TOKEN=xxx
```

## 🔧 詳細設定

### Vercel.json 設定内容

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["nrt1"],
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection", 
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### 自動最適化機能

- ✅ **Image Optimization**: WebP/AVIF自動変換
- ✅ **Code Splitting**: 動的インポート
- ✅ **Edge Functions**: グローバルCDN
- ✅ **Analytics**: パフォーマンス監視

## 📊 パフォーマンス目標

| メトリック | 目標値 | 現在値 |
|------------|--------|--------|
| First Contentful Paint | < 1.5s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| First Input Delay | < 100ms | ✅ |

## 🔍 デバッグとモニタリング

### Vercel ダッシュボード

1. **Functions**: サーバーレス関数の実行ログ
2. **Analytics**: ページビューとパフォーマンス
3. **Speed Insights**: Core Web Vitals
4. **Deployments**: デプロイ履歴とログ

### ローカルデバッグ

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルドテスト
npm run build
npm run start

# 型チェック
npm run lint
```

## 🚨 トラブルシューティング

### よくあるエラー

#### 1. ビルドエラー
```bash
Error: Module not found
```
**解決**: `npm install` を実行

#### 2. 画像読み込みエラー
```bash
Error: Invalid src prop
```
**解決**: `public/images/` パスを確認

#### 3. 環境変数エラー
```bash
ReferenceError: process is not defined
```
**解決**: `NEXT_PUBLIC_` プレフィックス追加

### サポートリソース

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Issues](https://github.com/yannsunn/Aian/issues)

---

**Ready to deploy? Let's go! 🚀**