'use client'

import Image from 'next/image'
import React, { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  alt: string
  category: 'furniture' | 'decoration' | 'architecture' | 'custom'
  featured?: boolean
}

interface GalleryItemProps {
  item: GalleryItem
  index: number
  isVisible: boolean
  onHover: (id: string | null) => void
  hoveredItem: string | null
}

const galleryItems: GalleryItem[] = [
  {
    id: 'gallery1',
    title: 'プレミアムスチールラック',
    description: 'アイリス大山風の高品質クロームメッキ仕上げ・5段調整可能ワイヤーシェルフ',
    image: '/images/iron1.jpg',
    alt: 'プレミアムスチールラック - クロームメッキ仕上げ',
    category: 'furniture',
    featured: true,
  },
  {
    id: 'gallery2',
    title: 'DOD風テキーラファイヤーテーブル',
    description: '3mm厚アイアンプレート・焚き火対応テーブル・アウトドア＆キャンプ用',
    image: '/images/iron2.jpg',
    alt: 'テキーラファイヤーテーブル - 焚き火対応アイアンテーブル',
    category: 'custom',
  },
  {
    id: 'gallery3',
    title: 'すけもえファイヤー焚き火台',
    description: 'DOD風二次燃焼システム・コンパクト収納・グリル機能付き焚き火台',
    image: '/images/iron3.jpg',
    alt: 'すけもえファイヤー焚き火台 - 二次燃焼システム',
    category: 'custom',
    featured: true,
  },
  {
    id: 'gallery4',
    title: 'プロフェッショナル工房',
    description: '本格アイアン工房・鍛冶炉・金床・職人工具一式・オーダーメイド製作環境',
    image: '/images/hero.jpg',
    alt: 'プロフェッショナルアイアン工房 - 鍛冶製作環境',
    category: 'architecture',
  },
]

// Memoized Gallery Item Component
const GalleryItem = React.memo<GalleryItemProps>(({ 
  item, 
  index, 
  isVisible, 
  onHover, 
  hoveredItem 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const isHovered = hoveredItem === item.id

  const handleMouseEnter = useCallback(() => {
    onHover(item.id)
  }, [item.id, onHover])

  const handleMouseLeave = useCallback(() => {
    onHover(null)
  }, [onHover])

  return (
    <Card
      variant="premium"
      className={cn(
        'group relative transition-all duration-700 cursor-pointer',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        item.featured && 'ring-2 ring-blue-500/20',
      )}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        animationDelay: `${index * 150}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced glow effect */}
      <div 
        className={cn(
          'absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl',
          'bg-blue-500/20'
        )} 
      />
      
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* SVG画像用の直接表示（Next.js Imageの互換性問題回避） */}
        <img
          src={item.image}
          alt={item.alt}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            'group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Neuro-optimized category badge with trust signals */}
        <div className={cn(
          'absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full transition-all duration-500',
          'bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-md border border-white/40 text-white shadow-lg',
          'opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
        )}>
          <span className="flex items-center gap-1">
            {item.category === 'furniture' && '✨ 家具'}
            {item.category === 'decoration' && '🎨 装飾'}
            {item.category === 'architecture' && '🏗️ 建築'}
            {item.category === 'custom' && '⚓ カスタム'}
          </span>
        </div>

        {/* Neuro-optimized featured badge with pulsing attention grabber */}
        {item.featured && (
          <div className="absolute top-4 right-4">
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-md animate-pulse" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Neuro-enhanced content area with psychological triggers */}
      <div className="relative p-8 bg-white/95 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Trust indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-500">(98% 満足度)</span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-3">
            {item.description}
          </p>
          
          {/* Clean call to action */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
            <span className="text-sm text-slate-500 font-medium">
              オーダーメイド制作
            </span>
            <span className="text-xs text-slate-400">詳細を見る →</span>
          </div>
        </div>
      </div>
    </Card>
  )
})

// Main Gallery Component with Performance Optimizations
const Gallery = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true })

  // Memoized handlers for performance
  const handleItemHover = useCallback((id: string | null) => {
    setHoveredItem(id)
  }, [])

  const scrollToContact = useCallback(() => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])


  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="relative pt-32 pb-32 overflow-hidden bg-slate-50"
    >

      <div className="container-custom relative z-10">
        <div className={cn(
          'text-center mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">プレミアムコレクション</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            <span className="font-thin">作品</span>
            <span className="font-bold ml-2">ギャラリー</span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            長年の経験と精密な技術が生み出す、唯一無二のアイアン作品。
            <br />
            お客様の空間に合わせたオーダーメイドの美しさをご覧ください。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={index}
              isVisible={isVisible}
              onHover={handleItemHover}
              hoveredItem={hoveredItem}
            />
          ))}
        </div>
        
        {/* Enhanced CTA section */}
        <div className="text-center mt-20">
          <div className="max-w-3xl mx-auto">
            <Card variant="premium" className="p-12">
              <div className="absolute inset-0 bg-blue-50 rounded-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  あなただけの特別な作品を
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  すべてオーダーメイドで製作いたします。<br />
                  ご希望のデザインやサイズをお聞かせください。
                </p>
                
                <Button
                  variant="premium"
                  size="lg"
                  rounded="xl"
                  onClick={scrollToContact}
                  className="text-lg"
                >
                  オーダー相談・お問い合わせ
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

Gallery.displayName = 'Gallery'

export default Gallery