import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { PERSONAL_INFO } from '../../utils/constants'

export default function Footer({ path }) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
    }
  }
  const next =
    path === '/'
      ? ['about', 'About']
      : path === '/about'
        ? ['projects', 'Projects']
        : ['contact', 'Contact']
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <p className="eyebrow">SOCIAL</p>
            {[
              ['GitHub', PERSONAL_INFO.github],
              ['LinkedIn', PERSONAL_INFO.linkedin],
              ['Twitter / X', PERSONAL_INFO.x],
            ].map(([label, url], i) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                <span className="eyebrow">[0{i + 1}]</span>
                {label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
          <div>
            <p className="eyebrow">PAGES</p>
            {[
              ['', 'Home'],
              ['about', 'About'],
              ['projects', 'Projects'],
              ['contact', 'Contact'],
            ].map(([url, label], i) => (
              <a data-page key={url} href={`/${url}`}>
                <span className="eyebrow">[0{i + 1}]</span>
                {label}
              </a>
            ))}
          </div>
          <div>
            <p className="eyebrow">LOCATION</p>
            <p className="eyebrow">
              BORN AND WORKING IN
              <br />
              BANDUNG, INDONESIA
            </p>
            <a href={PERSONAL_INFO.resume} target="_blank" rel="noreferrer">
              Download CV <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <p className="eyebrow">E-MAIL</p>
            <div className="footer-email">
              <a href={`mailto:${PERSONAL_INFO.email}`}>
                {PERSONAL_INFO.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            {copyError && (
              <p role="status">Pilih alamat email untuk menyalinnya.</p>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()}. Arief Maulana</span>
          {path !== '/contact' && <span>KEEP SCROLLING ↓</span>}
          <a data-page href="/">
            BACK TO HOME ↗
          </a>
        </div>
      </div>
      {path !== '/contact' && (
        <div className="footer-next">
          <span className="eyebrow">(JUST CONTINUE TO REVEAL)</span>
          <a data-page href={`/${next[0]}`}>
            <span className="eyebrow">[ NEXT PAGE ]</span>
            <span className="next-label">{next[1]}</span>
            <span className="next-ring" aria-hidden="true" />
          </a>
        </div>
      )}
    </footer>
  )
}
