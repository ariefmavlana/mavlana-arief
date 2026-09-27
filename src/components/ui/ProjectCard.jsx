import { ArrowUpRight, Github } from 'lucide-react'

const ProjectCard = ({ project }) => (
  <article className="project-card group">
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-sky-200/80">{project.number} / {project.year}</p>
        <p className="mt-3 text-sm text-slate-400">{project.type}</p>
      </div>
      <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Buka repositori ${project.title} di GitHub`} className="icon-link"><Github className="size-4" /></a>
    </div>
    <div className="flex grow flex-col py-6">
      <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{project.summary}</p>
    </div>
    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
      {project.stack.map((item) => <span key={item} className="tag">{item}</span>)}
    </div>
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
      <a href={project.repository} target="_blank" rel="noreferrer" className="text-link">Lihat kode <ArrowUpRight className="size-4" /></a>
      {project.secondaryRepository && <a href={project.secondaryRepository} target="_blank" rel="noreferrer" className="text-link">Backend <ArrowUpRight className="size-4" /></a>}
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">Coba aplikasi <ArrowUpRight className="size-4" /></a>}
    </div>
  </article>
)

export default ProjectCard
