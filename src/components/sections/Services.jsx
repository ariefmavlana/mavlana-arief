import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'

const Services = () => (
  <section id="services" className="section-shell">
    <div className="site-container">
      <TelemetryHeader eyebrow="CARA BERKOLABORASI" title="Kolaborasi dimulai dari konteks yang jelas." subtitle="Kolaborasi yang efektif dimulai dengan sasaran, pengguna, risiko, dan batasan yang disepakati sejak awal." />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className="soft-card p-7"><p className="font-mono text-xs text-sky-200/70">0{index + 1}</p><Icon className="mt-10 size-6 text-sky-200" /><h3 className="card-title mt-5">{service.title}</h3><p className="body-copy mt-3">{service.description}</p></article> })}
      </div>
      <div className="cta-panel mt-14"><div><p className="eyebrow">PUNYA IDE ATAU BRIEF?</p><h3 className="cta-title mt-4">Mulai dengan konteks yang tepat.</h3><p className="body-copy mt-4">Kirim tujuan, tantangan, atau ruang lingkup awal. Saya akan merespons dengan langkah berikutnya yang realistis dan pertanyaan yang relevan.</p></div><a className="button button-primary shrink-0" href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Halo Arief, saya ingin mendiskusikan proyek. Konteks singkatnya:')}`} target="_blank" rel="noreferrer">Diskusikan proyek <ArrowUpRight className="size-4" /></a></div>
    </div>
  </section>
)

export default Services
