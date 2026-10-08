import { ArrowUpRight } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const About = () => {
  const { ref, isVisible } = useScrollReveal()
  return (
    <section id="about" className="section-shell about-section">
      <div
        ref={ref}
        className={`site-container reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="section-topline">
          <p className="eyebrow">THE PERSON BEHIND THE PIXELS</p>
          <span className="eyebrow">01 / TENTANG</span>
        </div>
        <div className="about-grid">
          <div className="portrait-wrap">
            <img
              src={PERSONAL_INFO.photo}
              alt="Arief Maulana"
              loading="lazy"
              width="600"
              height="750"
            />
            <span className="portrait-label">ARIEF MAULANA / BANDUNG, ID</span>
          </div>
          <div className="about-content">
            <h2 className="editorial-heading">
              <em>Halo, saya</em>
              <br />
              ARIEF
              <br />
              MAULANA<span className="violet">↗</span>
            </h2>
            <p className="body-lead">
              Developer dengan rasa ingin tahu. Membangun dengan logika,
              merancang dengan empati.
            </p>
            <p className="body-copy">{PERSONAL_INFO.bio}</p>
            <div className="about-links">
              <a
                className="pill-link"
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noreferrer"
              >
                Kenali lebih dekat — CV <ArrowUpRight size={16} />
              </a>
              <a
                className="text-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
