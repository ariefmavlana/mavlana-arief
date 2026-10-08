import { useState } from 'react'
import { ArrowUpRight, Send, X } from 'lucide-react'
import { projects } from '../../data/projects'
import { PERSONAL_INFO } from '../../utils/constants'

export default function PortfolioGuide({ dialogRef: dialog }) {
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [greeting, setGreeting] = useState(true)
  const answer = (text) => {
    const query = text.toLowerCase()
    const project = projects.find(
      (item) =>
        query.includes(item.title.toLowerCase()) || query.includes(item.id),
    )
    if (project)
      return {
        text: project.summary,
        href: `/projects/${project.id}`,
        label: project.title,
      }
    if (/contact|kontak|email|hubung|hire|proyek baru|budget|biaya/.test(query))
      return {
        text: `Mari diskusikan ide Anda melalui ${PERSONAL_INFO.email}.`,
        href: '/contact',
        label: 'Start a conversation',
      }
    if (/project|proyek|karya|work/.test(query))
      return {
        text: 'Jelajahi enam proyek, dari katalog kendaraan, akuntansi, dan cuaca hingga eksplorasi machine learning.',
        href: '/projects',
        label: 'Explore projects',
      }
    if (/stack|teknologi|technology|skill|react|python/.test(query))
      return {
        text: 'Arief menggunakan TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, Python, PostgreSQL, dan Cloudflare.',
        href: '/about',
        label: 'About Arief',
      }
    if (/about|arief|tentang|siapa|who/.test(query))
      return {
        text: 'Arief Maulana adalah full-stack developer dari Bandung, Indonesia. Ia membangun aplikasi web dan mengeksplorasi machine learning serta IoT.',
        href: '/about',
        label: 'Meet Arief',
      }
    return {
      text: 'Saya bisa membantu menemukan proyek, teknologi, profil, atau kontak yang tersedia di portfolio ini. Untuk pertanyaan lebih spesifik, hubungi Arief langsung.',
      href: '/contact',
      label: 'Contact Arief',
    }
  }
  const ask = (text) => {
    if (!text.trim()) return
    setMessages((items) => [
      ...items,
      { question: text.trim(), answer: answer(text) },
    ])
    setQuestion('')
  }
  return (
    <>
      {greeting && (
        <div className="guide-greeting">
          <span>
            HI! EXPLORE MY WORK,
            <br />
            OR LET’S START A CONVERSATION.
          </span>
          <button
            aria-label="Dismiss greeting"
            onClick={() => setGreeting(false)}
          >
            <X size={12} />
          </button>
        </div>
      )}
      <button
        className="contact-orb"
        aria-label="Open portfolio guide"
        onClick={() => {
          setGreeting(false)
          dialog.current.showModal()
        }}
      >
        <ArrowUpRight size={23} />
      </button>
      <dialog
        ref={dialog}
        className="guide-dialog"
        aria-label="Portfolio guide"
      >
        <div className="guide-top">
          <span>
            Portfolio guide<small>Answers from this portfolio</small>
          </span>
          <button
            aria-label="Close portfolio guide"
            onClick={() => dialog.current.close()}
          >
            <X size={20} />
          </button>
        </div>
        <div className="guide-messages" aria-live="polite">
          <p className="guide-answer">Hello! What would you like to explore?</p>
          {messages.map((message, i) => (
            <div key={i}>
              <p className="guide-question">{message.question}</p>
              <div className="guide-answer">
                <p>{message.answer.text}</p>
                <a
                  data-page
                  href={message.answer.href}
                  onClick={() => dialog.current.close()}
                >
                  {message.answer.label} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="guide-suggestions">
          {['About Arief', 'Projects', 'Tech stack', 'Contact'].map((text) => (
            <button key={text} onClick={() => ask(text)}>
              {text}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            ask(question)
          }}
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            aria-label="Ask about the portfolio"
            placeholder="Ask about my work…"
            maxLength={500}
          />
          <button aria-label="Send question" type="submit">
            <Send size={17} />
          </button>
        </form>
      </dialog>
    </>
  )
}
