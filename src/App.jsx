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
import { LanguageContext, translators } from './utils/language'
import { readPreference, savePreference } from './utils/preferences'

export default function App() {
  const [motion, setMotion] = useState(
    () =>
      readPreference(
        'motion',
        ['on', 'off'],
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'off'
          : 'on',
      ) === 'on',
  )
  const [dark, setDark] = useState(
    () =>
      readPreference(
        'theme',
        ['light', 'dark'],
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      ) === 'dark',
  )
  const [language, setLanguage] = useState(() =>
    readPreference('language', ['id', 'en'], 'id'),
  )
  const t = translators[language]
  useEffect(() => {
    document.documentElement.lang = language
    savePreference('language', language)
  }, [language])
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]').content = dark
      ? '#121212'
      : '#f5efff'
    savePreference('theme', dark ? 'dark' : 'light')
  }, [dark])
  const [quality, setQuality] = useState(() =>
    readPreference(
      'quality',
      ['low', 'high'],
      window.innerWidth < 768 ? 'low' : 'high',
    ),
  )
  useEffect(() => savePreference('motion', motion ? 'on' : 'off'), [motion])
  useEffect(() => savePreference('quality', quality), [quality])
  const [sound, setSound] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(0)
  const [failure, setFailure] = useState('')
  const [path, setPath] = useState(window.location.pathname)
  const audio = useRef(null)
  const guide = useRef(null)
  const markReady = useCallback(() => setReady(true), [])
  const reportError = useCallback((error) => {
    console.error('The 3D experience could not load:', error)
    setFailure('sceneError')
    setReady(true)
  }, [])
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
        setFailure('audioError')
      }
    } else {
      audio.current.pause()
      setSound(false)
    }
  }
  const worldPage = path === '/' || path === '/about' || path === '/contact'
  const view =
    path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'home'
  return (
    <LanguageContext value={{ language, setLanguage, t }}>
      <div
        className={`site-shell ${dark ? 'is-dark' : ''} ${motion ? '' : 'motion-paused'} ${!worldPage ? 'content-page' : ''} ${path === '/contact' ? 'contact-page' : ''}`}
        onClick={navigate}
      >
        <SEOHead path={path} />
        <audio ref={audio} src="/experience/main.webm" loop preload="none" />
        <div>
          <a className="skip-link" href="#main">
            {t('Lewati navigasi')}
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
                failure={failure ? t(failure) : ''}
                view={view}
                ready={ready}
                loading={loading}
              />
            )}
            {path === '/contact' && <ContactForm />}
            {path === '/' && (
              <>
                <Projects />
                <About />
                <Skills />
                <ContactForm embedded />
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
                    <em>{t('Lost in thought?')}</em>
                  </h1>
                  <a data-page href="/" className="pill-link">
                    {t('Back to home ↗')}
                  </a>
                </section>
              )}
            {path !== '/contact' && path !== '/' && <Contact />}
          </main>
          <Footer path={path} />
          <PortfolioGuide dialogRef={guide} />
        </div>
      </div>
    </LanguageContext>
  )
}
