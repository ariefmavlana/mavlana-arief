import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { PERSONAL_INFO } from '../../utils/constants'
import ProjectCard from '../ui/ProjectCard'
import { useState } from 'react'

const Projects = ({ catalog = false }) => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('All')
  const Heading = catalog ? 'h1' : 'h2'
  const visible = projects.filter(
    (project) =>
      filter === 'All' ||
      (filter === 'Web' && !['healthcare', 'mjs'].includes(project.id)) ||
      (filter === 'Machine learning' && project.id === 'healthcare') ||
      (filter === 'Open source' && project.id === 'mjs'),
  )
  return (
    <section
      id="projects"
      className={`section-shell projects-section ${catalog ? 'projects-catalog' : ''}`}
    >
      <div className="site-container">
        <div className="section-topline">
          <p className="eyebrow">
            {t('SELECTED WORK /')} {projects.length.toString().padStart(2, '0')}{' '}
            {t('PROJECTS')}
          </p>
          <span className="eyebrow">{t('03 / KARYA')}</span>
        </div>
        <div className="projects-heading">
          <Heading className="editorial-heading">
            {t('SOME')}
            <br />
            <em>{t('of my projects')}</em> <span className="violet">⟶</span>
          </Heading>
          <p className="eyebrow">
            {t('EKSPLORASI DI PERTEMUAN')}
            <br />
            {t('DESAIN, TEKNOLOGI, DAN IDE.')}
          </p>
        </div>
        {catalog && (
          <div className="project-filters" aria-label={t('Filter proyek')}>
            {['All', 'Web', 'Machine learning', 'Open source'].map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                aria-pressed={value === filter}
              >
                {t(value)}
              </button>
            ))}
          </div>
        )}
        <div className="projects-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="projects-end">
          <span className="eyebrow">
            {t('IDE BERIKUTNYA BISA JADI MILIK ANDA.')}
          </span>
          <a
            className="pill-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
          >
            {t('Semua repositori')}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
