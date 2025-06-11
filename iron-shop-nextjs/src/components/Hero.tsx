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
          

          {/* Main heading with clean text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white">
            <span className="block text-shadow-lg">
              最高品質の
            </span>
            <span className="block text-blue-100 mt-2 text-shadow-lg">
              アイアン製品
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 font-light leading-relaxed max-w-4xl mx-auto text-gray-100">
            職人の技が光る、こだわりのアイアン製品をお届けします
          </p>

          {/* Premium CTA button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
              className="tracking-wide shadow-glow-hover"
            >
              作品を見る
            </Button>

            <div className="hidden sm:block w-px h-12 bg-white/30" />

            <div className="text-center text-white/80">
              <p className="text-sm font-medium">オーダーメイド対応</p>
              <p className="text-xs opacity-75">ご相談無料</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero