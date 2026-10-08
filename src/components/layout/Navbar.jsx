import {
  ArrowUpRight,
  Menu,
  Settings2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PERSONAL_INFO } from '../../utils/constants'

export default function Navbar({
  onGuideOpen,
  motion,
  onMotionChange,
  dark,
  onDarkChange,
  sound,
  onSoundChange,
  quality,
  onQualityChange,
  path,
}) {
  const menu = useRef(null)
  const settingsPanel = useRef(null)
  const [settings, setSettings] = useState(false)
  const [onPaper, setOnPaper] = useState(false)
  useEffect(() => {
    if (!settings) return
    const closeOutside = (event) => {
      if (!settingsPanel.current.contains(event.target)) setSettings(false)
    }
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') setSettings(false)
    }
    window.addEventListener('pointerdown', closeOutside)
    window.addEventListener('keydown', closeWithEscape)
    return () => {
      window.removeEventListener('pointerdown', closeOutside)
      window.removeEventListener('keydown', closeWithEscape)
    }
  }, [settings])
  useEffect(() => {
    const checkSection = () =>
      setOnPaper(
        (document.querySelector('.experience')?.getBoundingClientRect()
          .bottom ?? 0) < 70,
      )
    checkSection()
    window.addEventListener('scroll', checkSection, { passive: true })
    return () => window.removeEventListener('scroll', checkSection)
  }, [path])
  const controls = (
    <div className="settings-controls">
      <button onClick={onSoundChange} aria-pressed={sound}>
        Sound <span>{sound ? 'ON' : 'OFF'}</span>
      </button>
      <button onClick={onDarkChange} aria-pressed={dark}>
        Dark mode <span>{dark ? 'ON' : 'OFF'}</span>
      </button>
      <button onClick={onMotionChange} aria-pressed={motion}>
        Animation <span>{motion ? 'ON' : 'OFF'}</span>
      </button>
      <label>
        Quality{' '}
        <select
          aria-label="Graphics quality"
          value={quality}
          onChange={(event) => onQualityChange(event.target.value)}
        >
          <option value="high">HIGH</option>
          <option value="low">LOW</option>
        </select>
      </label>
    </div>
  )
  return (
    <>
      <header className={`site-header ${onPaper ? 'on-paper' : ''}`}>
        <a
          data-page
          href="/"
          className="wordmark"
          aria-label="Arief Maulana — beranda"
        >
          ə<span>arief</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a data-page href="/about">
            About
          </a>
          <a data-page href="/projects">
            Work
          </a>
          <a data-page href="/contact">
            Contact
          </a>
        </nav>
        <div ref={settingsPanel} className="header-settings">
          <button
            className="motion-button"
            aria-expanded={settings}
            aria-controls="settings-popover"
            onClick={() => setSettings(!settings)}
          >
            <Settings2 size={14} /> Settings
          </button>
          {settings && (
            <div id="settings-popover" className="settings-popover">
              {controls}
            </div>
          )}
        </div>
        <button
          className="sound-button"
          onClick={onSoundChange}
          aria-label={sound ? 'Mute audio' : 'Enable audio'}
        >
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <a data-page href="/contact" className="glass-button">
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </header>
      <div className="mobile-dock">
        <button onClick={() => menu.current.showModal()} aria-label="Buka menu">
          <Menu size={22} />
        </button>
        <a data-page href="/" className="wordmark" aria-label="Beranda">
          ə
        </a>
        <button
          className="dock-orb"
          aria-label="Open portfolio guide"
          onClick={onGuideOpen}
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
      <dialog ref={menu} className="menu-dialog" aria-label="Menu portfolio">
        <div className="menu-top">
          <a
            data-page
            href="/"
            className="wordmark"
            onClick={() => menu.current.close()}
          >
            ə<span>arief</span>
          </a>
          <button
            aria-label="Tutup menu"
            className="close-menu"
            onClick={() => menu.current.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Menu portfolio">
          {[
            ['', 'Home'],
            ['about', 'About'],
            ['projects', 'Projects'],
            ['contact', 'Contact'],
          ].map(([id, label], i) => (
            <a
              data-page
              href={`/${id}`}
              key={id}
              onClick={() => menu.current.close()}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        {controls}
        <a className="menu-email" href={`mailto:${PERSONAL_INFO.email}`}>
          {PERSONAL_INFO.email}
        </a>
      </dialog>
    </>
  )
}
