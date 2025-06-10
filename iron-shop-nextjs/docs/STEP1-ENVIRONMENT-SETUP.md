# 📋 ステップ1: Vercel環境変数設定

## 🎯 概要
環境変数の設定により、アプリケーションの動作を本番環境に最適化します。

## 📝 事前準備（5分）

### 1.1 必要なアカウントとトークンの確認

#### ✅ チェックリスト
- [ ] Vercelアカウント作成済み
- [ ] GitHubアカウント連携済み
- [ ] 新しいGitHubトークン生成済み（推奨）
- [ ] Notionトークン確認済み（使用する場合）

#### 🔐 新しいトークン生成（重要）
既存のトークンは公開されているため、新しく生成してください。

**GitHub Personal Access Token生成手順:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. "Generate new token" をクリック
4. スコープ選択:
   - `repo` (プライベートリポジトリアクセス)
   - `user` (ユーザー情報読み取り)
5. トークンをコピーして安全に保存

### 1.2 Vercelダッシュボードアクセス

#### 手順:
1. [vercel.com](https://vercel.com) にアクセス
2. GitHubアカウントでログイン
3. プロジェクト選択 or 新規インポート
4. Settings → Environment Variables へ移動

## 🔧 環境変数設定（段階別）

### Phase 1: 必須公開変数（優先度: 高）

```bash
# サイト基本情報
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_NAME=アイアンショップ
NEXT_PUBLIC_CONTACT_EMAIL=info@iron-shop.example.com

# 地域設定
NEXT_PUBLIC_LOCALE=ja
NEXT_PUBLIC_TIMEZONE=Asia/Tokyo
```

**設定手順:**
1. Environment Variables ページで "Add New"
2. Name: `NEXT_PUBLIC_SITE_URL`
3. Value: `https://your-project.vercel.app` (実際のURLに変更)
4. Environment: `Production`, `Preview`, `Development` すべて選択
5. "Save" をクリック

### Phase 2: セキュリティトークン（優先度: 高）

```bash
# MCP関連トークン（新規生成推奨）
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_新しいトークン
NOTION_API_TOKEN=ntn_新しいトークン（使用する場合）
VERCEL_ACCESS_TOKEN=新しいトークン（使用する場合）
```

**⚠️ 重要な注意事項:**
- これらは **絶対に** `NEXT_PUBLIC_` プレフィックスを付けない
- サーバーサイドでのみアクセス可能
- Environment は `Production` のみ選択

### Phase 3: アプリケーション設定（優先度: 中）

```bash
# フォーム設定
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-key

# 外部サービス
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key

# 機能フラグ
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=false
```

## 🔍 設定確認と検証

### 1. 環境変数一覧確認

Vercel CLI使用:
```bash
npm i -g vercel
vercel login
vercel env ls
```

### 2. ローカル環境での確認

`.env.local` ファイル作成:
```bash
# ローカル開発用（本番と同じ値を設定）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=アイアンショップ
NEXT_PUBLIC_CONTACT_EMAIL=info@iron-shop.example.com
```

### 3. デプロイ後の動作確認

```bash
# 開発環境でテスト
npm run dev

# 本番ビルドでテスト
npm run build
npm run start
```

## 🚨 トラブルシューティング

### よくある問題と解決法

#### 1. 環境変数が反映されない
**原因**: キャッシュまたは再デプロイが必要
**解決**: 
```bash
# Vercelで再デプロイ
vercel --prod --force
```

#### 2. クライアントサイドで undefined
**原因**: `NEXT_PUBLIC_` プレフィックス不足
**解決**: 公開したい変数に `NEXT_PUBLIC_` を追加

#### 3. セキュリティトークンが漏洩
**原因**: 誤って公開変数として設定
**解決**: 
1. 即座にトークンを無効化
2. 新しいトークンを生成
3. サーバーサイド専用として再設定

## 📊 設定完了チェックリスト

### ✅ 必須項目
- [ ] NEXT_PUBLIC_SITE_URL 設定完了
- [ ] NEXT_PUBLIC_SITE_NAME 設定完了
- [ ] GITHUB_PERSONAL_ACCESS_TOKEN 新規設定
- [ ] ローカル環境での動作確認完了
- [ ] Vercelデプロイ完了

### ✅ 推奨項目
- [ ] Google Analytics ID 設定
- [ ] お問い合わせフォーム連携
- [ ] reCAPTCHA設定
- [ ] 全環境での動作確認

## 🔄 次のステップ

環境変数設定完了後:
1. **Step 2**: カスタムドメイン設定
2. **Step 3**: Analytics設定
3. **Step 4**: パフォーマンス最適化

---

**⏱️ 推定所要時間: 15-30分**
**🎯 完了後の効果: 安全で設定可能なアプリケーション環境**