const TelemetryHeader = ({ eyebrow, title, subtitle, align = 'left' }) => (
  <header className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-copy mt-5">{subtitle}</p>}
  </header>
)

export default TelemetryHeader
