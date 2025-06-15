'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const TermsOfService = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                利用規約
              </h1>
              <p className="text-gray-600">
                アイアンショップ（以下「当社」）のWebサイト及びサービスをご利用いただく際の
                利用規約を定めています。
              </p>
            </div>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              {/* 1. 適用範囲 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  適用範囲
                </h2>
                <p>
                  本利用規約は、当社が提供するWebサイト、製品・サービスの利用に関して、
                  当社とお客様との間に適用されます。お客様は、本サイトを利用することで、
                  本利用規約に同意したものとみなされます。
                </p>
              </section>

              {/* 2. サービス内容 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  サービス内容
                </h2>
                <div className="space-y-4">
                  <p>当社は、以下のサービスを提供しています：</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-800 mb-2">製品・サービス</h3>
                      <ul className="text-sm space-y-1">
                        <li>• アイアン製品の製造・販売</li>
                        <li>• オーダーメイド製品の設計・製作</li>
                        <li>• 製品の配送・設置サービス</li>
                        <li>• アフターサポート・メンテナンス</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-800 mb-2">Webサービス</h3>
                      <ul className="text-sm space-y-1">
                        <li>• 製品カタログの閲覧</li>
                        <li>• お見積もり・お問い合わせ</li>
                        <li>• 製作進捗の確認</li>
                        <li>• 技術情報・メンテナンス案内</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. ご注文・お支払い */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  ご注文・お支払い
                </h2>
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-bold text-amber-800 mb-2">ご注文プロセス</h3>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>お問い合わせ・ご相談</li>
                      <li>お見積もり作成・ご提示</li>
                      <li>仕様確定・正式ご注文</li>
                      <li>製作開始・進捗報告</li>
                      <li>完成・お引き渡し</li>
                    </ol>
                  </div>
                  <p>
                    製品代金のお支払いは、銀行振込または現金でのお支払いとなります。
                    オーダーメイド製品は、着手金として代金の一部をお支払いいただく場合があります。
                  </p>
                </div>
              </section>

              {/* 4. 納期・キャンセル */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  納期・キャンセルポリシー
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h3 className="font-bold text-red-800 mb-2">キャンセルについて</h3>
                      <ul className="text-sm space-y-1">
                        <li>• 製作開始前：キャンセル可能</li>
                        <li>• 製作開始後：原則キャンセル不可</li>
                        <li>• オーダーメイド：仕様確定後キャンセル不可</li>
                        <li>• お客様都合：キャンセル料が発生する場合有</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-800 mb-2">納期について</h3>
                      <ul className="text-sm space-y-1">
                        <li>• 標準製品：2-3週間</li>
                        <li>• オーダーメイド：3-4週間</li>
                        <li>• 大型製品：4-6週間</li>
                        <li>• 天候・材料調達により変動の可能性有</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 品質保証・アフターサービス */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  品質保証・アフターサービス
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2">品質保証</h3>
                    <p className="text-sm mb-2">
                      当社製品は、納品日より10年間の品質保証を提供いたします。
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• 構造的欠陥：無償修理・交換</li>
                      <li>• 塗装の著しい劣化：部分補修対応</li>
                      <li>• 通常使用での故障：無償対応</li>
                      <li>• お客様の過失・天災：有償対応</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. 禁止事項 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  禁止事項
                </h2>
                <div className="space-y-4">
                  <p>お客様は、以下の行為を行ってはなりません：</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">虚偽情報の提供</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">不正アクセス・システム攻撃</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">知的財産権の侵害</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">他のお客様への迷惑行為</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">法令・公序良俗に反する行為</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">商用利用目的での情報収集</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. 免責事項 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  免責事項
                </h2>
                <div className="space-y-4">
                  <p>
                    当社は、以下の事項について責任を負いかねます：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>天災・事故等の不可抗力による納期遅延</li>
                    <li>お客様の故意・過失による製品の損傷</li>
                    <li>第三者によるWebサイトへの攻撃・障害</li>
                    <li>お客様の機器・ソフトウェアの不具合</li>
                    <li>製品の使用による間接的・結果的損害</li>
                  </ul>
                </div>
              </section>

              {/* 8. 規約の変更 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                  利用規約の変更
                </h2>
                <p>
                  当社は、必要に応じて本利用規約を変更する場合があります。
                  変更後の利用規約は、本ページに掲載した時点で効力を生じ、
                  お客様が継続してサービスを利用された場合、変更に同意したものとみなします。
                </p>
              </section>

              {/* 9. 準拠法・管轄裁判所 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">9</span>
                  準拠法・管轄裁判所
                </h2>
                <p>
                  本利用規約は日本法に準拠し、本利用規約に関する一切の紛争については、
                  当社本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300"
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

export default TermsOfService