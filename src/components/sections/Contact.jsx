import { ArrowUpRight, Github, Mail, MessageCircle } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'

const Contact = () => (
  <section id="contact" className="section-shell contact-shell">
    <div className="site-container grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
      <TelemetryHeader eyebrow="KONTAK" title="Buka percakapan yang terarah." subtitle="Untuk kerja sama proyek, peluang profesional, atau diskusi teknis, pilih kanal yang paling sesuai dan sertakan konteks singkat." />
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <a className="contact-link" href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Halo Arief, saya ingin menghubungi Anda.')}`} target="_blank" rel="noreferrer"><MessageCircle className="size-5" /> WhatsApp <ArrowUpRight className="size-4" /></a>
        <a className="contact-link" href={`mailto:${PERSONAL_INFO.email}`}><Mail className="size-5" /> Email <ArrowUpRight className="size-4" /></a>
        <a className="contact-link" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-5" /> GitHub <ArrowUpRight className="size-4" /></a>
      </div>
    </div>
  </section>
)

export default Contact
