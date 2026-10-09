import { useLanguage } from '../../utils/language'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'

export default function ContactForm({ embedded = false }) {
  const { t, language } = useLanguage()
  const [draft, setDraft] = useState(null)
  const Heading = embedded ? 'h2' : 'h1'
  const submit = (event) => {
    event.preventDefault()
    setDraft(Object.fromEntries(new FormData(event.currentTarget)))
  }
  const body =
    draft &&
    (language === 'id'
      ? `Halo Arief,\n\nSaya ${draft.name}.\nEmail: ${draft.email}\nProyek: ${t(draft.project)}\nAnggaran: ${t(draft.budget)}\n\n${draft.details}\n\nMenemukan portofolio melalui: ${t(draft.source) || 'Tidak disebutkan'}`
      : `Hello Arief,\n\nI’m ${draft.name}.\nEmail: ${draft.email}\nProject: ${t(draft.project)}\nBudget: ${t(draft.budget)}\n\n${draft.details}\n\nFound your portfolio through: ${t(draft.source) || 'Not specified'}`)
  const emailHref =
    draft &&
    `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`${language === 'id' ? 'Diskusi proyek' : 'Project enquiry'} — ${draft.name}`)}&body=${encodeURIComponent(body)}`
  return (
    <section
      id={embedded ? 'contact' : undefined}
      className={`contact-form-page ${embedded ? 'contact-form-embedded site-container' : ''}`}
    >
      <Heading className="editorial-heading">
        <em>{t('Let’s')}</em> {language === 'id' ? 'WUJUDKAN' : 'BUILD'}
        <br />
        <span className="contact-title-line">
          <span className="contact-title-arrow" aria-hidden="true">
            ↪
          </span>
          <span>{language === 'id' ? 'IDE' : 'SOMETHING'}</span>
        </span>
        {t('MEANINGFUL')}
      </Heading>
      <p className="eyebrow">
        {language === 'id'
          ? 'CERITAKAN PROYEK YANG INGIN ANDA BANGUN.'
          : 'TELL ME ABOUT YOUR PROJECT.'}
        <br />
        {language === 'id'
          ? 'KITA BAHAS KEBUTUHAN DAN LANGKAH BERIKUTNYA.'
          : 'LET’S DISCUSS THE REQUIREMENTS AND NEXT STEPS.'}
      </p>
      <form onSubmit={submit} onChange={() => setDraft(null)}>
        <fieldset className="contact-field">
          <legend>
            {t("I'm building...")}
            <span>*</span>
          </legend>
          <div>
            {[
              'a marketing website',
              'a product / SaaS',
              'a web application',
              'an e-commerce platform',
              'multiple / something complex',
              'not sure — let’s talk',
            ].map((value) => (
              <label className="radio-option" key={value}>
                <input type="radio" name="project" value={value} required />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="contact-field">
          <legend>
            {t('My budget is...')}
            <span>*</span>
          </legend>
          <div>
            {[
              '< Rp5 juta',
              'Rp5–15 juta',
              'Rp15–30 juta',
              'Rp30–50 juta',
              'Rp50 juta+',
              'Let’s discuss',
            ].map((value) => (
              <label className="radio-option" key={value}>
                <input type="radio" name="budget" value={value} required />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="contact-field">
          {t('My name is...')}
          <input
            name="name"
            autoComplete="name"
            required
            placeholder={t('Your name')}
          />
        </label>
        <label className="contact-field">
          {t('Reach me at...')}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t('Your email address')}
          />
        </label>
        <label className="contact-field">
          {t("What I'm picturing...")}
          <textarea
            name="details"
            rows={4}
            required
            placeholder={t('Tell me about your idea, goals, and timeline')}
          />
        </label>
        <fieldset className="contact-field">
          <legend>{t('I found you through...')}</legend>
          <div>
            {[
              'GitHub',
              'LinkedIn',
              'Twitter / X',
              'Google search',
              'Referral',
              'Other',
            ].map((value) => (
              <label className="radio-option" key={value}>
                <input type="radio" name="source" value={value} />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-submit">
          <p className="eyebrow">
            {t('PESAN DISIAPKAN SEBAGAI DRAF EMAIL.')}
            <br />
            {t('ANDA MENGIRIMNYA DARI APLIKASI EMAIL.')}
          </p>
          <button className="pill-link" type="submit">
            {t('Prepare email')}
            <ArrowUpRight size={16} />
          </button>
        </div>
        {draft && (
          <div className="email-draft" role="status">
            <p>
              {t(
                'Draf siap. Buka aplikasi email untuk meninjau dan mengirimnya.',
              )}
            </p>
            <a className="pill-link" href={emailHref}>
              {t('Open email app')}
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </form>
      {!embedded && (
        <>
          <h2 className="direct-contact">{t('Or reach out directly')}</h2>
          <a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>
            {PERSONAL_INFO.email} ↗
          </a>
        </>
      )}
    </section>
  )
}
