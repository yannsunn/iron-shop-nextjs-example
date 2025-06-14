import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ページが見つかりません
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            お探しのページは存在しないか、
            <br />
            移動または削除された可能性があります。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
            >
              ホームに戻る
            </Link>
            
            <Link
              href="/#gallery"
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              作品を見る
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              引き続き問題が発生する場合は、
              <Link href="/#contact" className="text-blue-600 hover:underline">
                お問い合わせ
              </Link>
              ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}