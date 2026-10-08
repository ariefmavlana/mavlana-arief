import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'

export default function ProjectDetail({ slug }) {
  const project = projects.find((item) => item.id === slug)
  if (!project)
    return (
      <section className="not-found site-container">
        <h1 className="editorial-heading">
          Project
          <br />
          <em>not found.</em>
        </h1>
        <a data-page href="/projects" className="pill-link">
          Explore projects ↗
        </a>
      </section>
    )
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <article className="project-page site-container">
      <div className="project-page-heading">
        <p className="eyebrow">SELECTED WORK / {project.year}</p>
        <h1 className="editorial-heading">{project.title}</h1>
        <span className="eyebrow">{project.stack.join(' / ')}</span>
      </div>
      <div className="project-page-hero">
        <ProjectCard project={project} preview />
      </div>
      <section className="project-overview">
        <h2 className="editorial-heading">
          <em>About</em>
          <br />
          THE PROJECT
        </h2>
        <div>
          <p className="body-lead">{project.summary}</p>
          <dl>
            <div>
              <dt>YEAR</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>TECHNOLOGIES</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>PROJECT</dt>
              <dd>{project.title}</dd>
            </div>
          </dl>
          <a
            className="pill-link"
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            Explore source code <ArrowUpRight size={16} />
          </a>
          {project.liveUrl && (
            <a
              className="pill-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit website <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </section>
      <div className="next-project">
        <span className="eyebrow">NEXT PROJECT</span>
        <a data-page href={`/projects/${next.id}`}>
          {next.title} <ArrowUpRight />
        </a>
      </div>
    </article>
  )
}
