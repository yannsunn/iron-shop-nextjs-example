import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import NeuroOptimizer from '@/components/NeuroOptimizer'
import NeuroFloatingElements from '@/components/NeuroFloatingElements'
import NeuroAnalyticsDashboard from '@/components/NeuroAnalyticsDashboard'

export default function Home() {
  return (
    <NeuroOptimizer enableDebug={process.env.NODE_ENV === 'development'}>
      <StructuredData />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Gallery />
        <About />
        <Contact />
        <Footer />
      </main>
      <NeuroFloatingElements />
      <NeuroAnalyticsDashboard />
    </NeuroOptimizer>
  )
}