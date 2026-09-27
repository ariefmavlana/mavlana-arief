import { ArrowDown, ArrowUpRight, Github, MapPin } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'

const Hero = () => (
  <section id="home" className="hero-shell">
    <div className="orb orb-one" aria-hidden="true" />
    <div className="orb orb-two" aria-hidden="true" />
    <div className="site-container relative z-10 grid min-h-[calc(100svh-1px)] content-center py-32 lg:grid-cols-[1fr_260px] lg:gap-20">
      <div className="max-w-4xl">
        <p className="eyebrow mb-7">PORTFOLIO / 2026</p>
        <h1 className="hero-title">Membangun produk digital yang terasa masuk akal.</h1>
        <p className="hero-copy mt-7">Saya Arief Maulana, full-stack developer dari Bandung. Saya merancang dan membangun pengalaman web dengan perhatian pada tujuan produk, kejelasan antarmuka, dan implementasi yang rapi.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button className="button button-primary" onClick={() => scrollToSection('projects')}>Lihat karya pilihan <ArrowDown className="size-4" /></button>
          <a className="button button-secondary" href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Halo Arief, saya ingin membicarakan sebuah proyek.')}`} target="_blank" rel="noreferrer">Mulai percakapan <ArrowUpRight className="size-4" /></a>
        </div>
      </div>
      <aside className="mt-14 border-t border-white/15 pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <p className="text-sm font-medium text-white">Arief Maulana</p><p className="mt-1 text-sm text-slate-400">Full-stack Developer</p>
        <p className="mt-7 flex items-center gap-2 text-sm text-slate-300"><MapPin className="size-4 text-sky-300" /> {PERSONAL_INFO.location}</p>
        <p className="mt-5 text-sm leading-6 text-slate-400">Eksplorasi saat ini: web full-stack, machine learning, dan IoT.</p>
        <a className="text-link mt-7" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub</a>
      </aside>
    </div>
  </section>
)

export default Hero
