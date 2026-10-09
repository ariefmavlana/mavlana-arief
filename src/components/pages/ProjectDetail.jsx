import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'

export default function ProjectDetail({ slug }) {
  const { t } = useLanguage()
  const project = projects.find((item) => item.id === slug)
  if (!project)
    return (
      <section className="not-found site-container">
        <h1 className="editorial-heading">
          {t('Project')}
          <br />
          <em>{t('not found.')}</em>
        </h1>
        <a data-page href="/projects" className="pill-link">
          {t('Explore projects ↗')}
        </a>
      </section>
    )
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <article className="project-page site-container">
      <div className="project-page-heading">
        <p className="eyebrow">
          {t('SELECTED WORK /')} {project.year}
        </p>
        <h1 className="editorial-heading">{project.title}</h1>
        <span className="eyebrow">{project.stack.join(' / ')}</span>
      </div>
      <div className="project-page-hero">
        <ProjectCard project={project} preview />
      </div>
      <section className="project-overview">
        <h2 className="editorial-heading">
          <em>{t('About')}</em>
          <br />
          {t('THE PROJECT')}
        </h2>
        <div>
          <p className="body-lead">{t(project.summary)}</p>
          <dl>
            <div>
              <dt>{t('YEAR')}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>{t('TECHNOLOGIES')}</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>{t('PROJECT')}</dt>
              <dd>{project.title}</dd>
            </div>
          </dl>
          <a
            className="pill-link"
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            {t('Explore source code')}
            <ArrowUpRight size={16} />
          </a>
          {project.liveUrl && (
            <a
              className="pill-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('Visit website')}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </section>
      <div className="next-project">
        <span className="eyebrow">{t('NEXT PROJECT')}</span>
        <a data-page href={`/projects/${next.id}`}>
          {next.title} <ArrowUpRight />
        </a>
      </div>
    </article>
  )
}
