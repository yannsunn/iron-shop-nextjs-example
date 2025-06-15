'use client'

import React, { type ReactNode, useEffect, useRef } from 'react'
import { useNeuroOptimization } from '@/hooks/useNeuroOptimization'

interface NeuroOptimizerProps {
  children: ReactNode
  section?: string
  priority?: 'high' | 'medium' | 'low'
  className?: string
}

const NeuroOptimizer: React.FC<NeuroOptimizerProps> = ({
  children,
  section = 'default',
  priority = 'medium',
  className = ''
}) => {
  const { neuroState, triggerAttentionGrab } = useNeuroOptimization()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const element = sectionRef.current

    // 低注意力の場合は注意を引く
    if (!neuroState.isHighAttention && priority === 'high') {
      triggerAttentionGrab()
    }

    // 認知負荷が高い場合は要素を簡素化
    if (!neuroState.isLowCognitiveLoad) {
      element.classList.add('neuro-simplified')
    } else {
      element.classList.remove('neuro-simplified')
    }

    // エンゲージメントが低い場合は視覚的強調
    if (!neuroState.isHighEngagement) {
      element.classList.add('neuro-enhanced')
    } else {
      element.classList.remove('neuro-enhanced')
    }

  }, [neuroState, priority, triggerAttentionGrab])

  // 離脱意図検知の処理
  useEffect(() => {
    const handleExitIntent = () => {
      if (priority === 'high' && sectionRef.current) {
        // 高優先度セクションで離脱意図を検知した場合の最適化
        sectionRef.current.classList.add('neuro-exit-optimization')
        
        setTimeout(() => {
          sectionRef.current?.classList.remove('neuro-exit-optimization')
        }, 5000)
      }
    }

    window.addEventListener('neuro:exitIntent', handleExitIntent)
    
    return () => {
      window.removeEventListener('neuro:exitIntent', handleExitIntent)
    }
  }, [priority])

  return (
    <div 
      ref={sectionRef}
      className={`neuro-optimized-section ${className}`}
      data-neuro-section={section}
      data-neuro-priority={priority}
      data-neuro-attention={neuroState.isHighAttention ? 'high' : 'low'}
    >
      {children}
      
      {/* ニューロ状態の視覚的インジケーター（開発用） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          <div>Section: {section}</div>
          <div>注意力: {neuroState.isHighAttention ? '高' : '低'}</div>
          <div>認知負荷: {neuroState.isLowCognitiveLoad ? '低' : '高'}</div>
          <div>感情: {neuroState.isPositiveEmotion ? '正' : '負'}</div>
          <div>推奨: {neuroState.recommendation}</div>
        </div>
      )}
    </div>
  )
}

export default NeuroOptimizer