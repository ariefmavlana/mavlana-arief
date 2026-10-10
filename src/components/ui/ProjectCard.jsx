import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'
import ProjectArtwork from './ProjectArtwork'

const ProjectCard = ({ project, preview = false }) => {
  const { t } = useLanguage()
  const Visual = preview ? 'div' : 'a'
  const link = preview
    ? {}
    : {
        'data-page': true,
        href: `/projects/${project.id}`,
        'aria-label': `${t('View project')}: ${project.title}`,
      }
  return (
    <article className={`project-card project-${project.id}`}>
      <Visual className="project-visual" {...link}>
        <span className="project-index">
          {t('PROJECT')} / {project.number}
        </span>
        <ProjectArtwork project={project} />
        <span className="project-open">
          <ArrowUpRight size={26} />
        </span>
      </Visual>
      <div className="project-meta">
        <span>{project.stack.join(' / ')}</span>
        <span>{project.year}</span>
      </div>
      <div className="project-title-row">
        <h3>{project.title}</h3>
        <ArrowUpRight size={24} />
      </div>
      <p className="project-summary">{t(project.summary)}</p>
      <div className="project-links">
        <a href={project.repository} target="_blank" rel="noreferrer">
          {t('Lihat kode')}
          <ArrowUpRight size={13} />
        </a>
        {project.secondaryRepository && (
          <a
            href={project.secondaryRepository}
            target="_blank"
            rel="noreferrer"
          >
            Backend <ArrowUpRight size={13} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            {t('Coba aplikasi')}
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
