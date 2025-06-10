const StructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "アイアンショップ",
    "description": "職人の技が光る、こだわりのアイアン製品をお届けします",
    "url": "https://iron-shop-nextjs.vercel.app",
    "logo": "https://iron-shop-nextjs.vercel.app/images/hero.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "03-0000-0000",
      "contactType": "customer service",
      "availableLanguage": "Japanese"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressRegion": "東京都",
      "addressLocality": "○○区",
      "streetAddress": "○○1-1-1",
      "postalCode": "000-0000"
    },
    "openingHours": "Mo-Fr 09:00-18:00"
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "アイアン製品製造・販売",
    "description": "オーダーメイドアイアン製品の設計・製造・販売",
    "provider": {
      "@type": "Organization",
      "name": "アイアンショップ"
    },
    "serviceType": "Manufacturing",
    "areaServed": "Japan"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData),
        }}
      />
    </>
  )
}

export default StructuredData