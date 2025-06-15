'use client'

import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
    
    // You can also send to analytics/monitoring service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Send error to monitoring service
      // Example: Sentry, LogRocket, etc.
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            申し訳ございません。予期しないエラーが発生しました。
            <br />
            しばらく時間をおいて再度お試しください。
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                エラー詳細 (開発環境)
              </summary>
              <pre className="text-xs text-red-600 overflow-auto">
                {error.message}
                {error.stack && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    {error.stack}
                  </div>
                )}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              再試行
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}