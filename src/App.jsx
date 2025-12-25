import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Skills from "./components/sections/Skills"
import Services from "./components/sections/Services"
import Projects from "./components/sections/Projects"
import Contact from "./components/sections/Contact"
import AnimatedBackground from "./components/backgrounds/AnimatedBackground"

const App = () => {
  return (
    <div className='min-h-screen bg-black relative'>
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App