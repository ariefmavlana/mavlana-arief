import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'

const Services = () => {
  const { t } = useLanguage()
  return (
    <section id="services" className="section-shell services-section">
      <div className="site-container">
        <div className="section-topline">
          <p className="eyebrow">{t('WHAT I DO')}</p>
          <span className="eyebrow">{t('02 / KOLABORASI')}</span>
        </div>
        <h2 className="services-statement">
          <span className="violet">↪</span> {t('servicesStatement')}
        </h2>
        <div className="services-bottom">
          <a data-page href="/contact" className="pill-link">
            {t('Mulai sebuah percakapan')}
            <ArrowUpRight size={16} />
          </a>
          <div className="service-list">
            {services.map((service, index) => (
              <article key={t(service.title)}>
                <span className="eyebrow">(00{index + 1})</span>
                <div>
                  <h3>{t(service.title)}</h3>
                  <p>{t(service.description)}</p>
                </div>
                <ArrowUpRight size={20} />
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="service-marquee" aria-hidden="true">
        <div>
          <span>{t('CREATIVE DEVELOPMENT')}</span>
          <i>✳</i>
          <span>{t('THOUGHTFUL DESIGN')}</span>
          <i>✳</i>
          <span>{t('CREATIVE DEVELOPMENT')}</span>
          <i>✳</i>
          <span>{t('THOUGHTFUL DESIGN')}</span>
          <i>✳</i>
        </div>
      </div>
    </section>
  )
}

export default Services
