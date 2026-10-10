import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { PERSONAL_INFO } from '../../utils/constants'
import ProjectCard from '../ui/ProjectCard'

const Projects = () => {
  const { t } = useLanguage()
  return (
    <section id="projects" className="section-shell projects-section">
      <div className="site-container">
        <div className="section-topline">
          <p className="eyebrow">
            {t('SELECTED WORK /')} {projects.length.toString().padStart(2, '0')}{' '}
            {t('PROJECTS')}
          </p>
          <span className="eyebrow">{t('03 / KARYA')}</span>
        </div>
        <div className="projects-heading">
          <h2 className="editorial-heading">
            {t('SOME')}
            <br />
            <em>{t('of my projects')}</em> <span className="violet">⟶</span>
          </h2>
          <p className="eyebrow">
            {t('EKSPLORASI DI PERTEMUAN')}
            <br />
            {t('DESAIN, TEKNOLOGI, DAN IDE.')}
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
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
