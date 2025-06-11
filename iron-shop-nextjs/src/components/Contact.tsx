'use client'

import React, { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useNeuroOptimization, useNeuroElement } from '@/hooks/useNeuroOptimization'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormMessage {
  text: string
  type: 'success' | 'error'
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<FormMessage | null>(null)
  
  // Neuro-optimization hooks
  const { neuroState, triggerAttentionGrab, optimizeForConversion } = useNeuroOptimization()
  const { getOptimalProps: getCtaProps } = useNeuroElement('cta')
  const { getOptimalProps: getTrustProps } = useNeuroElement('trust')
  const { getOptimalProps: getFocusProps } = useNeuroElement('focus')

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      setMessage({
        text: 'すべての項目を入力してください。',
        type: 'error'
      })
      return
    }
    
    if (!isValidEmail(formData.email)) {
      setMessage({
        text: '有効なメールアドレスを入力してください。',
        type: 'error'
      })
      return
    }
    
    setIsSubmitting(true)
    setMessage(null)
    
    // ダミーの送信処理
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage({
        text: 'お問い合わせありがとうございます。後日担当者からご連絡いたします。',
        type: 'success'
      })
      
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setMessage({
        text: '送信中にエラーが発生しました。しばらく後に再度お試しください。',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
    
    // メッセージを5秒後に削除
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )} {...getFocusProps()}>
          <div className="inline-block">
            <h2 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              お問い合わせ
            </h2>
            <div className="h-1 w-24 mx-auto bg-blue-600 rounded-full shadow-lg" />
          </div>
          <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
            オーダーメイドアイアン製品に関するご相談、お見積もりなど
            <span className="text-blue-600 font-semibold">お気軽にお問い合わせ</span>
            ください
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card variant="premium" className={cn(
            'p-8 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <div className="absolute inset-0 bg-white rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                メールでのお問い合わせ
              </h3>
              
              {message && (
                <div
                  className={`p-4 rounded-xl mb-6 font-medium transition-all duration-300 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}
          
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="お名前を入力してください"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="メールアドレスを入力してください"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical bg-white"
                    placeholder="お問い合わせ内容を詳しく入力してください"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full mt-8 relative overflow-hidden",
                    !neuroState.isHighEngagement && "animate-neuro-pulse trust-badge"
                  )}
                  {...getCtaProps()}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      送信中...
                    </>
                  ) : (
                    '送信する'
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact Information */}
          <div className={cn(
            'space-y-8 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            {/* Business Hours with Trust Signals */}
            <Card variant="premium" className="p-8" {...getTrustProps()}>
              <div className="absolute inset-0 bg-blue-50 rounded-3xl" />
              <div className="relative z-10">
                {/* Trust indicator */}
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  認定工房
                </div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">営業時間</h3>
                </div>
                <div className="space-y-3 text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-medium">平日</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">土曜日</span>
                    <span>9:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">日曜・祝日</span>
                    <span className="text-red-600">定休日</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Response Time with Urgency Trigger */}
            <Card variant="premium" className="p-8 relative">
              <div className="absolute inset-0 bg-emerald-50 rounded-3xl" />
              {/* Urgency indicator */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold urgency-pulse">
                本日中に返信保証
              </div>
              <div className="relative z-10 pt-4">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">お返事について</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  お問い合わせいただいた内容については、
                  <span className="text-emerald-600 font-semibold bg-emerald-100 px-2 py-1 rounded-md">営業日48時間以内</span>
                  にご返答させていただきます。
                  <span className="block mt-2 text-red-600 font-medium">緊急案件は24時間以内に対応</span>
                </p>
              </div>
            </Card>

            {/* Consultation with Social Proof */}
            <Card variant="premium" className="p-8 relative">
              <div className="absolute inset-0 bg-amber-50 rounded-3xl" />
              {/* Social proof indicator */}
              <div className="absolute -top-2 right-4 flex items-center bg-white rounded-full px-3 py-1 shadow-lg border">
                <div className="flex -space-x-1 mr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">1,200+ 実績</span>
              </div>
              <div className="relative z-10 pt-4">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">無料相談</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  デザインのご相談から製作まで、
                  <span className="text-amber-600 font-semibold bg-amber-100 px-2 py-1 rounded-md">創業40年の経験豊富な職人</span>
                  がサポートいたします。
                  <span className="block mt-2 text-emerald-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    相談料完全無料・見積もり無料
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

Contact.displayName = 'Contact'

export default Contact