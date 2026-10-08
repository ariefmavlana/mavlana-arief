import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'

export default function ContactForm() {
  const [draft, setDraft] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `Halo Arief,\n\nSaya ${data.get('name')}.\nEmail: ${data.get('email')}\nProyek: ${data.get('project')}\nBudget: ${data.get('budget')}\n\n${data.get('details')}\n\nMenemukan portfolio melalui: ${data.get('source') || '-'}`
    setDraft(
      `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Diskusi proyek — ${data.get('name')}`)}&body=${encodeURIComponent(body)}`,
    )
  }
  return (
    <section className="contact-form-page">
      <h1 className="editorial-heading">
        <em>Let’s</em> BUILD
        <br />
        <span>↪ SOMETHING</span>
        <br />
        MEANINGFUL
      </h1>
      <p className="eyebrow">
        TELL ME ABOUT THE PROJECT.
        <br />
        LET’S MAKE SOMETHING THAT MATTERS.
      </p>
      <form onSubmit={submit} onChange={() => setDraft('')}>
        <fieldset className="contact-field">
          <legend>
            I'm building...<span>*</span>
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
                {value}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="contact-field">
          <legend>
            My budget is...<span>*</span>
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
                {value}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="contact-field">
          My name is...
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
          />
        </label>
        <label className="contact-field">
          Reach me at...
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your email address"
          />
        </label>
        <label className="contact-field">
          What I'm picturing...
          <textarea
            name="details"
            rows={4}
            required
            placeholder="Tell me about your idea, goals, and timeline"
          />
        </label>
        <label className="contact-field">
          I found you through...
          <select name="source" defaultValue="">
            <option value="">Select an option</option>
            <option>GitHub</option>
            <option>LinkedIn</option>
            <option>Twitter / X</option>
            <option>Google search</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </label>
        <div className="form-submit">
          <p className="eyebrow">
            PESAN DISIAPKAN SEBAGAI DRAF EMAIL.
            <br />
            ANDA MENGIRIMNYA DARI APLIKASI EMAIL.
          </p>
          <button className="pill-link" type="submit">
            Prepare email <ArrowUpRight size={16} />
          </button>
        </div>
        {draft && (
          <div className="email-draft" role="status">
            <p>
              Draf siap. Buka aplikasi email untuk meninjau dan mengirimnya.
            </p>
            <a className="pill-link" href={draft}>
              Open email app <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </form>
      <h2 className="direct-contact">Or reach out directly</h2>
      <a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>
        {PERSONAL_INFO.email} ↗
      </a>
    </section>
  )
}
