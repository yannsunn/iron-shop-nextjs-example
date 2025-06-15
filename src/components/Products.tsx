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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">コレクション</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="font-thin text-gray-800">匠の技が創る</span>
            <span className="block mt-2 font-bold text-gray-900">
              プレミアムコレクション
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            40年の歴史が培った確かな技術力で、一つ一つ丁寧に仕上げる本物の価値をお届けします。
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
                {/* シンプルな商品バッジ */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className={cn(
                      "px-3 py-1 text-xs font-medium rounded bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200",
                    )}>
                      {product.badge === "LIMITED" && "限定"}
                      {product.badge === "BEST SELLER" && "人気"}
                      {product.badge === "NEW" && "新作"}
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

                  {/* シンプルなCTA ボタン */}
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      詳細を見る
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* シンプルなお問い合わせセクション */}
        <div className={cn(
          "mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-gray-800 mb-3">
              お問い合わせ
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              オーダーメイドのご相談や、作品に関するご質問など、お気軽にお声がけください。
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8"
              >
                お問い合わせ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products