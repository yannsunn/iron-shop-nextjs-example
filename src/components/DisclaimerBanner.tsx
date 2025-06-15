'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Check if user has seen disclaimer before
    const hasSeenDisclaimer = localStorage.getItem('example-site-disclaimer-seen')
    if (hasSeenDisclaimer) {
      setIsMinimized(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('example-site-disclaimer-seen', 'true')
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (!isMinimized) {
      localStorage.setItem('example-site-disclaimer-seen', 'true')
    }
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-[200] bg-amber-500 text-black transition-all duration-300',
      isMinimized ? 'h-10' : 'h-auto'
    )}>
      <div className="container mx-auto px-4">
        {isMinimized ? (
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-amber-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">ポートフォリオ用サンプルサイト</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMinimize}
                className="text-amber-800 hover:text-amber-900 transition-colors"
                aria-label="詳細を表示"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="text-amber-800 hover:text-amber-900 transition-colors"
                aria-label="バナーを閉じる"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-800 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-bold text-sm sm:text-base text-amber-900 mb-1">
                    ⚠️ これはポートフォリオ用のサンプルサイトです
                  </div>
                  <div className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    このサイトの会社情報・連絡先・製品情報はすべて架空のものです。実際のサービス提供は行っておりません。
                    <span className="font-medium">技術デモンストレーション</span>および
                    <span className="font-medium">ポートフォリオ展示</span>を目的としています。
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={handleMinimize}
                  className="px-3 py-1 bg-amber-600 text-amber-100 text-xs rounded hover:bg-amber-700 transition-colors"
                >
                  最小化
                </button>
                <button
                  onClick={handleClose}
                  className="text-amber-800 hover:text-amber-900 transition-colors"
                  aria-label="バナーを閉じる"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisclaimerBanner