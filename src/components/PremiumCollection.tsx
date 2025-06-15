'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Button from './ui/Button'
import Card from './ui/Card'
import ImageSlider from './ui/ImageSlider'

interface CollectionItem {
  id: number
  name: string
  description: string
  category: string
  images: string[]
  features: string[]
  price?: string
  badge?: string
}

// プレミアムコレクション - 空の配列として開始
const premiumItems: CollectionItem[] = [
  // 新しいアイテムをここに追加予定
]

const PremiumCollection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section id="premium" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* セクションヘッダー */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-100 rounded">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-amber-700 font-medium text-sm">プレミアム</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="font-thin text-gray-800">プレミアム</span>
            <span className="block mt-2 font-bold text-gray-900">
              コレクション
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            最高品質の素材と職人技で生み出される、特別なアイアン製品コレクション。<br />
            一点一点が芸術作品として仕上げられています。
          </p>
        </div>

        {/* 商品が追加されるまでの準備完了メッセージ */}
        {premiumItems.length === 0 ? (
          <div className={cn(
            "text-center py-20 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="max-w-lg mx-auto">
              <div className="mb-8">
                <svg className="w-20 h-20 mx-auto text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M12 6.5l-7 3v7c0 3.78 2.58 6.75 7 7.5 4.42-.75 7-3.72 7-7.5v-7l-7-3z" fill="rgba(251, 191, 36, 0.3)"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                プレミアムコレクション準備中
              </h3>
              
              <p className="text-gray-600 mb-8">
                最高品質のアイアン製品を厳選中です。<br />
                まもなく素晴らしい作品をご紹介いたします。
              </p>
              
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>最高級素材の厳選</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>職人による手作業仕上げ</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>限定数量での提供</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 商品グリッド - 商品が追加された時に表示 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {premiumItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Card className="h-full overflow-hidden group relative">
                  {/* カテゴリーバッジ */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1 text-xs font-medium rounded bg-amber-600/90 backdrop-blur-sm text-white">
                      {item.category}
                    </div>
                  </div>
                  
                  {/* プレミアムバッジ */}
                  {item.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1 text-xs font-medium rounded bg-amber-400/90 backdrop-blur-sm text-gray-900 flex items-center gap-1">
                        <span>⭐</span>
                        <span>{item.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* 商品画像 */}
                  <div className="relative h-80 overflow-hidden">
                    <ImageSlider 
                      images={item.images}
                      alt={item.name}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        hoveredItem === item.id && "scale-110"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* 商品情報 */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600">
                      {item.description}
                    </p>

                    {/* 特徴リスト */}
                    <ul className="space-y-2 mb-4">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* 価格表示 */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-800 mb-1">
                          {item.price || "プレミアム価格"}
                        </p>
                        <p className="text-sm text-gray-600">
                          詳細はお問い合わせください
                        </p>
                      </div>
                    </div>

                    {/* お問い合わせボタン */}
                    <div className="pt-4">
                      <Button
                        variant="premium"
                        size="md"
                        className="w-full"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        プレミアム相談
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* コレクション説明セクション */}
        <div className={cn(
          "mt-16 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              プレミアムコレクションについて
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              厳選された最高級素材と、熟練職人の技術が生み出す<br />
              唯一無二のアイアン製品コレクションです。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">限</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">限定製作</div>
                <div className="text-gray-600 text-sm">数量限定での特別製作</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">匠</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">職人技術</div>
                <div className="text-gray-600 text-sm">熟練職人による手作業</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">極</span>
                </div>
                <div className="font-bold text-gray-800 mb-2">最高品質</div>
                <div className="text-gray-600 text-sm">厳選された高級素材使用</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="premium"
                size="lg"
                className="px-10 py-4 text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                プレミアムコレクション相談
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiumCollection