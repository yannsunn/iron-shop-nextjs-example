import Header from '../components/Header'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Gallery from '../components/Gallery'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import StructuredData from '../components/StructuredData'
import NeuroOptimizer from '../components/NeuroOptimizer'

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <NeuroOptimizer>
        <div className="hidden" />
      </NeuroOptimizer>
      <Header />
      <main>
        <Hero />
        <Products />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}