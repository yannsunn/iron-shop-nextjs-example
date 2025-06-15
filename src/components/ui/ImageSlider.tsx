'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
  width?: number
  height?: number
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt, className, width = 600, height = 400 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  
  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]))
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  if (!images || images.length === 0) {
    return (
      <div className={cn("w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center text-white relative overflow-hidden", className)}>
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #4a5568 25%, transparent 25%), 
              linear-gradient(-45deg, #4a5568 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #4a5568 75%), 
              linear-gradient(-45deg, transparent 75%, #4a5568 75%)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }}
        />
        <div className="text-center relative z-10">
          <div className="mb-3">
            <svg className="w-14 h-14 mx-auto text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M12 6.5l-7 3v7c0 3.78 2.58 6.75 7 7.5 4.42-.75 7-3.72 7-7.5v-7l-7-3z" fill="rgba(251, 191, 36, 0.3)"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-1">アイアン製品</h3>
          <p className="text-sm text-gray-300 mb-3">職人による手作り</p>
          <div className="inline-flex items-center text-xs text-gray-400">
            <div className="animate-spin mr-2">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
              </svg>
            </div>
            画像準備中
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)} style={{ width: width, height: height }}>
      {/* Image with fallback */}
      <div className="relative w-full h-full">
        {imageErrors.has(currentIndex) ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #4a5568 25%, transparent 25%), 
                  linear-gradient(-45deg, #4a5568 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #4a5568 75%), 
                  linear-gradient(-45deg, transparent 75%, #4a5568 75%)
                `,
                backgroundSize: '30px 30px',
                backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
              }}
            />
            <div className="text-center relative z-10">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-300">アイアン製品画像</p>
            </div>
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={alt}
            className="w-full h-full object-cover transition-all duration-500"
            onError={() => handleImageError(currentIndex)}
          />
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
</svg>

          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full bg-white/70 transition-all duration-300",
                currentIndex === index ? "scale-125 bg-white" : ""
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageSlider 