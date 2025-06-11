# セキュリティガイドライン

## 環境変数の管理

### 本番環境での環境変数設定

本番環境では、Vercelの暗号化環境変数機能を使用してください：

1. Vercelダッシュボードにアクセス
2. プロジェクト設定 > Environment Variables
3. 以下の変数を設定：

```bash
# 必須設定
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=アイアンショップ
NEXTAUTH_SECRET=your-random-secret-string

# オプション設定
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GTM_ID=your-google-tag-manager-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
CONTACT_EMAIL=info@your-domain.com
```

### ローカル開発環境

1. `.env.example`をコピーして`.env.local`を作成
2. 必要な値を設定
3. **絶対に本番のトークンや秘密鍵をコミットしない**

### セキュリティチェックリスト

- [ ] 本番環境のトークンはVercel環境変数で管理
- [ ] `.env*`ファイルは`.gitignore`に含まれている
- [ ] `NEXTAUTH_SECRET`は強力なランダム文字列を使用
- [ ] 本番URLは実際のドメインに設定
- [ ] 不要なトークンや設定は削除

### 緊急時の対応

もしトークンが漏えいした場合：

1. 該当するサービス（GitHub、Notion、Vercel）で即座にトークンを無効化
2. 新しいトークンを生成
3. Vercel環境変数を更新
4. アプリケーションを再デプロイ

## 報告

セキュリティに関する問題を発見した場合は、GitHubのIssueで報告してください。