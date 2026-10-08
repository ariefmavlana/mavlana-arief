import { ArrowUpRight } from 'lucide-react'

const Contact = () => (
  <section id="contact" className="contact-section">
    <div className="site-container">
      <p className="eyebrow">STAY IN TOUCH</p>
      <h2 className="contact-heading">
        <em>Let’s</em>
        <span>
          BUILD SOMETHING
          <br />
          MEANINGFUL
        </span>
      </h2>
      <div className="contact-bottom">
        <a data-page className="pill-link" href="/contact">
          Start project <ArrowUpRight size={18} />
        </a>
        <p>
          HAVE AN IDEA, A PRODUCT, OR A VISION?
          <br />
          LET’S BRING IT TO LIFE.
        </p>
      </div>
    </div>
  </section>
)
export default Contact
