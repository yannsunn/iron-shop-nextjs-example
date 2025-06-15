'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProductPlaceholderProps {
  className?: string
  title?: string
}

const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ 
  className,
  title = "アイアン製品" 
}) => {
  return (
    <div className={cn(
      "w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center text-white relative overflow-hidden",
      className
    )}>
      {/* パターン背景 */}
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
      
      {/* メインコンテンツ */}
      <div className="text-center relative z-10">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 6.5l-7 3v7c0 3.78 2.58 6.75 7 7.5 4.42-.75 7-3.72 7-7.5v-7l-7-3z" fill="rgba(251, 191, 36, 0.3)"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">職人による手作り製品</p>
        
        {/* 特徴リスト */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span>高品質アイアン素材</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span>オーダーメイド対応</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span>日本製・職人仕上げ</span>
          </div>
        </div>
        
        {/* ローディングアニメーション */}
        <div className="mt-6">
          <div className="inline-flex items-center text-xs text-gray-400">
            <div className="animate-spin mr-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
              </svg>
            </div>
            画像準備中...
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPlaceholder