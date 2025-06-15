# Vintage Iron Works Example

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

🔧 高品質なアイアン製品を扱うウェブサイト

## 🌟 デモサイト

[https://iron-shop-nextjs-example.vercel.app](https://iron-shop-nextjs-example.vercel.app)

## ⚠️ 重要な注意事項

**これはサンプルサイトです。**
- 会社情報、連絡先等は架空のものです

## 🚀 技術スタック

### フロントエンド
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** CSS Transitions & Transforms
- **State Management:** React Hooks

### パフォーマンス最適化
- Next.js Image Optimization
- Dynamic Imports & Code Splitting
- Server-Side Rendering (SSR)
- Core Web Vitals最適化

### SEO & アクセシビリティ
- 構造化データ (JSON-LD)
- メタタグ最適化
- WCAG 2.1準拠
- セマンティックHTML

## 📋 主な機能

- ✅ レスポンシブデザイン（モバイルファースト）
- ✅ スムーズなアニメーションとトランジション
- ✅ 動的な製品ギャラリー
- ✅ お問い合わせフォーム（バリデーション付き）
- ✅ パフォーマンス最適化
- ✅ セキュリティヘッダー設定
- ✅ アクセシビリティ対応

## 🛠️ セットアップ

### 必要な環境
- Node.js 18.17.0以上
- npm 9.0.0以上

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/iron-shop-nextjs-example.git

# ディレクトリへ移動
cd iron-shop-nextjs-example

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
```

### 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## 📝 利用可能なスクリプト

```bash
# 開発サーバー
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー
npm start

# TypeScript型チェック
npm run type-check

# ESLintチェック
npm run lint

# コードフォーマット
npm run format

# バンドル分析
npm run analyze
```

## 🏗️ プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # ページルート
│   ├── globals.css        # グローバルスタイル
│   └── layout.tsx         # ルートレイアウト
├── components/            # Reactコンポーネント
│   ├── ui/               # UIコンポーネント
│   └── ...               # 機能別コンポーネント
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティ
└── types/                # TypeScript型定義
```

## 🚀 デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にログイン
2. 新しいプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

### カスタムドメイン設定

```
CNAME: iron-shop-example.yourdomain.com -> cname.vercel-dns.com
```

## 📊 パフォーマンス指標

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.0s
- **Time to Interactive:** < 2.0s
- **Cumulative Layout Shift:** < 0.1

## 🔒 セキュリティ

- HTTPSの強制
- セキュリティヘッダーの実装
- XSS保護
- CSRF対策
- 入力値のバリデーション

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👨‍💻 作成者

- サンプルサイト

---

**注意:** これはサンプルサイトです。