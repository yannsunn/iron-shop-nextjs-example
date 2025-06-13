import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'アイアンショップ - 高品質なアイアン製品',
  description: '職人の技が光る、こだわりのアイアン製品をお届けします。アンティーク調からモダンまで、幅広いデザインをご提供。',
  keywords: 'アイアン,鉄製品,インテリア,家具,アンティーク,インダストリアル,鉄工所,オーダーメイド',
  authors: [{ name: 'アイアンショップ' }],
  openGraph: {
    title: 'アイアンショップ - 高品質なアイアン製品',
    description: '職人の技が光る、こだわりのアイアン製品をお届けします。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'アイアンショップ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アイアンショップ - 高品質なアイアン製品',
    description: '職人の技が光る、こだわりのアイアン製品をお届けします。',
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

import { AppProvider } from '@/context/AppContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className="font-sans leading-relaxed text-gray-800 antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}