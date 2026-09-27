import { Github } from 'lucide-react'
import { projects } from '../../data/projects'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'
import ProjectCard from '../ui/ProjectCard'

const Projects = () => (
  <section id="projects" className="section-shell">
    <div className="site-container">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <TelemetryHeader eyebrow="KARYA PILIHAN" title="Konteks sebelum kosmetik." subtitle="Pilihan repositori publik yang merepresentasikan eksplorasi dan implementasi terbaru." />
        <a className="text-link shrink-0" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> Lihat semua repositori</a>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      <p className="mt-7 text-sm leading-6 text-slate-500">Data proyek dicocokkan dengan metadata repositori publik GitHub pada 27 September 2026. Detail implementasi dapat ditinjau langsung melalui tautan kode.</p>
    </div>
  </section>
)

export default Projects
