'use client'

import Image from 'next/image'
import React, { useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Button from '@/components/ui/Button'

const Hero = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    initialIsIntersecting: true 
  })

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


      {/* Simplified overlay for better text readability */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Main content with enhanced animations */}
      <div className="relative z-10 text-center max-w-6xl px-6 mx-auto flex flex-col justify-center h-full">
        <div className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          

          {/* Clean, readable heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-white drop-shadow-lg">
            <span className="block mb-2">最高品質の</span>
            <span className="block text-amber-200">アイアン製品</span>
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

          {/* Clean, readable subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-12 font-light leading-relaxed max-w-3xl mx-auto text-gray-100 drop-shadow-lg">
            40年の匠の技が創り出す、<span className="text-amber-200 font-medium">一生モノ</span>の逸品
          </p>

          {/* Premium CTA button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="relative group">
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
                data-neuro-attention
              >
                <span className="relative z-10">作品を見る</span>
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

Hero.displayName = 'Hero'

export default Hero