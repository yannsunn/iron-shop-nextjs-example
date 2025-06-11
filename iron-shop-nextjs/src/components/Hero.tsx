'use client'

import Image from 'next/image'
import React, { useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import useMousePosition from '@/hooks/useMousePosition'
import Button from '@/components/ui/Button'

const Hero = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    initialIsIntersecting: true 
  })
  const mousePosition = useMousePosition(sectionRef)

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
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="アイアンショップ - 職人の技が光る高品質アイアン製品"
          fill
          className="object-cover transform scale-110 transition-transform duration-700"
          style={{ 
            filter: 'brightness(0.3) contrast(1.1) saturate(1.2)',
            transform: `scale(1.1) translate(${mousePosition.elementX * 0.01}px, ${mousePosition.elementY * 0.01}px)`
          }}
          priority
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>


      {/* Enhanced overlays */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-slate-900/60" />
      </div>
      
      {/* Main content with enhanced animations */}
      <div className="relative z-20 text-center max-w-6xl px-6">
        <div className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          

          {/* Neuro-optimized heading with cognitive load reduction */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white">
            <span className="block text-shadow-lg relative">
              <span className="absolute -inset-1 blur-xl bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative">最高品質の</span>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-amber-200 mt-2 text-shadow-lg relative">
              <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-blue-400/30 to-amber-400/30 rounded-lg" />
              <span className="relative">アイアン製品</span>
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

          {/* Neuro-optimized subtitle with emotional triggers */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 font-light leading-relaxed max-w-4xl mx-auto">
            <span className="text-gray-100">40年の</span>
            <span className="text-white font-medium mx-1 relative">
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              匠の技
            </span>
            <span className="text-gray-100">が創り出す、</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 font-medium">一生モノ</span>
            <span className="text-gray-100">の逸品</span>
          </p>

          {/* Premium CTA button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="relative group">
              {/* Neuro-trigger: Urgency indicator */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                本日限定
              </div>
              <Button
                variant="premium"
                size="xl"
                rounded="xl"
                onClick={scrollToGallery}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                }
                className="tracking-wide shadow-glow-hover transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">作品を見る</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/30" />

            <div className="text-center">
              <p className="text-sm font-medium text-white/90 mb-1">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  完全オーダーメイド
                </span>
              </p>
              <p className="text-xs text-amber-300 font-semibold">無料相談 → 3営業日で見積もり</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero