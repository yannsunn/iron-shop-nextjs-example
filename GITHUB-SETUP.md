# GitHub新規リポジトリ作成手順

## 1. GitHubで新しいリポジトリを作成

1. GitHubにログイン
2. 右上の「+」アイコンから「New repository」を選択
3. 以下の設定で作成：
   - **Repository name:** `iron-shop-nextjs-example`
   - **Description:** `ポートフォリオ展示用 - 高品質なアイアン製品を扱う架空企業のウェブサイト (Next.js + TypeScript)`
   - **Public** を選択
   - **Initialize this repository** のチェックは外す（既存のコードがあるため）

## 2. ローカルリポジトリの設定

```bash
# 新しいリモートを追加（origin-exampleという名前で）
git remote add origin-example https://github.com/YOUR_USERNAME/iron-shop-nextjs-example.git

# 現在のブランチ（portfolio-example）を新しいリポジトリにプッシュ
git push -u origin-example portfolio-example:main
```

## 3. デフォルトブランチの設定

GitHubの設定で、デフォルトブランチを`main`に設定

## 4. リポジトリの設定

### About設定
- **Website:** `https://iron-shop-nextjs-example.vercel.app`
- **Topics:** `nextjs`, `typescript`, `tailwindcss`, `portfolio`, `react`, `vercel`

### Social Preview
適切なOGP画像を設定

## 5. GitHub Pagesの無効化

Settings > Pages で「None」を選択（Vercelを使用するため）

## 6. セキュリティ設定

- Dependabot alertsを有効化
- Security policyを追加（必要に応じて）

---

**注意:** YOUR_USERNAMEは実際のGitHubユーザー名に置き換えてください。