import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Experience from "./components/sections/Experience"
import Skills from "./components/sections/Skills"
import Services from "./components/sections/Services"
import Projects from "./components/sections/Projects"
import Testimonials from "./components/sections/Testimonials"
import Contact from "./components/sections/Contact"
import AnimatedBackground from "./components/backgrounds/AnimatedBackground"

const App = () => {
  return (
    <div className='min-h-screen bg-black relative overflow-x-hidden selection:bg-blue-500/30 selection:text-cyan-300'>
      <AnimatedBackground />
      <div className="relative z-10 w-full overflow-x-hidden">
        <Navbar />

        <main className="w-full overflow-x-hidden">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Services />
          <Projects />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App