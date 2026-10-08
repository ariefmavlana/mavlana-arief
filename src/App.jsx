import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Contact from './components/sections/Contact'
import SEOHead from './components/seo/SEOHead'
import ProjectDetail from './components/pages/ProjectDetail'
import ContactForm from './components/pages/ContactForm'
import FAQ from './components/sections/FAQ'
import PortfolioGuide from './components/ui/PortfolioGuide'

export default function App() {
  const [motion, setMotion] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [dark, setDark] = useState(false)
  const [quality, setQuality] = useState(() =>
    window.innerWidth < 768 ? 'low' : 'high',
  )
  const [sound, setSound] = useState(false)
  const [entered, setEntered] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(0)
  const [failure, setFailure] = useState('')
  const [path, setPath] = useState(window.location.pathname)
  const audio = useRef(null)
  const guide = useRef(null)
  const markReady = useCallback(() => setReady(true), [])
  const reportError = useCallback((error) => {
    console.error('The 3D experience could not load:', error)
    setFailure(
      'Pengalaman 3D tidak dapat dimuat. Anda tetap bisa menjelajahi portfolio.',
    )
    setReady(true)
  }, [])
  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])
  useEffect(() => {
    const restorePage = () => {
      setPath(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', restorePage)
    return () => window.removeEventListener('popstate', restorePage)
  }, [])
  const navigate = (event) => {
    const link = event.target.closest('a[data-page]')
    if (
      !link ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return
    event.preventDefault()
    window.history.pushState(null, '', link.href)
    setPath(new URL(link.href).pathname)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const toggleSound = async (enabled) => {
    if (enabled) {
      try {
        await audio.current.play()
        setSound(true)
      } catch {
        setSound(false)
        setFailure('Audio tidak tersedia di browser ini.')
      }
    } else {
      audio.current.pause()
      setSound(false)
    }
  }
  const enter = (withAudio) => {
    setEntered(true)
    if (withAudio) toggleSound(true)
  }
  const worldPage = path === '/' || path === '/about' || path === '/contact'
  const view =
    path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'home'
  return (
    <div
      className={`site-shell ${dark ? 'is-dark' : ''} ${motion ? '' : 'motion-paused'} ${!worldPage ? 'content-page' : ''} ${path === '/contact' ? 'contact-page' : ''}`}
      onClick={navigate}
    >
      <SEOHead path={path} />
      <audio ref={audio} src="/experience/main.webm" loop preload="none" />
      {!entered && (
        <div
          className="entry-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Masuk ke portfolio"
        >
          <div className="entry-brand">
            <span className="entry-symbol">ə</span>
            <span>
              ARIEF MAULANA
              <br />
              DESIGN & DEVELOPMENT
            </span>
          </div>
          <p className="entry-message">
            Creating digital experiences
            <br />
            that make you <em>feel.</em>
          </p>
          <div className="entry-controls">
            {ready || !worldPage ? (
              <>
                <button className="glass-button" onClick={() => enter(true)}>
                  Enter with audio <span>↗</span>
                </button>
                <button className="entry-silent" onClick={() => enter(false)}>
                  Enter without audio
                </button>
              </>
            ) : (
              <span className="loading-number" role="status">
                {loading}%
              </span>
            )}
          </div>
          <span className="entry-note">
            FOR THE FULL EXPERIENCE, TURN YOUR SOUND ON
          </span>
          {failure && (
            <p className="experience-error" role="status">
              {failure}
            </p>
          )}
        </div>
      )}
      <div inert={!entered}>
        <a className="skip-link" href="#main">
          Lewati navigasi
        </a>
        <Navbar
          onGuideOpen={() => guide.current.showModal()}
          motion={motion}
          onMotionChange={() => setMotion(!motion)}
          dark={dark}
          onDarkChange={() => setDark(!dark)}
          sound={sound}
          onSoundChange={() => toggleSound(!sound)}
          quality={quality}
          onQualityChange={setQuality}
          path={path}
        />
        <main id="main">
          {worldPage && (
            <Hero
              motion={motion}
              dark={dark}
              quality={quality}
              onProgress={setLoading}
              onReady={markReady}
              onError={reportError}
              failure={failure}
              view={view}
            />
          )}
          {path === '/contact' && <ContactForm />}
          {path === '/' && (
            <>
              <Services />
              <Projects />
              <Skills />
            </>
          )}
          {path === '/about' && (
            <>
              <About />
              <Services />
              <Skills />
              <FAQ />
            </>
          )}
          {path === '/projects' && <Projects catalog />}
          {path.startsWith('/projects/') && (
            <ProjectDetail slug={path.slice('/projects/'.length)} />
          )}
          {!worldPage &&
            path !== '/projects' &&
            !path.startsWith('/projects/') && (
              <section className="not-found site-container">
                <h1 className="editorial-heading">
                  404
                  <br />
                  <em>Lost in thought?</em>
                </h1>
                <a data-page href="/" className="pill-link">
                  Back to home ↗
                </a>
              </section>
            )}
          {path !== '/contact' && <Contact />}
        </main>
        <Footer path={path} />
        <PortfolioGuide dialogRef={guide} />
      </div>
    </div>
  )
}
