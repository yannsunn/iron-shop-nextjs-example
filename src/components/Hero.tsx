'use client'

import Image from 'next/image'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Button from '@/components/ui/Button'

const Hero = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    initialIsIntersecting: true 
  })
  
  // ニューロマーケティング：限定在庫カウントダウン
  const [stockCount, setStockCount] = useState(7)
  const [viewerCount, setViewerCount] = useState(23)
  
  useEffect(() => {
    // リアルタイム閲覧者数シミュレーション
    const interval = setInterval(() => {
      setViewerCount(prev => Math.max(15, prev + Math.floor(Math.random() * 7 - 3)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToGallery = useCallback(() => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])


  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen text-white overflow-hidden"
      style={{ paddingTop: '60px' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            filter: 'brightness(1.6) contrast(2.2) saturate(1.5) drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.2)',
            opacity: 0.7,
            zIndex: 5,
          }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        
        {/* 美しい背景パターン */}
        <div 
          className="absolute inset-0 w-full h-full transform scale-110 transition-transform duration-700"
          style={{ 
            background: `
              linear-gradient(45deg, #3a3a3a 25%, transparent 25%), 
              linear-gradient(-45deg, #3a3a3a 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #3a3a3a 75%), 
              linear-gradient(-45deg, transparent 75%, #3a3a3a 75%)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
            opacity: 0.6,
            zIndex: 1
          }}
        />
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(139, 69, 19, 0.4) 0%, rgba(20, 20, 20, 0.8) 100%)',
            filter: 'blur(1px)',
            zIndex: 2
          }}
        />
        
        {/* アイアンテクスチャ風の追加レイヤー */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: `
              linear-gradient(90deg, transparent 0%, rgba(160, 82, 45, 0.1) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(101, 67, 33, 0.1) 50%, transparent 100%)
            `,
            zIndex: 3
          }}
        />
      </div>


      {/* 軽量オーバーレイ */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
      </div>
      
      {/* Main content with enhanced animations */}
      <div className="relative z-20 text-center max-w-6xl px-6 mx-auto flex flex-col justify-center h-full">
        <div className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          

          {/* クリーンで高級感のあるヘッドライン */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-black/30 backdrop-blur-sm rounded border border-white/20">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-white font-medium text-sm tracking-wide">創業40年 - 職人の技術</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 tracking-tight text-white leading-tight">
            <span className="block mb-2 sm:mb-4 font-thin text-2xl sm:text-3xl md:text-5xl">最高品質の</span>
            <span className="block font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
              アイアン製品
            </span>
          </h1>

          {/* Psychological trigger: Social proof with neuroscience */}
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white/50" />
              ))}
            </div>
            <span className="text-sm text-white/90 font-medium">1,200+ 満足のお客様</span>
            <span className="text-amber-400">★★★★★</span>
          </div>

          {/* シンプルで洗練された価値提案 */}
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-gray-200 mb-4 sm:mb-8 px-4">
              40年の職人技が生み出す、一生モノの品質と美しさ
            </p>
            
            {/* 控えめな社会的証明 */}
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
                <span>1,200+ のお客様</span>
              </div>
              <div className="flex items-center gap-2">
                <span>★★★★★</span>
                <span>4.9/5.0</span>
              </div>
            </div>
          </div>

          {/* 洗練されたCTA */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToGallery}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 font-medium tracking-wide transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                作品を見る
              </Button>
              
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 text-sm sm:text-base"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                職人について
              </Button>
            </div>

            
            {/* 控えめな信頼性指標 */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400 px-4">
              <span>品質保証10年</span>
              <span className="hidden sm:inline">•</span>
              <span>全国配送対応</span>
              <span className="hidden sm:inline">•</span>
              <span>オーダーメイド可</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero