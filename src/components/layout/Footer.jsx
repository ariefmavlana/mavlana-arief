import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'

const Footer = () => <footer className="border-t border-white/10 py-8">
  <div className="site-container flex flex-col gap-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
    <p>© {new Date().getFullYear()} Arief Maulana. Dibangun dengan konteks yang dapat diperiksa.</p>
    <div className="flex items-center gap-5">
      <a className="text-link" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub</a>
      <a className="text-link" href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"><Linkedin className="size-4" /> LinkedIn</a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-link">Atas <ArrowUp className="size-4" /></button>
    </div>
  </div>
</footer>

export default Footer
