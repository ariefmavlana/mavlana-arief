import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'

const Services = () => (
  <section id="services" className="section-shell services-section">
    <div className="site-container">
      <div className="section-topline">
        <p className="eyebrow">WHAT I DO</p>
        <span className="eyebrow">02 / KOLABORASI</span>
      </div>
      <h2 className="services-statement">
        <span className="violet">↪</span> Saya merancang dan membangun produk
        digital — dari <em>ide pertama</em> hingga pengalaman yang siap
        digunakan.
      </h2>
      <div className="services-bottom">
        <a data-page href="/contact" className="pill-link">
          Mulai sebuah percakapan <ArrowUpRight size={16} />
        </a>
        <div className="service-list">
          {services.map((service, index) => (
            <article key={service.title}>
              <span className="eyebrow">(00{index + 1})</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <ArrowUpRight size={20} />
            </article>
          ))}
        </div>
      </div>
    </div>
    <div className="service-marquee" aria-hidden="true">
      <div>
        <span>CREATIVE DEVELOPMENT</span>
        <i>✳</i>
        <span>THOUGHTFUL DESIGN</span>
        <i>✳</i>
        <span>CREATIVE DEVELOPMENT</span>
        <i>✳</i>
        <span>THOUGHTFUL DESIGN</span>
        <i>✳</i>
      </div>
    </div>
  </section>
)

export default Services
