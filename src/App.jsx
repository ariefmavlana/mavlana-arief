import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import GitHubActivity from './components/sections/GitHubActivity'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Contact from './components/sections/Contact'
import SEOHead from './components/seo/SEOHead'

const App = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#08101f] text-white selection:bg-sky-200 selection:text-slate-950">
    <SEOHead />
    <Navbar />
    <main>
      <Hero />
      <About />
      <GitHubActivity />
      <Projects />
      <Skills />
      <Services />
      <Contact />
    </main>
    <Footer />
  </div>
)

export default App
