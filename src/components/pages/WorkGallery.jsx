import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react'
import { projects } from '../../data/projects'
import { useLanguage } from '../../utils/language'
import ProjectArtwork from '../ui/ProjectArtwork'
import '../../gallery.css'

const categories = ['All', 'Web', 'Machine learning', 'Open source']

export default function WorkGallery() {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const gesture = useRef(null)
  const dragged = useRef(false)
  const filterButton = useRef(null)
  const filterOptions = useRef(null)
  const stage = useRef(null)
  useEffect(() => {
    if (filtersOpen)
      filterOptions.current.querySelector('[aria-pressed="true"]').focus()
  }, [filtersOpen])
  const visible = projects.filter(
    (project) =>
      filter === 'All' ||
      (filter === 'Web' && !['healthcare', 'mjs'].includes(project.id)) ||
      (filter === 'Machine learning' && project.id === 'healthcare') ||
      (filter === 'Open source' && project.id === 'mjs'),
  )
  const selected = visible[active]
  useEffect(() => {
    const element = stage.current
    let distance = 0
    let lastWheel = 0
    let lastStep = 0
    const scrollGallery = (event) => {
      if (event.ctrlKey || event.metaKey || visible.length < 2) return
      event.preventDefault()
      const now = performance.now()
      if (now - lastWheel > 150) distance = 0
      lastWheel = now
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
      distance +=
        delta *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientHeight
            : 1)
      if (Math.abs(distance) < 45 || now - lastStep < 250) return
      const step = Math.sign(distance)
      setActive((index) => (index + step + visible.length) % visible.length)
      distance = 0
      lastStep = now
    }
    element.addEventListener('wheel', scrollGallery, { passive: false })
    return () => element.removeEventListener('wheel', scrollGallery)
  }, [visible.length])
  const move = (step) =>
    setActive((index) => (index + step + visible.length) % visible.length)
  const cards = visible.map((project, index) => ({
    project,
    index,
    offset:
      ((index - active + visible.length + Math.floor(visible.length / 2)) %
        visible.length) -
      Math.floor(visible.length / 2),
  }))
  const previousLabel =
    language === 'id' ? 'Proyek sebelumnya' : 'Previous project'
  const nextLabel = language === 'id' ? 'Proyek berikutnya' : 'Next project'

  return (
    <section className="work-gallery" aria-label={t('Work')}>
      <h1 className="gallery-heading">
        {t('Work')}
        <span> / {String(projects.length).padStart(2, '0')}</span>
      </h1>
      <div className="gallery-ceiling" aria-hidden="true" />
      <div className="gallery-floor" aria-hidden="true" />
      <div
        ref={stage}
        className="gallery-stage"
        tabIndex={0}
        role="group"
        aria-label={
          language === 'id'
            ? 'Galeri proyek. Gunakan panah kiri dan kanan, atau geser.'
            : 'Project gallery. Use left and right arrows, or swipe.'
        }
        onKeyDown={(event) => {
          dragged.current = false
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            event.currentTarget.focus({ preventScroll: true })
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
          if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            event.currentTarget.focus({ preventScroll: true })
            setActive(event.key === 'Home' ? 0 : visible.length - 1)
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          dragged.current = false
          gesture.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          if (!gesture.current) return
          const dx = event.clientX - gesture.current.x
          const dy = event.clientY - gesture.current.y
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            dragged.current = true
            move(dx < 0 ? 1 : -1)
          }
          gesture.current = null
        }}
        onPointerCancel={() => {
          gesture.current = null
        }}
      >
        {cards.map(({ project, index, offset }) => {
          const Card = offset === 0 ? 'a' : 'button'
          return (
            <div
              className={`gallery-card project-${project.id} ${offset === 0 ? 'is-selected' : ''}`}
              key={project.id}
              style={{ '--offset': offset, '--distance': Math.abs(offset) }}
            >
              <Card
                className="gallery-card-front project-visual"
                href={offset === 0 ? `/projects/${project.id}` : undefined}
                data-page={offset === 0 ? true : undefined}
                draggable={false}
                tabIndex={offset === 0 ? 0 : -1}
                aria-label={`${offset === 0 ? t('View project') : language === 'id' ? 'Pilih proyek' : 'Select project'}: ${project.title}`}
                onClick={(event) => {
                  if (dragged.current) {
                    event.preventDefault()
                    event.stopPropagation()
                    return
                  }
                  if (offset !== 0) setActive(index)
                }}
              >
                <ProjectArtwork project={project} />
                <span className="gallery-card-name">{project.title}</span>
              </Card>
              <div className="gallery-reflection" aria-hidden="true">
                <div className="project-visual">
                  <ProjectArtwork project={project} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="gallery-details" aria-live="polite" aria-atomic="true">
        <p className="eyebrow">
          {selected.stack.join(' / ')} · {selected.year}
        </p>
        <a data-page href={`/projects/${selected.id}`}>
          {selected.title}
          <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="gallery-controls">
        <div
          className="gallery-filter"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFiltersOpen(false)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setFiltersOpen(false)
              filterButton.current.focus()
            }
          }}
        >
          {filtersOpen && (
            <div
              ref={filterOptions}
              id="gallery-filters"
              className="gallery-filter-options"
              role="group"
              aria-label={t('Filter proyek')}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  onClick={() => {
                    setFilter(category)
                    setActive(0)
                    setFiltersOpen(false)
                    filterButton.current.focus()
                  }}
                >
                  {t(category)}
                </button>
              ))}
            </div>
          )}
          <button
            ref={filterButton}
            className="gallery-filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls={filtersOpen ? 'gallery-filters' : undefined}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            {filter === 'All' ? 'Filter' : t(filter)}
            <SlidersHorizontal size={16} />
          </button>
        </div>
        <nav
          className="gallery-navigation"
          aria-label={
            language === 'id' ? 'Navigasi proyek' : 'Projects navigation'
          }
        >
          <button
            onClick={() => move(-1)}
            aria-label={previousLabel}
            disabled={visible.length === 1}
          >
            <ArrowLeft size={17} />
          </button>
          <span>{String(active + 1).padStart(2, '0')}</span>
          <div className="gallery-ticks">
            {visible.map((project, index) => (
              <button
                key={project.id}
                aria-label={project.title}
                aria-current={active === index ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <span>{String(visible.length).padStart(2, '0')}</span>
          <button
            onClick={() => move(1)}
            aria-label={nextLabel}
            disabled={visible.length === 1}
          >
            <ArrowRight size={17} />
          </button>
        </nav>
      </div>
    </section>
  )
}
