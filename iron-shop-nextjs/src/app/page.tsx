import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Header />
      <Hero />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </>
  )
}