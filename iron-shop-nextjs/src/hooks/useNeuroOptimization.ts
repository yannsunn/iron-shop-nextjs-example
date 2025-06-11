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

export const useNeuroOptimization = () => {
  const [neuroState, setNeuroState] = useState<NeuroState>({
    isHighAttention: false,
    isLowCognitiveLoad: false,
    isPositiveEmotion: false,
    isHighEngagement: false,
    recommendation: ''
  })

  const updateNeuroMetrics = useCallback(() => {
    const metrics = neuroAnalytics.calculateNeuroMetrics()

    let recommendation = ''
    if (metrics.cognitiveLoad > 70) {
      recommendation = 'High cognitive load detected. Simplify the design.'
    } else if (metrics.attentionScore < 30) {
      recommendation = 'Low attention score. Add visual hierarchy.'
    } else if (metrics.emotionalValence < -0.5) {
      recommendation = 'Negative emotional response. Review messaging.'
    } else if (metrics.engagementRate < 40) {
      recommendation = 'Low engagement. Add interactive elements.'
    } else {
      recommendation = 'Optimal neuro-metrics achieved.'
    }

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
    const elements = document.querySelectorAll('[data-neuro-attention]')
    elements.forEach(el => {
      el.classList.add('animate-pulse')
      setTimeout(() => {
        el.classList.remove('animate-pulse')
      }, 3000)
    })
  }, [])

  // 定期的なメトリクス更新
  useEffect(() => {
    const interval = setInterval(updateNeuroMetrics, 5000)
    updateNeuroMetrics() // 初回更新
    return () => clearInterval(interval)
  }, [updateNeuroMetrics])

  return {
    neuroState,
    triggerAttentionGrab,
    updateNeuroMetrics
  }
}