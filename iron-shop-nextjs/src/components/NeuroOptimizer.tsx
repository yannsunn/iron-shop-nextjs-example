'use client'

import React, { useEffect, useState } from 'react'
import { useNeuroOptimization } from '@/hooks/useNeuroOptimization'

interface NeuroOptimizerProps {
  children: React.ReactNode
  enableDebug?: boolean
}

const NeuroOptimizer: React.FC<NeuroOptimizerProps> = ({ 
  children, 
  enableDebug = false 
}) => {
  const { neuroState, triggerAttentionGrab, optimizeForConversion } = useNeuroOptimization()
  const [debugVisible, setDebugVisible] = useState(false)

  // 自動最適化トリガー
  useEffect(() => {
    // 低エンゲージメント時の自動介入
    if (!neuroState.isHighEngagement && neuroState.recommendation) {
      const timer = setTimeout(() => {
        optimizeForConversion()
      }, 10000) // 10秒後に介入

      return () => clearTimeout(timer)
    }
  }, [neuroState.isHighEngagement, neuroState.recommendation, optimizeForConversion])

  // 注意力低下時の自動介入
  useEffect(() => {
    if (!neuroState.isHighAttention) {
      const timer = setTimeout(() => {
        triggerAttentionGrab()
      }, 15000) // 15秒後に注意喚起

      return () => clearTimeout(timer)
    }
  }, [neuroState.isHighAttention, triggerAttentionGrab])

  // デバッグモード用のキーボードショートカット
  useEffect(() => {
    if (!enableDebug) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'n') {
        setDebugVisible(!debugVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [enableDebug, debugVisible])

  return (
    <>
      {children}
      
      {/* デバッグパネル */}
      {enableDebug && debugVisible && (
        <div className=\"fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg z-50 max-w-xs\">\n          <div className=\"text-xs space-y-2\">\n            <h3 className=\"font-bold text-amber-400\">🧠 Neuro Debug</h3>\n            \n            <div className=\"space-y-1\">\n              <div className={`flex justify-between ${\n                neuroState.isHighAttention ? 'text-green-400' : 'text-red-400'\n              }`}>\n                <span>注意力:</span>\n                <span>{neuroState.isHighAttention ? '高' : '低'}</span>\n              </div>\n              \n              <div className={`flex justify-between ${\n                neuroState.isLowCognitiveLoad ? 'text-green-400' : 'text-red-400'\n              }`}>\n                <span>認知負荷:</span>\n                <span>{neuroState.isLowCognitiveLoad ? '低' : '高'}</span>\n              </div>\n              \n              <div className={`flex justify-between ${\n                neuroState.isPositiveEmotion ? 'text-green-400' : 'text-red-400'\n              }`}>\n                <span>感情価:</span>\n                <span>{neuroState.isPositiveEmotion ? 'ポジティブ' : 'ネガティブ'}</span>\n              </div>\n              \n              <div className={`flex justify-between ${\n                neuroState.isHighEngagement ? 'text-green-400' : 'text-red-400'\n              }`}>\n                <span>エンゲージメント:</span>\n                <span>{neuroState.isHighEngagement ? '高' : '低'}</span>\n              </div>\n            </div>\n            \n            {neuroState.recommendation && (\n              <div className=\"border-t border-gray-600 pt-2 mt-2\">\n                <p className=\"text-amber-300 text-xs\">\n                  💡 {neuroState.recommendation}\n                </p>\n              </div>\n            )}\n            \n            <div className=\"border-t border-gray-600 pt-2 mt-2 space-y-1\">\n              <button\n                onClick={triggerAttentionGrab}\n                className=\"w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs\"\n              >\n                注意喚起\n              </button>\n              <button\n                onClick={optimizeForConversion}\n                className=\"w-full bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs\"\n              >\n                最適化実行\n              </button>\n            </div>\n            \n            <p className=\"text-gray-400 text-xs mt-2\">\n              Ctrl+Alt+N で切り替え\n            </p>\n          </div>\n        </div>\n      )}\n      \n      {/* グローバルスタイル注入 */}\n      <style jsx global>{`\n        [data-neuro-attention] {\n          transition: all 0.3s ease;\n        }\n        \n        [data-neuro-attention].animate-attention {\n          transform: scale(1.05);\n          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);\n        }\n        \n        [data-cta]:not(.animate-neuro-pulse) {\n          transition: all 0.3s ease;\n        }\n        \n        [data-trust]:not(.animate-trust-glow) {\n          transition: all 0.3s ease;\n        }\n        \n        .motion-reduce:animate-none {\n          animation: none !important;\n        }\n        \n        @media (prefers-reduced-motion: reduce) {\n          .animate-neuro-pulse,\n          .animate-attention,\n          .animate-trust-glow {\n            animation: none !important;\n          }\n        }\n      `}</style>\n    </>\n  )\n}\n\nexport default NeuroOptimizer