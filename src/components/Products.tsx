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
  category: string
  features: string[]
  image: string
  customizable: string[]
  leadTime: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    name: "プレミアムスチールラック",  
    description: "アイリス大山風の高品質クロームメッキ仕上げ・5段調整可能ワイヤーシェルフ",
    category: "家具",
    features: [
      "クロームメッキ仕上げ",
      "5段調整可能",
      "高品質ワイヤーシェルフ"
    ],
    image: "/images/product1.jpg",
    customizable: ["サイズ", "段数", "メッキ仕上げ", "耐荷重"],
    leadTime: "3-4週間",
    badge: "98%満足度"
  },
  {
    id: 2,
    name: "テキーラファイヤーテーブル",
    description: "DOD風テキーラファイヤーテーブル・3mm厚アイアンプレート・焚き火対応テーブル・アウトドア＆キャンプ用",
    category: "カスタム",
    features: [
      "3mm厚アイアンプレート",
      "焚き火対応設計",
      "アウトドア専用"
    ],
    image: "/images/product2.jpg",
    customizable: ["サイズ", "プレート厚み", "脚部デザイン", "収納機能"],
    leadTime: "4-5週間",
    badge: "98%満足度"
  },
  {
    id: 3,
    name: "すけもえファイヤー焚き火台",
    description: "DOD風二次燃焼システム・コンパクト収納・グリル機能付き焚き火台",
    category: "カスタム", 
    features: [
      "二次燃焼システム",
      "コンパクト収納",
      "グリル機能付き"
    ],
    image: "/images/product3.jpg",
    customizable: ["燃焼システム", "収納サイズ", "グリル面積", "材質"],
    leadTime: "5-6週間",
    badge: "98%満足度"
  },
  {
    id: 4,
    name: "プロフェッショナル工房",
    description: "本格アイアン工房・鍛冶炉・金床・職人工具一式・オーダーメイド製作環境",
    category: "建築",
    features: [
      "本格鍛冶炉",
      "プロ仕様金床",
      "職人工具一式"
    ],
    image: "/images/product4.jpg", 
    customizable: ["工房レイアウト", "設備仕様", "工具セット", "安全装置"],
    leadTime: "8-12週間",
    badge: "98%満足度"
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
            <span className="font-thin text-gray-800">プレミアム</span>
            <span className="block mt-2 font-bold text-gray-900">
              コレクション
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            長年の経験と精密な技術が生み出す、唯一無二のアイアン作品。<br />
            お客様の空間に合わせたオーダーメイドの美しさをご覧ください。
          </p>
        </div>

        {/* 商品グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                {/* カテゴリーバッジ */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1 text-xs font-medium rounded bg-gray-900/80 backdrop-blur-sm text-white">
                    {product.category}
                  </div>
                </div>
                
                {/* 満足度バッジ */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 text-xs font-medium rounded bg-green-600/90 backdrop-blur-sm text-white flex items-center gap-1">
                      <span>✨</span>
                      <span>{product.badge}</span>
                    </div>
                  </div>
                )}


                {/* 商品画像 */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredProduct === product.id && "scale-110"
                    )}
                    priority={index < 3}
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

                  {/* 主要特徴 */}
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* カスタマイズ可能項目 */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">カスタマイズ可能</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.customizable.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 制作期間 */}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">制作期間：</span>{product.leadTime}
                  </div>

                  {/* オーダーメイド価格 */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 mb-1">
                        完全オーダーメイド
                      </p>
                      <p className="text-sm text-gray-600">
                        価格はお見積もりにて
                      </p>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="pt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="md"
                      className="flex-1"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      詳細を見る →
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      className="flex-1"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      オーダー相談
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* あなただけの特別な作品セクション */}
        <div className={cn(
          "mt-16 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              あなただけの特別な作品を
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              すべてオーダーメイドで製作いたします。<br />
              ご希望のデザインやサイズをお聞かせください。
            </p>
            
            {/* 制作プロセス */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">①</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">ご相談</div>
                <div className="text-gray-600 text-sm">お客様のご要望をお聞かせください</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">②</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">お見積もり</div>
                <div className="text-gray-600 text-sm">詳細な仕様と価格をご提案します</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">③</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">制作</div>
                <div className="text-gray-600 text-sm">職人が丁寧にお作りします</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                className="px-10 py-4 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                オーダー相談・お問い合わせ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products