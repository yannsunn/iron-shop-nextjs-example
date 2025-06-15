'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Button from './ui/Button'
import Card from './ui/Card'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import ImageSlider from './ui/ImageSlider'

interface Product {
  id: number
  name: string
  description: string
  category: string
  features: string[]
  images: string[]
  customizable: string[]
  leadTime: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    name: "アジャスタブルテーブル脚",  
    description: "高さ72-72.5cm調整可能・28mm太径パイプ使用・アジャスター機能付き・DIY家具製作に最適",
    category: "DIYパーツ",
    features: [
      "72-72.5cm高さ調整可能",
      "28mm太径パイプ使用",
      "安定したアジャスター機構"
    ],
    images: [
      "/images/products/steel-rack/419WeqfrCbL._AC_.jpg",
      "/images/products/steel-rack/51A6IU7ypNL._AC_.jpg", 
      "/images/products/steel-rack/51ID3dmkl-L._AC_SL1200_.jpg",
      "/images/products/steel-rack/51vl4pkF2WL._AC_.jpg"
    ],
    customizable: ["高さ範囲", "パイプ径", "アジャスター", "表面処理"],
    leadTime: "2-3週間",
    badge: "DIY推奨"
  },
  {
    id: 2,
    name: "アイアンフレーム・キューブテーブル脚",
    description: "幅40×奥行40×高さ70cm・スクエアデザイン・2脚セット・モダンなキューブ型構造",
    category: "テーブル脚",
    features: [
      "安定したキューブ構造",
      "2脚1セット",
      "モダンスクエアデザイン"
    ],
    images: [
      "/images/products/fire-table/51FVJ0CW-RL._AC_SL1200_.jpg",
      "/images/products/fire-table/61+wtcZUAzL._AC_SL1400_.jpg",
      "/images/products/fire-table/61bniUHZ3nL._AC_SL1376_.jpg",
      "/images/products/fire-table/71kkNPS7wmL._AC_SL1500_.jpg"
    ],
    customizable: ["サイズ", "高さ", "フレーム太さ", "表面仕上げ"],
    leadTime: "3-4週間",
    badge: "モダン"
  },
  {
    id: 3,
    name: "コンパクトアイアンテーブル脚",
    description: "サイズ67.7(H)×40(W)×50(D)cm・コンパクト設計・サイドテーブル・カフェテーブル用脚",
    category: "テーブル脚", 
    features: [
      "コンパクト67.7cm高",
      "40×50cmベース",
      "軽量アイアン構造"
    ],
    images: [
      "/images/products/fire-stand/41kOCXU0DGL._AC_.jpg",
      "/images/products/fire-stand/41EhvKcfG9L._AC_.jpg",
      "/images/products/fire-stand/51IWiJVAdbL._AC_.jpg",
      "/images/products/fire-stand/61HV3jgR3TL._AC_SL1500_.jpg"
    ],
    customizable: ["高さ", "ベースサイズ", "脚部形状", "重量バランス"],
    leadTime: "2-3週間",
    badge: "コンパクト"
  },
  {
    id: 4,
    name: "Xデザインテーブル脚",
    description: "高さ72cm・幅60cm・クロスデザインのX型アイアンテーブル脚・2脚セット・ダイニングテーブル用",
    category: "テーブル脚",
    features: [
      "スタイリッシュX型構造",
      "高い安定性",
      "ダイニングテーブル対応"
    ],
    images: [
      "/images/products/iron-bar/61Q3qNU5gXL._SL1500_.jpg",
      "/images/products/iron-bar/711lmZZhCcL._SL1500_.jpg",
      "/images/products/iron-bar/71E2M3htchL._SL1500_.jpg",
      "/images/products/iron-bar/81g22INtVAL._SL1500_.jpg"
    ], 
    customizable: ["高さ", "X角度", "脚幅", "表面処理"],
    leadTime: "3-4週間",
    badge: "人気"
  },
  {
    id: 5,
    name: "サイドテーブル・C型アイアンフレーム",
    description: "サイズ55(W)×35(D)×65(H)cm・耐荷重35kg・ソファサイド用コンパクトテーブル・ヴィンテージ木目天板",
    category: "サイドテーブル",
    features: [
      "C型アイアンフレーム",
      "ヴィンテージ風木目天板",
      "ソファサイドに最適"
    ],
    images: [
      "/images/products/product5/6184V0WnxsL._AC_SL1500_.jpg",
      "/images/products/product5/71Yj6gV1EKL._AC_SL1424_.jpg",
      "/images/products/product5/81RrtBNv5YL._AC_SL1500_.jpg",
      "/images/products/product5/81weWvsHdBL._AC_SL1290_.jpg"
    ],
    customizable: ["サイズ", "天板素材", "フレーム色", "高さ"],
    leadTime: "3-4週間",
    badge: "コンパクト"
  },
  {
    id: 6,
    name: "スクエアタイプ・2段シェルフ", 
    description: "サイズ50(W)×50(D)×50(H)cm・耐荷重100kg(上段)・50kg(下段)・ヴィンテージ木目シェルフ・防錆加工",
    category: "シェルフ",
    features: [
      "高耐荷重設計(100kg+50kg)",
      "ヴィンテージ木目2段棚", 
      "防錆・軽量設計"
    ],
    images: [
      "/images/products/product6/61gJNuKmNoL._AC_SL1500_.jpg",
      "/images/products/product6/61tVkgSjrqL._AC_SL1500_.jpg",
      "/images/products/product6/71L1vcnXXbL._AC_SL1500_.jpg",
      "/images/products/product6/71mQZDmHb7L._AC_SL1500_.jpg"
    ],
    customizable: ["サイズ", "段数", "木目柄", "フレーム色"],
    leadTime: "3-4週間",
    badge: "大容量"
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
            <span className="font-thin text-gray-800">製品</span>
            <span className="block mt-2 font-bold text-gray-900">
              ギャラリー
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            長年の経験と精密な技術が生み出す、唯一無二のアイアン作品。<br />
            オーダーメイドの美しさと実用性を兼ね備えた製品をご覧ください。
          </p>
        </div>

        {/* 商品グリッド - レスポンシブ最適化 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-8xl mx-auto">
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
                


                {/* 商品画像 - モバイル対応拡大 */}
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-t-lg">
                  <ImageSlider 
                    images={product.images}
                    alt={product.name}
                    className={cn(
                      "w-full h-full transition-transform duration-700 rounded-t-lg",
                      hoveredProduct === product.id && "scale-105"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* 商品情報 */}
                <div className="p-6 space-y-4">

                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      製品仕様
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

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
                  <div className="mb-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM5.05 13.536a1 1 0 001.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707z"/>
                        <path d="M9 12a3 3 0 116 0 3 3 0 01-6 0z"/>
                      </svg>
                      カスタマイズオプション
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.customizable.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs bg-white text-amber-700 rounded-full border border-amber-300 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 制作期間 */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
                    <div className="flex items-center gap-2 text-green-800">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">制作期間：{product.leadTime}</span>
                    </div>
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