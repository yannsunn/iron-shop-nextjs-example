# 🚀 Next.js版デプロイメントガイド

## Vercelへのデプロイ手順

### 1. GitHubリポジトリの準備

現在のリポジトリ構造：
```
yuus,._/
├── iron-shop-nextjs/     # Next.jsプロジェクト（新規）
├── index.html           # オリジナル版
├── styles.css          # オリジナル版
└── ...                 # その他のファイル
```

### 2. Vercelでのデプロイ設定

#### Step 1: Vercel ダッシュボードにアクセス
1. [vercel.com](https://vercel.com) にアクセス
2. GitHubアカウントでログイン

#### Step 2: プロジェクトのインポート
1. "Add New" → "Project" をクリック
2. GitHub リポジトリ `yannsunn/Aian` を選択
3. **重要**: Root Directory を `iron-shop-nextjs` に設定

#### Step 3: ビルド設定
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

#### Step 4: 環境変数設定
Vercelダッシュボードで以下を設定：

```bash
# 公開環境変数
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=アイアンショップ
NEXT_PUBLIC_CONTACT_EMAIL=info@iron-shop.example.com

# 秘密環境変数（必要に応じて）
GITHUB_PERSONAL_ACCESS_TOKEN=your_new_token
NOTION_API_TOKEN=your_new_token
VERCEL_ACCESS_TOKEN=your_new_token
```

### 3. 自動デプロイの確認

デプロイ完了後、以下を確認：
- ✅ レスポンシブデザインの動作
- ✅ 画像の最適化
- ✅ お問い合わせフォームの機能
- ✅ スムーズスクロール
- ✅ SEOメタデータ

### 4. カスタムドメインの設定（オプション）

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNSレコードを設定

### 5. パフォーマンス最適化

Next.jsによる自動最適化：
- 🚀 **Image Optimization**: 自動WebP/AVIF変換
- ⚡ **Code Splitting**: 必要なコードのみ読み込み
- 📱 **Responsive Images**: デバイス別最適化
- 🔍 **SEO**: 自動メタタグ生成

### 6. 本番環境での注意事項

#### セキュリティ
- 環境変数に機密情報を保存
- CSPヘッダーが自動設定済み
- XSS保護が有効

#### モニタリング
- Vercel Analytics（有料）で詳細分析
- Core Web Vitalsの監視
- エラーログの確認

## トラブルシューティング

### よくある問題

1. **ビルドエラー**
   ```bash
   npm run build
   # エラーメッセージを確認
   ```

2. **画像が表示されない**
   - `public/images/` フォルダに画像があることを確認
   - Next.js Imageコンポーネントのパスを確認

3. **環境変数が反映されない**
   - `NEXT_PUBLIC_` プレフィックスの確認
   - Vercelでの再デプロイ

### パフォーマンステスト

推奨ツール：
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

目標スコア：
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 更新手順

### 1. ローカル開発
```bash
cd iron-shop-nextjs
npm run dev
# http://localhost:3000 で確認
```

### 2. 本番反映
```bash
git add .
git commit -m "Update: 変更内容"
git push origin nextjs-version
# Vercelが自動デプロイ
```

## サポート

問題が発生した場合：
1. Vercelのデプロイログを確認
2. ブラウザの開発者ツールでエラーをチェック
3. GitHubのIssuesで報告

---

**🎉 Next.js版アイアンショップのデプロイ完了！**

モダンで高速なWebサイトをお楽しみください。