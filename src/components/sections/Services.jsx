import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'

const Services = () => (
  <section id="services" className="section-shell">
    <div className="site-container">
      <TelemetryHeader eyebrow="CARA BERKOLABORASI" title="Mulai dari masalah yang ingin diselesaikan." subtitle="Saya paling efektif saat tujuan, pengguna, dan batasan proyek dibahas sejak awal." />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className="soft-card p-7"><p className="font-mono text-xs text-sky-200/70">0{index + 1}</p><Icon className="mt-10 size-6 text-sky-200" /><h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p></article> })}
      </div>
      <div className="cta-panel mt-14"><div><p className="eyebrow">PUNYA IDE ATAU BRIEF?</p><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Ceritakan tujuan, siapa penggunanya, dan kapan Anda ingin memulai.</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">Saya akan meninjau konteksnya terlebih dahulu dan menjawab dengan langkah berikutnya yang realistis—bukan janji generik.</p></div><a className="button button-primary shrink-0" href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Halo Arief, saya ingin mendiskusikan proyek. Konteks singkatnya:')}`} target="_blank" rel="noreferrer">Diskusikan proyek <ArrowUpRight className="size-4" /></a></div>
    </div>
  </section>
)

export default Services
