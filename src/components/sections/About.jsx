import { ArrowUpRight, Github, Mail } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'

const About = () => (
  <section id="about" className="section-shell border-y border-white/10">
    <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <TelemetryHeader eyebrow="TENTANG" title="Keputusan teknis yang melayani tujuan produk." />
      <div>
        <p className="body-lead">{PERSONAL_INFO.bio}</p>
        <p className="body-copy mt-7">Setiap karya dipilih karena repositorinya dapat ditinjau. Fokusnya bukan klaim, melainkan keputusan teknis, ruang lingkup, dan perkembangan implementasi yang dapat diverifikasi.</p>
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
          <a className="text-link" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> Telusuri GitHub</a>
          <a className="text-link" href={`mailto:${PERSONAL_INFO.email}`}><Mail className="size-4" /> Kirim email</a>
          <a className="text-link" href={PERSONAL_INFO.resume} target="_blank" rel="noreferrer">Unduh CV <ArrowUpRight className="size-4" /></a>
        </div>
      </div>
    </div>
  </section>
)

export default About
