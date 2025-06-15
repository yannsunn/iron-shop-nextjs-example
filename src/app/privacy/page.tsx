'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                プライバシーポリシー
              </h1>
              <p className="text-gray-600">
                アイアンショップ（以下「当社」）は、お客様の個人情報保護を重要視し、
                以下のプライバシーポリシーを定めています。
              </p>
            </div>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              {/* 1. 基本方針 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  基本方針
                </h2>
                <p>
                  当社は、個人情報の重要性を認識し、個人情報保護法等の関連法令を遵守し、
                  お客様の個人情報を適切に取り扱い、保護に努めます。
                </p>
              </section>

              {/* 2. 個人情報の収集 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  個人情報の収集
                </h2>
                <div className="space-y-4">
                  <p>当社では、以下の目的で個人情報を収集いたします：</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>お問い合わせ・ご相談への対応</li>
                    <li>オーダーメイド製品の製作・納期管理</li>
                    <li>製品の配送・アフターサービス</li>
                    <li>製品・サービスに関する情報提供</li>
                    <li>お客様満足度向上のための調査・分析</li>
                  </ul>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <h3 className="font-bold text-blue-800 mb-2">収集する情報</h3>
                    <ul className="text-sm space-y-1">
                      <li>• お名前、電話番号、メールアドレス</li>
                      <li>• 住所（配送先情報）</li>
                      <li>• 製品に関するご要望・仕様</li>
                      <li>• お問い合わせ内容</li>
                      <li>• Webサイトのアクセス情報（Cookie等）</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 個人情報の利用 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  個人情報の利用
                </h2>
                <p>
                  収集した個人情報は、収集目的の範囲内で利用し、お客様の同意なく目的外利用することはありません。
                  また、法令に基づく場合を除き、第三者への提供は行いません。
                </p>
              </section>

              {/* 4. 個人情報の管理 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  個人情報の管理
                </h2>
                <div className="space-y-4">
                  <p>当社は、個人情報の安全管理のために以下の措置を講じています：</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-800 mb-2">技術的安全管理</h3>
                      <ul className="text-sm space-y-1">
                        <li>• SSL暗号化通信</li>
                        <li>• ファイアウォール設置</li>
                        <li>• アクセス制御</li>
                        <li>• 定期的セキュリティ更新</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h3 className="font-bold text-amber-800 mb-2">物理的安全管理</h3>
                      <ul className="text-sm space-y-1">
                        <li>• 施錠可能な保管場所</li>
                        <li>• 入退室管理</li>
                        <li>• 機器の盗難防止</li>
                        <li>• 廃棄時の適切処理</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Cookie・アクセス解析 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Cookie・アクセス解析
                </h2>
                <div className="space-y-4">
                  <p>
                    当サイトでは、サービス向上のためCookieを使用しています。
                    Cookieは個人を特定する情報ではありませんが、ブラウザ設定で無効にすることも可能です。
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2">使用目的</h3>
                    <ul className="text-sm space-y-1">
                      <li>• サイトの利用状況分析</li>
                      <li>• ユーザー体験の改善</li>
                      <li>• 適切な情報提供</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. お客様の権利 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  お客様の権利
                </h2>
                <div className="space-y-4">
                  <p>お客様は、ご自身の個人情報について以下の権利を有します：</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">開示請求権</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">訂正・削除請求権</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">利用停止請求権</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">第三者提供停止請求権</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. お問い合わせ */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  お問い合わせ窓口
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-4">個人情報保護に関するお問い合わせ</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">事業者名</p>
                      <p>アイアンショップ</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">個人情報保護責任者</p>
                      <p>代表取締役</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">連絡先</p>
                      <p>お問い合わせフォームまたはお電話にて</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">受付時間</p>
                      <p>平日 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. 改定について */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                  ポリシーの改定
                </h2>
                <p>
                  本プライバシーポリシーは、法令改正等に伴い予告なく変更する場合があります。
                  変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
                </p>
              </section>
            </div>

            {/* 制定日・改定日 */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
              <p>制定日：2024年1月1日</p>
              <p>最終改定日：2024年6月15日</p>
            </div>

            {/* 戻るボタン */}
            <div className="mt-8 text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                前のページに戻る
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default PrivacyPolicy