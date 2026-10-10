import { CarFront, Code2, ChartNoAxesCombined } from 'lucide-react'
import { useLanguage } from '../../utils/language'

const images = {
  weather: '/projects/weather.png',
  coin: '/projects/coin.png',
  healthcare: '/projects/healthcare.png',
}
const icons = {
  'car-dealer': CarFront,
  accounting: ChartNoAxesCombined,
  mjs: Code2,
}

export default function ProjectArtwork({ project }) {
  const { t } = useLanguage()
  const Icon = icons[project.id]
  if (images[project.id])
    return (
      <>
        <img
          draggable={false}
          src={images[project.id]}
          alt={`${t('Ilustrasi konsep')}: ${project.title}`}
          loading="lazy"
          width="1000"
          height="1000"
        />
        <span className="project-visual-caption">{t('Ilustrasi konsep')}</span>
      </>
    )
  return (
    <div className="project-art">
      <Icon strokeWidth={0.7} />
      <span>
        {project.id === 'car-dealer'
          ? t('DRIVE THE NEXT.')
          : project.id === 'accounting'
            ? t('Make numbers matter.')
            : t('Always learning.')}
      </span>
      <small>{project.stack.join(' / ')}</small>
    </div>
  )
}
