'use client'

import Image from 'next/image'
import React, { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import useMousePosition from '@/hooks/useMousePosition'
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
    title: 'アンティーク調シェルフ',
    description: 'ヴィンテージ感あふれる収納棚のオーダーメイド作品',
    image: '/images/iron1.jpg',
    alt: 'アンティークアイアンシェルフ施工例',
    category: 'furniture',
    featured: true,
  },
  {
    id: 'gallery2',
    title: 'インダストリアルテーブル',
    description: '無垢材とアイアンを組み合わせたダイニングテーブル',
    image: '/images/iron2.jpg',
    alt: 'インダストリアルテーブル施工例',
    category: 'furniture',
  },
  {
    id: 'gallery3',
    title: 'アートパーテーション',
    description: '空間を美しく仕切るジオメトリックデザイン',
    image: '/images/iron3.jpg',
    alt: 'デザインパーテーション施工例',
    category: 'decoration',
    featured: true,
  },
  {
    id: 'gallery4',
    title: 'カスタム階段手すり',
    description: '住宅用オーダーメイド階段手すりの施工例',
    image: '/images/hero.jpg',
    alt: 'カスタム階段手すり施工例',
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
          'bg-blue-500/20',
          isHovered && 'animate-pulse-glow'
        )} 
      />
      
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          className={cn(
            'object-cover transition-all duration-700',
            'group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category badge */}
        <div className={cn(
          'absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full transition-all duration-500',
          'bg-white/20 backdrop-blur-sm border border-white/30 text-white',
          'opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
        )}>
          {item.category === 'furniture' && '家具'}
          {item.category === 'decoration' && '装飾'}
          {item.category === 'architecture' && '建築'}
          {item.category === 'custom' && 'カスタム'}
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Enhanced content area */}
      <div className="relative p-8 bg-white/90 backdrop-blur-sm">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
            {item.description}
          </p>
          
          {/* Animated underline */}
          <div className="mt-4 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 rounded-full" />
        </div>
      </div>
    </Card>
  )
})

// Main Gallery Component with Performance Optimizations
const Gallery = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true })
  const mousePosition = useMousePosition(sectionRef)

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

  // Memoized background elements to prevent unnecessary re-renders
  const backgroundElements = useMemo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.elementX * 0.02}px, ${mousePosition.elementY * 0.02}px)`,
          left: '10%',
          top: '20%',
        }}
      />
      <div 
        className="absolute w-80 h-80 bg-amber-100/20 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.elementX * -0.01}px, ${mousePosition.elementY * -0.01}px)`,
          right: '10%',
          bottom: '20%',
          animationDelay: '1s'
        }}
      />
    </div>
  ), [mousePosition.elementX, mousePosition.elementY])

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="relative py-32 overflow-hidden bg-slate-50"
    >
      {/* Memoized animated background elements */}
      {backgroundElements}

      <div className="container-custom relative z-10">
        <div className={cn(
          'text-center mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-block">
            <h2 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              施工事例ギャラリー
            </h2>
            <div className="h-1 w-24 mx-auto bg-blue-600 rounded-full shadow-lg" />
          </div>
          <p className="text-xl text-slate-600 mt-8 max-w-2xl mx-auto leading-relaxed font-light">
            オーダーメイドで製作したアイアン製品の施工事例をご紹介します
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

export default Gallery