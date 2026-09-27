import { skills } from '../../data/skills'
import TelemetryHeader from '../ui/TelemetryHeader'

const Skills = () => (
  <section id="skills" className="section-shell border-y border-white/10">
    <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <TelemetryHeader eyebrow="PRAKTIK TEKNIS" title="Perangkat yang digunakan untuk menyelesaikan pekerjaan." subtitle="Bukan daftar level kemampuan—ini adalah teknologi yang terlihat di profil dan proyek publik." />
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {skills.map((skill) => { const Icon = skill.icon; return <div key={skill.name} className="min-h-36 bg-[#0a1020] p-5 transition-colors hover:bg-[#101a31]"><Icon className="size-6 text-sky-200" /><p className="mt-10 text-sm font-medium text-white">{skill.name}</p><p className="mt-1 text-xs text-slate-500">{skill.group}</p></div> })}
      </div>
    </div>
  </section>
)

export default Skills
