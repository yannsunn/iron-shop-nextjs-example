'use client'

import React from 'react'

// 高品質アイアン家具画像のプレースホルダーURLリスト
// 実際の製品写真に差し替える際は、以下のような画像を用意してください：
// 1. モダンな黒いスチールシェルフ（ミニマルデザイン）
// 2. オーク材×ブラックアイアンのダイニングテーブル
// 3. ジオメトリックなアイアンパーテーション
// 4. ラグジュアリーなリビング空間（アイアン家具統一）

const PREMIUM_IRON_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", // モダンリビング
    alt: "高級モダンスチールシェルフ",
    title: "モダンスチールシェルフ",
    description: "精密加工されたブラックスチールフレーム"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80", // ダイニングテーブル
    alt: "プレミアムダイニングテーブル",
    title: "コンテンポラリーダイニングテーブル",
    description: "プレミアムオーク材×マットブラックスチール"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", // インテリア
    alt: "アーキテクチュラルパーテーション",
    title: "アーキテクチュラルパーテーション",
    description: "空間を芸術作品に変える精密なデザイン"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80", // ラグジュアリー空間
    alt: "ラグジュアリーリビング空間",
    title: "ラグジュアリーリビング空間",
    description: "ブラックアイアンで統一されたモダン空間"
  }
]

export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PREMIUM_IRON_IMAGES.map((image) => (
        <div key={image.id} className="relative group overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{image.title}</h3>
              <p className="text-sm text-gray-200">{image.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 実際の画像を使用する場合の推奨事項：
// 1. 画像サイズ: 1200x800px以上（高解像度）
// 2. 形式: WebP推奨（次点でJPEG）
// 3. 圧縮: 品質90%程度で最適化
// 4. 撮影角度: 商品全体が見える斜め45度が理想
// 5. 照明: 自然光または高品質な照明で影を最小限に
// 6. 背景: 白または薄いグレーの背景推奨