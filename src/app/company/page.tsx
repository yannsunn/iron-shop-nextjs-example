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
                アイアンショップの会社情報と特定商取引法に基づく表記をご確認ください。
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
                          <p className="text-gray-900">アイアンショップ</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">代表者</p>
                          <p className="text-gray-900">代表取締役 鉄工 太郎</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">創業</p>
                          <p className="text-gray-900">1984年（創業40年）</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">従業員数</p>
                          <p className="text-gray-900">12名（職人8名、事務4名）</p>
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
                          <span>オーダーメイドアイアン製品の設計・製作</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>家具・インテリア用アイアンパーツ製造</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>建築用鉄骨・手すり等の製作</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>金属加工・溶接サービス</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>メンテナンス・修理サービス</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                      <h3 className="font-bold text-amber-800 mb-4 text-lg">所在地・連絡先</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-700">本社・工場</p>
                          <p className="text-gray-900">〒000-0000<br />東京都○○区○○町1-2-3</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">電話番号</p>
                          <p className="text-gray-900">03-0000-0000</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">FAX番号</p>
                          <p className="text-gray-900">03-0000-0001</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">営業時間</p>
                          <p className="text-gray-900">平日 9:00-18:00<br />土曜 9:00-17:00<br />日祝日 休業</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h3 className="font-bold text-purple-800 mb-4 text-lg">認証・資格</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>ISO9001品質管理認証取得</span>
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
                          <span>建設業許可（鋼構造物工事業）</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>労働安全衛生マネジメント適用</span>
                        </li>
                      </ul>
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
                        <p className="text-gray-700">アイアンショップ</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">運営責任者</h3>
                        <p className="text-gray-700">代表取締役 鉄工 太郎</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">所在地</h3>
                        <p className="text-gray-700">〒000-0000<br />東京都○○区○○町1-2-3</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">電話番号</h3>
                        <p className="text-gray-700">03-0000-0000</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800 mb-2">メールアドレス</h3>
                        <p className="text-gray-700">info@iron-shop.example.com</p>
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
                        <li>• JR○○線「○○駅」徒歩12分</li>
                        <li>• 地下鉄○○線「○○駅」徒歩8分</li>
                        <li>• バス「○○バス停」徒歩3分</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-blue-800 mb-4 text-lg">お車でお越しの場合</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• ○○高速道路「○○IC」より15分</li>
                        <li>• 駐車場：5台完備（無料）</li>
                        <li>• 大型車両対応可</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded border border-blue-300">
                    <p className="text-sm text-gray-600">
                      <strong>ご来訪の際は事前にお電話でご連絡ください。</strong><br />
                      工場見学・製作相談も承っております。職人が直接ご対応いたします。
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