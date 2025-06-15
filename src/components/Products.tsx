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
    name: "インダストリアルブックシェルフ",
    description: "アイアンフレームと天然木を組み合わせた、機能性とデザイン性を兼ね備えたブックシェルフ",
    category: "収納家具",
    features: [
      "耐荷重80kg（棚板1枚あたり）",
      "5段調整可能",
      "アンティーク風仕上げ"
    ],
    image: "/images/product1.jpg",
    customizable: ["サイズ", "棚板枚数", "仕上げ色", "材質"],
    leadTime: "3-4週間",
    badge: "人気"
  },
  {
    id: 2,
    name: "モダンコーヒーテーブル",
    description: "ガラス天板とスチールベースの洗練されたデザイン。リビングの主役となるモダンテーブル",
    category: "テーブル",
    features: [
      "強化ガラス天板",
      "スタイリッシュなスチール脚",
      "安定性抜群の設計"
    ],
    image: "/images/product2.jpg",
    customizable: ["天板サイズ", "脚部デザイン", "ガラス種類", "高さ"],
    leadTime: "4-5週間"
  },
  {
    id: 3,
    name: "ヴィンテージバーカート",
    description: "真鍮装飾とワインラック付きの本格的なバーカート。パーティーシーンを格上げします",
    category: "カート・ワゴン",
    features: [
      "ワインボトル6本収納",
      "移動式キャスター付き",
      "真鍮装飾パーツ"
    ],
    image: "/images/product3.jpg",
    customizable: ["収納容量", "装飾デザイン", "キャスター", "仕上げ"],
    leadTime: "5-6週間",
    badge: "限定"
  },
  {
    id: 4,
    name: "ミニマルデスクランプ",
    description: "調整可能なアームとLED照明を搭載したシンプルで機能的なデスクランプ",
    category: "照明器具",
    features: [
      "無段階角度調整",
      "LED電球対応",
      "安定したベース設計"
    ],
    image: "/images/product4.jpg",
    customizable: ["アーム長", "ベースサイズ", "仕上げ色", "照明タイプ"],
    leadTime: "2-3週間"
  },
  {
    id: 5,
    name: "ハンドメイドウォールアート",
    description: "抽象幾何学デザインの壁掛けアート。空間に洗練されたアクセントを加えます",
    category: "装飾・アート",
    features: [
      "完全ハンドメイド",
      "抽象幾何学デザイン",
      "壁掛け金具付き"
    ],
    image: "/images/product5.jpg",
    customizable: ["サイズ", "デザインパターン", "色調", "フレーム"],
    leadTime: "6-8週間",
    badge: "アート"
  },
  {
    id: 6,
    name: "プレミアムキッチンスタンド",
    description: "大理石天板とステンレスフレームのプロ仕様キッチンスタンド。収納力と美しさを両立",
    category: "キッチン用品",
    features: [
      "天然大理石天板",
      "ステンレス製フレーム",
      "プロ仕様の収納設計"
    ],
    image: "/images/product6.jpg",
    customizable: ["天板材質", "サイズ", "収納オプション", "高さ調整"],
    leadTime: "4-6週間",
    badge: "プロ仕様"
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
            <span className="font-thin text-gray-800">オーダーメイド</span>
            <span className="block mt-2 font-bold text-gray-900">
              アイアン製品カタログ
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            すべて完全オーダーメイド制作。お客様のご要望に合わせて、世界に一つだけの作品をお作りします。
          </p>
        </div>

        {/* 商品グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                
                {/* 特別バッジ */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 text-xs font-medium rounded bg-blue-600/90 backdrop-blur-sm text-white">
                      {product.badge}
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

                  {/* お問い合わせボタン */}
                  <div className="pt-4">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      制作のご相談
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* オーダーメイドご案内セクション */}
        <div className={cn(
          "mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              オーダーメイド制作について
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              すべての作品は完全オーダーメイドです。サイズ、デザイン、仕上げなど、<br />
              お客様のご要望に合わせて一点ものをお作りします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">① ご相談</div>
                <div className="text-gray-600">お客様のご要望をお聞かせください</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">② お見積もり</div>
                <div className="text-gray-600">詳細な仕様と価格をご提案します</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">③ 制作</div>
                <div className="text-gray-600">職人が丁寧にお作りします</div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                className="px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                オーダーメイドのご相談
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products