import {
  ArrowUpRight,
  CarFront,
  Code2,
  ChartNoAxesCombined,
} from 'lucide-react'

const projectImages = {
  weather: '/projects/weather.png',
  coin: '/projects/coin.png',
  healthcare: '/projects/healthcare.png',
}
const projectIcons = {
  'car-dealer': CarFront,
  accounting: ChartNoAxesCombined,
  mjs: Code2,
}

const ProjectCard = ({ project, preview = false }) => {
  const Icon = projectIcons[project.id]
  const Visual = preview ? 'div' : 'a'
  const link = preview
    ? {}
    : {
        'data-page': true,
        href: `/projects/${project.id}`,
        'aria-label': `Lihat ${project.title}`,
      }
  return (
    <article className={`project-card project-${project.id}`}>
      <Visual className="project-visual" {...link}>
        <span className="project-index">PRJCT / {project.number}</span>
        {projectImages[project.id] ? (
          <>
            <img
              src={projectImages[project.id]}
              alt={`Ilustrasi konsep ${project.title}`}
              loading="lazy"
              width="1000"
              height="1000"
            />
            <span className="project-visual-caption">Ilustrasi konsep</span>
          </>
        ) : (
          <div className="project-art">
            <Icon strokeWidth={0.7} />
            <span>
              {project.id === 'car-dealer'
                ? 'DRIVE THE NEXT.'
                : project.id === 'accounting'
                  ? 'Make numbers matter.'
                  : 'Always learning.'}
            </span>
            <small>{project.stack.join(' / ')}</small>
          </div>
        )}
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
      <p className="project-summary">{project.summary}</p>
      <div className="project-links">
        <a href={project.repository} target="_blank" rel="noreferrer">
          Lihat kode <ArrowUpRight size={13} />
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
            Coba aplikasi <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
