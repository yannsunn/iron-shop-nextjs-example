import type { Metadata } from 'next'
import './globals.css'
import SecurityFeatures from '@/components/SecurityFeatures'

export const metadata: Metadata = {
  title: 'Vintage Iron Works Example - ヴィンテージアイアン製品（サンプル）',
  description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。オーダーメイドの美しさと品質をお届けします。※これはサンプルサイトです。',
  keywords: 'ヴィンテージ,アイアン,鉄製品,インテリア,家具,アンティーク,インダストリアル,オーダーメイド,溶接,サンプル,ポートフォリオ',
  authors: [{ name: 'Vintage Iron Works Example' }],
  openGraph: {
    title: 'Vintage Iron Works Example - ヴィンテージアイアン製品（サンプル）',
    description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。※これはサンプルサイトです。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Vintage Iron Works Example',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vintage Iron Works Example - ヴィンテージアイアン製品（サンプル）',
    description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。※これはサンプルサイトです。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head />
      <body className="font-sans leading-relaxed text-gray-800 antialiased">
        <SecurityFeatures />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}