export const SITE_CONFIG = {
  name: 'アイアンショップ Example',
  description: '職人の技が光る、こだわりのアイアン製品をお届けします',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iron-shop-nextjs-example.vercel.app',
  ogImage: '/images/hero.jpg',
  contact: {
    email: 'info@example-ironshop.com',
    phone: '03-1234-5678',
    address: '〒100-0001 東京都千代田区千代田1-1-1 エグザンプルビル3F',
  },
  business: {
    hours: '平日: 9:00 - 18:00',
    closed: '土日祝: 休業',
  },
} as const

export const SEO_DEFAULTS = {
  title: 'アイアンショップ Example - 高品質なアイアン製品',
  description: '職人の技が光る、こだわりのアイアン製品をお届けします。アンティーク調からモダンまで、幅広いデザインをご提供。',
  keywords: 'アイアン,鉄製品,インテリア,家具,アンティーク,インダストリアル,鉄工所,オーダーメイド',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_CONFIG.name,
  },
} as const