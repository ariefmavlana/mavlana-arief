import { useLanguage } from '../../utils/language'
import { ArrowUpRight } from 'lucide-react'

const Contact = () => {
  const { t } = useLanguage()
  return (
    <section id="contact" className="contact-section">
      <div className="site-container">
        <p className="eyebrow">{t('STAY IN TOUCH')}</p>
        <h2 className="contact-heading">
          <em>{t('Let’s')}</em>
          <span>
            {t('BUILD SOMETHING')}
            <br />
            {t('MEANINGFUL')}
          </span>
        </h2>
        <div className="contact-bottom">
          <a data-page className="pill-link" href="/contact">
            {t('Start project')}
            <ArrowUpRight size={18} />
          </a>
          <p>
            {t('HAVE AN IDEA, A PRODUCT, OR A VISION?')}
            <br />
            {t('LET’S BRING IT TO LIFE.')}
          </p>
        </div>
      </div>
    </section>
  )
}
export default Contact
