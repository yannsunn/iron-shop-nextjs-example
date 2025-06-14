export const SITE_CONFIG = {
  name: 'アイアンショップ',
  description: '職人の技が光る、こだわりのアイアン製品をお届けします',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iron-shop-nextjs.vercel.app',
  ogImage: '/images/hero.jpg',
  contact: {
    email: 'info@ironshop.com',
    phone: '03-0000-0000',
    address: '〒000-0000 東京都○○区○○1-1-1',
  },
  business: {
    hours: '平日: 9:00 - 18:00',
    closed: '土日祝: 休業',
  },
} as const

export const SEO_DEFAULTS = {
  title: 'アイアンショップ - 高品質なアイアン製品',
  description: '職人の技が光る、こだわりのアイアン製品をお届けします。アンティーク調からモダンまで、幅広いデザインをご提供。',
  keywords: 'アイアン,鉄製品,インテリア,家具,アンティーク,インダストリアル,鉄工所,オーダーメイド',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_CONFIG.name,
  },
} as const