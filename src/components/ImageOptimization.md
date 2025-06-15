# 🎨 画像最適化ガイド - 高級アイアン家具サイト

## 現在の画像ファイル
- `/public/images/iron1.jpg` - シェルフ画像
- `/public/images/iron2.jpg` - テーブル画像
- `/public/images/iron3.jpg` - パーテーション画像
- `/public/images/hero.jpg` - ヒーロー背景画像

## 推奨される画像撮影・準備方法

### 1. **シェルフ画像 (iron1.jpg)**
- **撮影内容**: モダンな黒いスチールシェルフ
- **アングル**: 斜め45度から全体が見える構図
- **背景**: 白または薄いグレーの壁
- **照明**: 自然光で金属の質感を強調
- **推奨サイズ**: 1200x800px以上

### 2. **テーブル画像 (iron2.jpg)**
- **撮影内容**: オーク材天板×ブラックアイアン脚のテーブル
- **アングル**: やや上から見下ろす角度
- **背景**: モダンなダイニング空間
- **照明**: 温かみのある照明で木材の質感を表現
- **推奨サイズ**: 1200x800px以上

### 3. **パーテーション画像 (iron3.jpg)**
- **撮影内容**: ジオメトリックデザインのアイアンパーテーション
- **アングル**: 正面から芸術性が分かる構図
- **背景**: ミニマルな空間
- **照明**: 影のパターンが美しく出る照明
- **推奨サイズ**: 1200x800px以上

### 4. **ヒーロー画像 (hero.jpg)**
- **撮影内容**: アイアン家具で統一された高級リビング空間
- **アングル**: 広角で空間全体を撮影
- **背景**: 実際の高級住宅やショールーム
- **照明**: 夕方の自然光または高品質な室内照明
- **推奨サイズ**: 1920x1080px以上

## 画像最適化手順

```bash
# 画像圧縮コマンド例（ImageMagickを使用）
convert original.jpg -quality 85 -resize 1200x800 optimized.jpg

# WebP形式への変換（さらに軽量化）
cwebp -q 85 original.jpg -o optimized.webp
```

## 無料の高品質画像リソース

1. **Unsplash** (https://unsplash.com)
   - 検索キーワード: "modern steel furniture", "black metal shelf", "industrial table"

2. **Pexels** (https://pexels.com)
   - 検索キーワード: "luxury furniture", "minimalist interior", "iron furniture"

3. **Pixabay** (https://pixabay.com)
   - 検索キーワード: "modern furniture", "steel design", "contemporary interior"

## 実装方法

画像を差し替える場合は、以下のファイルを更新：
- `/public/images/` ディレクトリに新しい画像を配置
- 同じファイル名で上書き保存
- ブラウザキャッシュをクリアして確認

## モバイル最適化のポイント

- 画像の遅延読み込み（lazy loading）は実装済み
- レスポンシブ画像サイズは自動調整
- WebP形式対応でさらなる軽量化可能