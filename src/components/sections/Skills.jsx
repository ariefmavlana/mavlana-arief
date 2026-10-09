import { useLanguage } from '../../utils/language'
import { skills } from '../../data/skills'

const Skills = () => {
  const { t } = useLanguage()
  return (
    <section id="skills" className="section-shell skills-section">
      <div className="site-container">
        <div className="section-topline">
          <p className="eyebrow">{t('THE TOOLKIT')}</p>
          <span className="eyebrow">{t('04 / TEKNOLOGI')}</span>
        </div>
        <div className="skills-layout">
          <div>
            <h2 className="editorial-heading">
              {t('DI BALIK')}
              <br />
              <em>{t('pengalaman.')}</em>
            </h2>
            <p className="body-copy">
              {t(
                'Teknologi yang saya gunakan untuk mengubah ide menjadi sesuatu yang nyata.',
              )}
            </p>
          </div>
          <div className="skill-list">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div className="skill-row" key={skill.name}>
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon />
                  <h3>{skill.name}</h3>
                  <span className="eyebrow">{skill.group}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
