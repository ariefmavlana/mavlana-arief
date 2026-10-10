import { heroSlides } from '../../data/heroSlides'
import { useLanguage } from '../../utils/language'
import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { tourState } from '../../utils/tour'
const ExperienceWorld = lazy(() => import('../experience/ExperienceWorld'))

gsap.registerPlugin(ScrollTrigger)

export default function Hero({
  motion,
  dark,
  quality,
  onProgress,
  onReady,
  onError,
  failure,
  view,
  ready,
  loading,
}) {
  const { language, t } = useLanguage()
  const section = useRef(null)
  const progress = useRef(0)
  const pageSlides = heroSlides[language][view]
  useEffect(() => {
    const root = section.current
    const panels = root.querySelectorAll('.hero-panel')
    const arrival = { opacity: motion ? 0 : 1 }
    const update = () => {
      const state = tourState(progress.current, panels.length)
      root.style.setProperty('--tour-outro', motion ? state.outro : 0)
      panels.forEach((panel, i) => {
        const active = i === state.index
        panel.classList.toggle('is-active', active)
        panel.style.opacity = active
          ? motion
            ? state.opacity * arrival.opacity
            : 1
          : 0
        panel.style.transform = motion
          ? `translateY(${(i - state.chapter) * 30}px)`
          : 'none'
        panel.inert = !active
        panel.setAttribute('aria-hidden', !active)
      })
    }
    if (view === 'contact') return
    const reveal = gsap.to(arrival, {
      opacity: 1,
      duration: motion ? 1.2 : 0,
      onUpdate: update,
    })
    const tween = gsap.fromTo(
      progress,
      { current: 0 },
      {
        current: 1,
        ease: 'none',
        onUpdate: update,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: motion ? 0.65 : true,
        },
      },
    )
    update()
    return () => {
      tween.scrollTrigger.kill()
      tween.kill()
      reveal.kill()
    }
  }, [view, motion])
  return (
    <section
      id="home"
      ref={section}
      className={`experience experience-${view}`}
      aria-label={t('Dunia kreatif Arief Maulana')}
    >
      <div className="experience-stage">
        <Suspense fallback={<div className="world-canvas" />}>
          <ExperienceWorld
            progress={progress}
            dark={dark}
            motion={motion}
            quality={quality}
            onProgress={onProgress}
            onReady={onReady}
            onError={onError}
            view={view}
            ready={ready}
            chapters={pageSlides.length}
          />
        </Suspense>
        {!ready && !failure && (
          <p className="scene-loading eyebrow" role="status">
            {language === 'id' ? 'Memuat pemandangan' : 'Loading the scene'} ·{' '}
            {loading}%
          </p>
        )}
        {failure && (
          <p className="experience-error" role="status">
            {failure}
          </p>
        )}
        {pageSlides.map((slide, i) => (
          <div
            key={`${view}-${i}`}
            className={`hero-panel hero-panel-${i + 1} ${i === 0 ? 'is-active' : ''}`}
            aria-hidden={i !== 0}
            inert={i !== 0}
          >
            <div className="hero-content">
              {i > 0 && (
                <p className="hero-topic eyebrow">
                  {slide.caption.split('\n')[0]}
                </p>
              )}
              <p className="hero-caption eyebrow">
                {i === 0
                  ? slide.caption
                  : slide.caption.split('\n').slice(1).join('\n')}
              </p>
              {i === 0 ? (
                <h1 className="hero-heading">
                  <em>{slide.lead}</em>
                  <span>{slide.lines}</span>
                </h1>
              ) : (
                <h2 className="hero-heading">
                  <em>{slide.lead}</em>
                  <span>{slide.lines}</span>
                </h2>
              )}
            </div>
          </div>
        ))}
        {view !== 'contact' && <div className="tour-exit" aria-hidden="true" />}
      </div>
    </section>
  )
}
