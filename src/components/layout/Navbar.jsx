import { useLanguage } from '../../utils/language'
import {
  ArrowUpRight,
  CornerDownLeft,
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
  const { t, language, setLanguage } = useLanguage()
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
      if (event.key === 'Escape') {
        setSettings(false)
        settingsPanel.current.querySelector('button').focus()
      }
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
      <p className="eyebrow settings-title">{t('Settings')}</p>
      <label>
        {t('Language')}
        <select
          aria-label={t('Language')}
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="id" lang="id">
            Bahasa Indonesia
          </option>
          <option value="en" lang="en">
            English
          </option>
        </select>
      </label>
      <button onClick={onSoundChange} role="switch" aria-checked={sound}>
        {t('Sound')}
        <span className="setting-switch" aria-hidden="true" />
      </button>
      <button onClick={onDarkChange} role="switch" aria-checked={dark}>
        {t('Dark mode')}
        <span className="setting-switch" aria-hidden="true" />
      </button>
      <button onClick={onMotionChange} role="switch" aria-checked={motion}>
        {t('Animation')}
        <span className="setting-switch" aria-hidden="true" />
      </button>
      <label>
        {t('Quality')}{' '}
        <select
          aria-label={t('Graphics quality')}
          value={quality}
          onChange={(event) => onQualityChange(event.target.value)}
        >
          <option value="high">{t('HIGH')}</option>
          <option value="low">{t('LOW')}</option>
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
          aria-label={t('Arief Maulana — beranda')}
        >
          ə<span>arief</span>
        </a>
        <nav className="desktop-nav" aria-label={t('Navigasi utama')}>
          <a
            data-page
            href="/about"
            aria-current={path === '/about' ? 'page' : undefined}
          >
            {t('About')}
          </a>
          <a
            data-page
            href="/projects"
            aria-current={path.startsWith('/projects') ? 'page' : undefined}
          >
            {t('Work')}
          </a>
          <a
            data-page
            href="/contact"
            aria-current={path === '/contact' ? 'page' : undefined}
          >
            {t('Contact')}
          </a>
        </nav>
        <div ref={settingsPanel} className="header-settings">
          <button
            className="motion-button"
            aria-expanded={settings}
            aria-controls="settings-popover"
            onClick={() => setSettings(!settings)}
          >
            <Settings2 size={14} />
            {t('Settings')}
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
          aria-label={t(sound ? 'Mute audio' : 'Enable audio')}
        >
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <a
          data-page
          href={path === '/contact' ? '/' : '/contact'}
          className="glass-button"
        >
          {t(path === '/contact' ? 'Close' : 'Let’s talk')}
          {path === '/contact' ? (
            <CornerDownLeft size={15} />
          ) : (
            <ArrowUpRight size={15} />
          )}
        </a>
      </header>
      <div className="mobile-dock">
        <button
          onClick={() => menu.current.showModal()}
          aria-label={t('Buka menu')}
        >
          <Menu size={22} />
        </button>
        <a data-page href="/" className="wordmark" aria-label={t('Beranda')}>
          ə<span>arief</span>
        </a>
        <button
          className="dock-orb"
          aria-label={t('Open portfolio guide')}
          onClick={onGuideOpen}
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
      <dialog
        ref={menu}
        className="menu-dialog"
        aria-label={t('Menu portfolio')}
      >
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
            aria-label={t('Tutup menu')}
            className="close-menu"
            onClick={() => menu.current.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label={t('Menu portfolio')}>
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
              {t(label)}
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
