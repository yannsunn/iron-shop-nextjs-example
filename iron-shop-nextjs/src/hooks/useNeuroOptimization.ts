'use client'

import { useState, useEffect, useCallback } from 'react'
import { neuroAnalytics } from '@/lib/neuro-analytics'

interface NeuroState {
  isHighAttention: boolean
  isLowCognitiveLoad: boolean
  isPositiveEmotion: boolean
  isHighEngagement: boolean
  recommendation: string
}

interface NeuroHooks {
  neuroState: NeuroState
  triggerAttentionGrab: () => void
  optimizeForConversion: () => void
  reduceLoad: () => void
}

export const useNeuroOptimization = (): NeuroHooks => {
  const [neuroState, setNeuroState] = useState<NeuroState>({
    isHighAttention: false,
    isLowCognitiveLoad: false,
    isPositiveEmotion: false,
    isHighEngagement: false,
    recommendation: ''
  })

  const updateNeuroMetrics = useCallback(() => {
    const metrics = neuroAnalytics.calculateNeuroMetrics()
    const recommendation = neuroAnalytics.getABTestRecommendation('A')

    setNeuroState({
      isHighAttention: metrics.attentionScore > 70,
      isLowCognitiveLoad: metrics.cognitiveLoad < 30,
      isPositiveEmotion: metrics.emotionalValence > 0.3,
      isHighEngagement: metrics.engagementRate > 60,
      recommendation
    })
  }, [])

  // 注意力を引き付ける効果
  const triggerAttentionGrab = useCallback(() => {
    // 視覚的な注意喚起
    const elements = document.querySelectorAll('[data-neuro-attention]')
    elements.forEach(el => {
      el.classList.add('animate-attention')
      setTimeout(() => {
        el.classList.remove('animate-attention')
      }, 3000)
    })
  }, [])

  // コンバージョン最適化
  const optimizeForConversion = useCallback(() => {
    const metrics = neuroAnalytics.calculateNeuroMetrics()
    
    if (metrics.attentionScore < 50) {
      // 注意力が低い場合、CTAボタンを目立たせる
      const ctaButtons = document.querySelectorAll('[data-cta]')
      ctaButtons.forEach(btn => {
        btn.classList.add('animate-neuro-pulse', 'trust-badge')
      })
    }

    if (metrics.emotionalValence < 0) {
      // ネガティブな感情の場合、信頼指標を強化
      const trustElements = document.querySelectorAll('[data-trust]')
      trustElements.forEach(el => {
        el.classList.add('animate-trust-glow')
      })
    }

    if (metrics.cognitiveLoad > 70) {
      // 認知負荷が高い場合、要素を簡素化
      const complexElements = document.querySelectorAll('[data-simplify]')
      complexElements.forEach(el => {
        el.style.opacity = '0.7'
        el.style.filter = 'blur(1px)'
      })
    }
  }, [])

  // 認知負荷軽減
  const reduceLoad = useCallback(() => {
    // 不要なアニメーションを停止
    const animatedElements = document.querySelectorAll('.animate-pulse, .animate-bounce')
    animatedElements.forEach(el => {
      el.classList.add('motion-reduce:animate-none')
    })

    // フォーカス要素を明確にする
    const focusElements = document.querySelectorAll('[data-focus]')
    focusElements.forEach(el => {
      el.classList.add('neuro-focus')
    })
  }, [])

  // 離脱意図検知時の最適化
  useEffect(() => {
    const handleExitIntent = () => {
      // 緊急性を示すポップアップや特別オファーを表示
      triggerAttentionGrab()
      
      // 最後のコンバージョン試行
      setTimeout(() => {
        optimizeForConversion()
      }, 1000)
    }

    window.addEventListener('neuro:exitIntent', handleExitIntent)
    
    return () => {
      window.removeEventListener('neuro:exitIntent', handleExitIntent)
    }
  }, [triggerAttentionGrab, optimizeForConversion])

  // 定期的なメトリクス更新
  useEffect(() => {
    const interval = setInterval(updateNeuroMetrics, 5000)
    
    // 初回更新
    updateNeuroMetrics()
    
    return () => clearInterval(interval)
  }, [updateNeuroMetrics])

  // パフォーマンス最適化：高認知負荷時の自動調整
  useEffect(() => {
    if (!neuroState.isLowCognitiveLoad) {
      reduceLoad()
    }
  }, [neuroState.isLowCognitiveLoad, reduceLoad])

  // エンゲージメント低下時の自動最適化
  useEffect(() => {
    if (!neuroState.isHighEngagement && neuroState.recommendation) {
      optimizeForConversion()
    }
  }, [neuroState.isHighEngagement, neuroState.recommendation, optimizeForConversion])

  return {
    neuroState,
    triggerAttentionGrab,
    optimizeForConversion,
    reduceLoad
  }
}

// コンポーネント用のヘルパーフック
export const useNeuroElement = (elementType: 'cta' | 'trust' | 'attention' | 'focus') => {
  const { neuroState } = useNeuroOptimization()
  
  const getOptimalProps = useCallback(() => {
    const baseProps: Record<string, any> = {}
    
    switch (elementType) {
      case 'cta':
        baseProps['data-cta'] = true
        if (!neuroState.isHighAttention) {
          baseProps.className = 'animate-neuro-pulse trust-badge'
        }
        break
        
      case 'trust':
        baseProps['data-trust'] = true
        if (!neuroState.isPositiveEmotion) {
          baseProps.className = 'animate-trust-glow'
        }
        break
        
      case 'attention':
        baseProps['data-neuro-attention'] = true
        break
        
      case 'focus':
        baseProps['data-focus'] = true
        if (!neuroState.isLowCognitiveLoad) {
          baseProps.className = 'neuro-focus'
        }
        break
    }
    
    return baseProps
  }, [elementType, neuroState])
  
  return { getOptimalProps }
}