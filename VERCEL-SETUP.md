# Vercelデプロイメント設定手順

## 1. Vercelアカウントの準備

1. [Vercel](https://vercel.com)にログイン
2. 「New Project」をクリック

## 2. GitHubリポジトリの接続

1. 「Import Git Repository」を選択
2. GitHubアカウントを連携（まだの場合）
3. `iron-shop-nextjs-example`リポジトリを選択

## 3. プロジェクト設定

### 基本設定
- **Project Name:** `iron-shop-nextjs-example`
- **Framework Preset:** Next.js（自動検出される）
- **Root Directory:** `.`（ルート）

### ビルド設定
- **Build Command:** `npm run build`（デフォルト）
- **Output Directory:** `.next`（デフォルト）
- **Install Command:** `npm install`（デフォルト）

### 環境変数の設定
以下の環境変数を設定：

```
NEXT_PUBLIC_SITE_URL=https://iron-shop-nextjs-example.vercel.app
NEXT_PUBLIC_SITE_NAME=Vintage Iron Works Example
NEXT_PUBLIC_CONTACT_EMAIL=info@example-ironshop.com
NEXT_PUBLIC_CONTACT_PHONE=03-1234-5678
NEXT_PUBLIC_IS_EXAMPLE_SITE=true
```

## 4. デプロイ実行

「Deploy」ボタンをクリックしてデプロイを開始

## 5. カスタムドメイン設定（オプション）

### Vercelダッシュボードで設定
1. Settings > Domains
2. 「Add」をクリック
3. カスタムドメインを入力：
   - `iron-shop-example.yourdomain.com`
   - または `portfolio.yourdomain.com`

### DNS設定
ドメインプロバイダーで以下を設定：

```
Type: CNAME
Name: iron-shop-example（またはsubdomain）
Value: cname.vercel-dns.com
```

## 6. デプロイ後の確認

### パフォーマンステスト
- Lighthouse実行
- Core Web Vitalsの確認

### 機能テスト
- [ ] レスポンシブデザインの確認
- [ ] フォーム送信のテスト
- [ ] アニメーションの動作確認
- [ ] SEOメタデータの確認

## 7. プロダクション設定

### セキュリティヘッダー
vercel.jsonで設定済み：
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- X-XSS-Protection

### リージョン設定
東京リージョン（hnd1）に設定済み

---

## トラブルシューティング

### ビルドエラーの場合
1. ローカルで`npm run build`を実行して確認
2. Node.jsバージョンを確認（18.17.0以上）
3. 環境変数が正しく設定されているか確認

### 404エラーの場合
1. ルーティング設定を確認
2. next.config.mjsの設定を確認

---

**デプロイURL:** https://iron-shop-nextjs-example.vercel.app