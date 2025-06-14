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
    const element = document.getElementById('gallery')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])


  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen text-white overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="アイアンショップ - 職人の技が光る高品質アイアン製品"
          fill
          className="object-cover transform scale-110 transition-transform duration-700"
          style={{ 
            filter: 'brightness(0.2) contrast(1.3) saturate(0.8) blur(0.5px)',
            transform: 'scale(1.1)'
          }}
          priority
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>


      {/* プレミアムグラデーションオーバーレイ */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent" />
      </div>
      
      {/* Main content with enhanced animations */}
      <div className="relative z-10 text-center max-w-6xl px-6 mx-auto flex flex-col justify-center h-full">
        <div className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          

          {/* ニューロデザイン：プレミアム感を演出するヘッドライン */}
          <div className="mb-6">
            {/* 信頼性バッジ */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-400/30">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-amber-300 font-semibold text-sm">創業40年・職人直売店</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
            <span className="block mb-3">
              <span className="relative">
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-lg" />
                <span className="relative bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">最高級</span>
              </span>
              <span className="text-white">の逸品</span>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 drop-shadow-2xl">
              アイアン家具
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

          {/* 心理的価値提案 */}
          <div className="mb-12 space-y-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto text-white">
              <span className="text-gray-200">一流の空間を創る、</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                唯一無二の存在感
              </span>
            </p>
            
            {/* リアルタイム社会的証明 */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">{viewerCount}名が閲覧中</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-red-300 font-medium">残り{stockCount}点のみ</span>
              </div>
            </div>
          </div>

          {/* ニューロマーケティング最適化CTA */}
          <div className="space-y-6">
            {/* メインCTAエリア */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* プライマリCTA：購買行動を促進 */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-70 animate-pulse" />
                <Button
                  variant="premium"
                  size="xl"
                  rounded="xl"
                  onClick={scrollToGallery}
                  className="relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-8 py-5 text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center gap-3">
                    <span>限定作品を見る</span>
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </Button>
              </div>
              
              {/* セカンダリCTA：信頼性構築 */}
              <Button
                variant="ghost"
                size="lg"
                rounded="xl"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>品質保証について</span>
                </span>
              </Button>
            </div>

            
            {/* 信頼性指標 */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10年保証付き</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span>98%のお客様が満足</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span>全国配送無料</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero