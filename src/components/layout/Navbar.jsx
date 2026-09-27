import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(['home', ...NAV_LINKS.map(({ id }) => id)])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => { scrollToSection(id); setOpen(false) }
  return <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'border-b border-white/10 bg-[#08101f]/90 backdrop-blur-xl' : ''}`}>
    <div className="site-container flex h-18 items-center justify-between">
      <button onClick={() => go('home')} className="text-sm font-semibold tracking-[0.18em] text-white">AM<span className="text-sky-300">.</span></button>
      <div className="hidden items-center gap-6 lg:flex">
        {NAV_LINKS.map(({ id, label }) => <button key={id} onClick={() => go(id)} className={`nav-link ${active === id ? 'text-white' : ''}`}>{label}</button>)}
      </div>
      <a className="hidden text-link lg:flex" href={`mailto:${PERSONAL_INFO.email}`}>Mari bicara</a>
      <button className="rounded-lg border border-white/15 p-2 text-white lg:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      {open && <div className="absolute left-4 right-4 top-16 rounded-2xl border border-white/10 bg-[#0d172a] p-3 shadow-2xl lg:hidden">
        {NAV_LINKS.map(({ id, label }) => <button key={id} onClick={() => go(id)} className="block w-full rounded-lg px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5">{label}</button>)}
        <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-2 block rounded-lg bg-sky-200 px-4 py-3 text-sm font-semibold text-slate-950">Mari bicara</a>
      </div>}
    </div>
  </nav>
}

export default Navbar
