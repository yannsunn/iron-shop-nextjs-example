'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Button from './ui/Button'
import Card from './ui/Card'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface Product {
  id: number
  name: string
  description: string
  price: string
  originalPrice?: string
  features: string[]
  image: string
  badge?: string
  stockCount?: number
  soldCount?: number
}

const products: Product[] = [
  {
    id: 1,
    name: "エグゼクティブ アイアンシェルフ",
    description: "重厚感と繊細さを兼ね備えた最高級シェルフ",
    price: "¥298,000",
    originalPrice: "¥398,000",
    features: [
      "イタリア産高級鋼材使用",
      "職人による手作業仕上げ",
      "永久保証付き"
    ],
    image: "/images/iron1.jpg",
    badge: "LIMITED",
    stockCount: 3,
    soldCount: 47
  },
  {
    id: 2,
    name: "プレミアム ダイニングテーブル",
    description: "一生モノの贅沢な食卓を演出",
    price: "¥580,000",
    originalPrice: "¥680,000",
    features: [
      "天然無垢材×鍛造アイアン",
      "オーダーメイド対応",
      "10年品質保証"
    ],
    image: "/images/iron2.jpg",
    badge: "BEST SELLER",
    stockCount: 5,
    soldCount: 123
  },
  {
    id: 3,
    name: "アーティスト パーテーション",
    description: "空間を芸術作品に変える逸品",
    price: "¥368,000",
    features: [
      "著名デザイナー監修",
      "完全ハンドメイド",
      "世界に一つだけのデザイン"
    ],
    image: "/images/iron3.jpg",
    badge: "NEW",
    stockCount: 2,
    soldCount: 15
  }
]

const Products = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* セクションヘッダー */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-50 rounded-full">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span className="text-amber-700 font-semibold text-sm">厳選された逸品コレクション</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">匠の技が創る</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              プレミアムコレクション
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            40年の歴史が培った確かな技術力。世界に認められた職人が一つ一つ丁寧に仕上げる、
            <br />
            <span className="font-semibold text-gray-800">本物の価値</span>をお届けします。
          </p>
        </div>

        {/* 商品グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Card className="h-full overflow-hidden group relative">
                {/* 商品バッジ */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full",
                      product.badge === "LIMITED" && "bg-red-500 text-white",
                      product.badge === "BEST SELLER" && "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
                      product.badge === "NEW" && "bg-emerald-500 text-white"
                    )}>
                      {product.badge}
                    </div>
                  </div>
                )}

                {/* 在庫状況（ニューロマーケティング：希少性） */}
                {product.stockCount && product.stockCount <= 5 && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      残り{product.stockCount}点
                    </div>
                  </div>
                )}

                {/* 商品画像 */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredProduct === product.id && "scale-110"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* 商品情報 */}
                <div className="p-6 space-y-4">
                  {/* 販売実績（社会的証明） */}
                  {product.soldCount && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                      <span>{product.soldCount}名のお客様がご購入</span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600">
                    {product.description}
                  </p>

                  {/* 特徴リスト */}
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 価格（心理的価格設定） */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-end justify-between">
                      <div>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-gray-800">
                          {product.price}
                        </p>
                      </div>
                      {product.originalPrice && (
                        <div className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                          {Math.round(((parseInt(product.originalPrice.replace(/[^0-9]/g, '')) - parseInt(product.price.replace(/[^0-9]/g, ''))) / parseInt(product.originalPrice.replace(/[^0-9]/g, ''))) * 100)}% OFF
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA ボタン */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="primary"
                      size="md"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      詳細を見る
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="border-amber-600 text-amber-600 hover:bg-amber-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* 限定オファー（ニューロマーケティング：行動促進） */}
        <div className={cn(
          "mt-16 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              🎁 本日限定特典
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              今すぐご注文いただいたお客様に限り、
              <span className="font-bold text-amber-600">配送料無料 + 10年保証</span>
              をお付けいたします
            </p>
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8"
              >
                特典を受け取る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products