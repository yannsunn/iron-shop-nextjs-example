'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CompanyInfo = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                会社概要・特定商取引法に基づく表記
              </h1>
              <p className="text-gray-600">
                Vintage Iron Works Exampleの会社情報と特定商取引法に基づく表記をご確認ください。
              </p>
            </div>

            <div className="space-y-12">
              {/* 会社概要 */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  会社概要
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-800 mb-4 text-lg">基本情報</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700">会社名</p>
                          <p className="text-gray-900">株式会社Example Corporation</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">代表者</p>
                          <p className="text-gray-900">代表取締役 山田 太郎（サンプル）</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">設立</p>
                          <p className="text-gray-900">2024年</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">事業形態</p>
                          <p className="text-gray-900">アイアン製品の企画・販売・品質管理</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-800 mb-4 text-lg">事業内容</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>アイアン製品の企画・デザイン</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>オーダーメイド製品の販売・管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>品質管理・アフターサービス</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>製造パートナーとの連携・管理</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>お客様サポート・コンサルティング</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                      <h3 className="font-bold text-amber-800 mb-4 text-lg">所在地・連絡先</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700">本社所在地</p>
                          <p className="text-gray-900">〒100-0001<br />東京都千代田区千代田1-1-1<br />エグザンプルビル3F</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">電話番号</p>
                          <p className="text-gray-900">03-1234-5678（サンプル）</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">メールアドレス</p>
                          <p className="text-gray-900">info@example-ironshop.com</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">営業時間</p>
                          <p className="text-gray-900">平日 9:00-18:00<br />土曜 9:00-17:00<br />日祝日 休業</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h3 className="font-bold text-purple-800 mb-4 text-lg">製造パートナー</h3>
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded border border-purple-300">
                          <h4 className="font-bold text-purple-700 mb-2">株式会社Example Works <span className="text-red-600 text-sm font-normal">（架空）</span></h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>溶接歴40年超の信頼あるパートナー</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>1級溶接技能士在籍</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>当社厳格な品質管理体制で製作</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>10年品質保証付き</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 特定商取引法に基づく表記 */}
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  特定商取引法に基づく表記
                </h2>
                
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">販売事業者名</h3>
                        <p className="text-gray-700">株式会社Example Corporation <span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">運営責任者</h3>
                        <p className="text-gray-700">代表取締役 山田 太郎 <span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">所在地</h3>
                        <p className="text-gray-700">〒100-0001<br />東京都千代田区千代田1-1-1<br />エグザンプルビル3F <span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">電話番号</h3>
                        <p className="text-gray-700">03-1234-5678 <span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">メールアドレス</h3>
                        <p className="text-gray-700">info@example-ironshop.com <span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">製造</h3>
                        <p className="text-gray-700">株式会社Example Works（当社品質管理のもと製作）<span className="text-red-600 text-sm">（架空）</span></p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">販売価格</h3>
                        <p className="text-gray-700">
                          各製品ページ及びお見積書に記載<br />
                          （消費税込み・送料別途）
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">支払方法</h3>
                        <p className="text-gray-700">
                          銀行振込（前払い）<br />
                          現金払い（お引き渡し時）
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">支払期限</h3>
                        <p className="text-gray-700">
                          銀行振込：ご注文確定後7日以内<br />
                          現金払い：商品お引き渡し時
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">引き渡し時期</h3>
                        <p className="text-gray-700">
                          ご入金確認後、製作期間2-6週間<br />
                          （製品により異なる）
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">返品・交換</h3>
                        <p className="text-gray-700">
                          オーダーメイド商品のため原則不可<br />
                          （不良品の場合は無償交換）
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-300">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">送料</h3>
                        <p className="text-gray-700">
                          商品サイズ・配送地域により異なる<br />
                          お見積時にご提示いたします
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">その他費用</h3>
                        <p className="text-gray-700">
                          設置作業費：別途お見積り<br />
                          振込手数料：お客様負担
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* アクセス情報 */}
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  アクセス
                </h2>
                
                <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-blue-800 mb-4 text-lg">電車でお越しの場合</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• JR山手線「東京駅」徒歩5分 <span className="text-red-600 text-sm">（サンプル）</span></li>
                        <li>• 東京メトロ丸ノ内線「大手町駅」徒歩3分 <span className="text-red-600 text-sm">（サンプル）</span></li>
                        <li>• 都営三田線「日比谷駅」徒歩7分 <span className="text-red-600 text-sm">（サンプル）</span></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-blue-800 mb-4 text-lg">お車でお越しの場合</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 首都高速「江戸橋出口」より5分 <span className="text-red-600 text-sm">（サンプル）</span></li>
                        <li>• 駐車場：地下駐車場完備 <span className="text-red-600 text-sm">（サンプル）</span></li>
                        <li>• バレーパーキング対応 <span className="text-red-600 text-sm">（サンプル）</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded border border-blue-300">
                    <p className="text-sm text-gray-600">
                      <strong>ご来訪の際は事前にお電話でご連絡ください。</strong><br />
                      製品見学・製作相談も承っております。お気軽にお問い合わせください。
                    </p>
                  </div>
                </div>
              </section>

              {/* 免責事項 */}
              <section className="mt-12 bg-red-50 p-6 rounded-lg border-2 border-red-300">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-red-800 text-lg mb-2">ご注意</h3>
                    <p className="text-red-700">
                      このページはサンプルサイトです。記載されている会社名、人物名、住所、連絡先等は架空のものです。
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* 戻るボタン */}
            <div className="mt-12 text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
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

export default CompanyInfo