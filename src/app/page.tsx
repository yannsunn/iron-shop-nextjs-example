import Header from '../components/Header'
import Hero from '../components/Hero'
import Products from '../components/Products'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import StructuredData from '../components/StructuredData'
import NeuroOptimizer from '../components/NeuroOptimizer'
import DisclaimerBanner from '../components/DisclaimerBanner'

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <NeuroOptimizer>
        <div className="hidden" />
      </NeuroOptimizer>
      <DisclaimerBanner />
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}