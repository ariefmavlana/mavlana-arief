import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const ExperienceWorld = lazy(() => import('../experience/ExperienceWorld'))

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    lead: 'Where',
    lines: (
      <>
        AMBITIOUS IDEAS
        <br />
        BECOME INTERFACES
        <br />
        PEOPLE REMEMBER
      </>
    ),
    caption: (
      <>
        FULL-STACK DEVELOPMENT AND DIGITAL
        <br />
        EXPERIENCES FOR IDEAS THAT MATTER
      </>
    ),
  },
  {
    lead: 'Beyond',
    lines: (
      <>
        THE ORDINARY.
        <br />
        INTO THE
        <br />
        EXTRAORDINARY.
      </>
    ),
    caption: (
      <>
        A THOUGHTFUL BALANCE OF
        <br />
        CREATIVE THINKING AND
        <br />
        TECHNICAL PRECISION.
      </>
    ),
  },
  {
    lead: 'Made',
    lines: (
      <>
        TO CONNECT.
        <br />
        DESIGNED
        <br />
        TO INSPIRE.
      </>
    ),
    caption: (
      <>
        EACH DETAIL HAS A PURPOSE.
        <br />
        EVERY INTERACTION
        <br />
        TELLS A STORY.
      </>
    ),
  },
  {
    lead: 'With',
    lines: (
      <>
        CURIOSITY.
        <br />
        CRAFT.
        <br />
        AND FEELING.
      </>
    ),
    caption: (
      <>
        BECAUSE THE BEST EXPERIENCES
        <br />
        ARE THE ONES THAT
        <br />
        MAKE US FEEL SOMETHING.
      </>
    ),
  },
  {
    lead: 'Let’s',
    lines: (
      <>
        MAKE
        <br />
        SOMETHING
        <br />
        MEANINGFUL.
      </>
    ),
    caption: (
      <>
        YOUR VISION. MY CRAFT.
        <br />A NEW POSSIBILITY
        <br />
        WAITING TO HAPPEN.
      </>
    ),
  },
]
const aboutSlides = [
  {
    lead: 'A little',
    lines: (
      <>
        ABOUT THE PERSON
        <br />
        BEHIND THE
        <br />
        EXPERIENCE.
      </>
    ),
    caption: (
      <>
        ARIEF MAULANA / BANDUNG, INDONESIA
        <br />
        FULL-STACK DEVELOPER & CREATIVE THINKER
      </>
    ),
  },
  {
    lead: 'Built',
    lines: (
      <>
        WITH CURIOSITY.
        <br />
        CRAFTED
        <br />
        WITH CARE.
      </>
    ),
    caption: (
      <>
        FROM UNDERSTANDING THE PROBLEM
        <br />
        TO MAKING EVERY DETAIL WORK.
      </>
    ),
  },
  {
    lead: 'Always',
    lines: (
      <>
        EXPLORING.
        <br />
        LEARNING.
        <br />
        CREATING.
      </>
    ),
    caption: (
      <>
        WEB DEVELOPMENT, MACHINE LEARNING,
        <br />
        AND NEW WAYS TO CONNECT IDEAS.
      </>
    ),
  },
]
const contactSlides = [
  {
    lead: 'Let’s',
    lines: (
      <>
        BUILD SOMETHING
        <br />
        MEANINGFUL.
      </>
    ),
    caption: (
      <>
        HAVE AN IDEA, A PRODUCT, OR A VISION?
        <br />
        LET’S TALK ABOUT WHAT COMES NEXT.
      </>
    ),
  },
]

export default function Hero({
  motion,
  dark,
  quality,
  onProgress,
  onReady,
  onError,
  failure,
  view,
}) {
  const section = useRef(null)
  const progress = useRef(0)
  const pageSlides =
    view === 'about' ? aboutSlides : view === 'contact' ? contactSlides : slides
  useEffect(() => {
    const root = section.current
    progress.current = 0
    const panels = root.querySelectorAll('.hero-panel')
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progress.current = self.progress
        const active = Math.min(
          panels.length - 1,
          Math.floor(self.progress * panels.length),
        )
        panels.forEach((panel, i) => {
          panel.classList.toggle('is-active', i === active)
          panel.inert = i !== active
          panel.setAttribute('aria-hidden', i !== active)
        })
      },
    })
    return () => trigger.kill()
  }, [view])
  return (
    <section
      id="home"
      ref={section}
      className={`experience experience-${view}`}
      aria-label="Dunia kreatif Arief Maulana"
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
          />
        </Suspense>
        {failure && (
          <p className="experience-error" role="status">
            {failure}
          </p>
        )}
        {pageSlides.map((slide, i) => (
          <div
            key={slide.lead}
            className={`hero-panel hero-panel-${i + 1} ${i === 0 ? 'is-active' : ''}`}
            aria-hidden={i !== 0}
            inert={i !== 0}
          >
            <div className="hero-content">
              <p className="hero-caption eyebrow">{slide.caption}</p>
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
      </div>
    </section>
  )
}
