# アイアンショップ - Next.js版

このプロジェクトは、アイアン製品を販売するためのモダンなウェブサイトです。Next.js、React、TypeScript、Tailwind CSSを使用して構築されています。

## ✨ 機能

- 📱 **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- 🎨 **モダンUI** - Tailwind CSSによる美しいデザイン
- ⚡ **高速表示** - Next.js Image最適化とSSG対応
- 🔍 **SEO最適化** - メタデータとOGタグの設定
- 📝 **TypeScript** - 型安全性とコード品質の向上
- 🌟 **アニメーション** - スムーズなトランジション効果
- 📧 **お問い合わせフォーム** - バリデーション機能付き

## 🚀 技術スタック

- **フレームワーク**: Next.js 15.3.3
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI**: React 18
- **デプロイ**: Vercel
- **画像最適化**: Next.js Image

## 📁 プロジェクト構造

```
iron-shop-nextjs/
├── src/
│   ├── app/                 # App Router
│   │   ├── globals.css     # グローバルスタイル
│   │   ├── layout.tsx      # ルートレイアウト
│   │   └── page.tsx        # ホームページ
│   └── components/         # Reactコンポーネント
│       ├── Header.tsx      # ヘッダーナビゲーション
│       ├── Hero.tsx        # ヒーローセクション
│       ├── Products.tsx    # 商品一覧
│       ├── Gallery.tsx     # ギャラリー
│       ├── About.tsx       # 会社概要
│       ├── Contact.tsx     # お問い合わせフォーム
│       └── Footer.tsx      # フッター
├── public/
│   └── images/             # 画像ファイル
├── next.config.js          # Next.js設定
├── tailwind.config.js      # Tailwind CSS設定
├── tsconfig.json          # TypeScript設定
└── vercel.json            # Vercel設定
```

## 🛠️ 開発環境のセットアップ

### 前提条件

- Node.js 18.0以上
- npm または yarn

### インストール

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd iron-shop-nextjs
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.localを編集して必要な環境変数を設定
   ```

### 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが利用できます。

## 🎯 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLintによるコード検証

## 🌐 Vercelデプロイメント

### 自動デプロイ

1. **GitHubリポジトリの作成**
2. **Vercelアカウントの作成/ログイン**
3. **プロジェクトのインポート**
4. **環境変数の設定**（Vercelダッシュボード）
5. **デプロイ実行**

### 手動デプロイ

```bash
# Vercel CLIのインストール
npm i -g vercel

# ログイン
vercel login

# デプロイ
vercel --prod
```

## 🔧 カスタマイズ

### 商品の追加・編集

`src/components/Products.tsx`の`products`配列を編集してください。

### スタイルの変更

- `tailwind.config.js`: カラーパレットやフォントの設定
- `src/app/globals.css`: カスタムスタイルの追加

### 画像の変更

`public/images/`フォルダ内の画像ファイルを置き換えてください。

## 📱 レスポンシブブレークポイント

- **sm**: 640px以上（タブレット）
- **md**: 768px以上（小型デスクトップ）
- **lg**: 1024px以上（大型デスクトップ）
- **xl**: 1280px以上（超大型画面）

## 🔒 セキュリティ

- CSPヘッダーの設定済み
- XSS保護の有効化
- CSRF保護の実装
- 環境変数による機密情報の管理

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesまでお気軽にお問い合わせください。

## 📄 ライセンス

このプロジェクトはISCライセンスの下で公開されています。

---

**開発チーム**: アイアンショップ  
**最終更新**: 2024年6月