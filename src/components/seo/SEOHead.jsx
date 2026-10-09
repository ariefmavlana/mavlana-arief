import { useEffect } from 'react'
import { projects } from '../../data/projects'
import { useLanguage } from '../../utils/language'

const SITE_URL = 'https://mavlana.space'

const SEOHead = ({ path }) => {
  const { language, t } = useLanguage()
  useEffect(() => {
    const project = projects.find((item) => path === `/projects/${item.id}`)
    const title =
      project?.title ||
      {
        '/about': 'About',
        '/projects': 'Projects',
        '/contact': 'Contact',
      }[path]
    document.title = title
      ? `${t(title)} — Arief Maulana`
      : `Arief Maulana — Full-stack Developer ${language === 'id' ? 'di' : 'in'} Bandung`
    const description = project
      ? t(project.summary)
      : language === 'id'
        ? 'Portofolio Arief Maulana, full-stack developer dari Bandung. Jelajahi proyek web, machine learning, dan repositori publiknya.'
        : 'Arief Maulana is a full-stack developer based in Bandung. Explore his web applications, machine learning projects, and public repositories.'
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector).content = description
    }
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ]) {
      document.querySelector(selector).content = document.title
    }
    document.querySelector('meta[property="og:locale"]').content =
      language === 'id' ? 'id_ID' : 'en_US'
    document.querySelector('link[rel="canonical"]').href = `${SITE_URL}${path}`
  }, [path, language, t])
  useEffect(() => {
    const portfolioItems = projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: t(project.summary),
        url: project.liveUrl || project.repository,
        codeRepository: project.repository,
        programmingLanguage: project.stack,
        creator: { '@id': `${SITE_URL}/#arief-maulana` },
      },
    }))

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#projects`,
      url: `${SITE_URL}/#projects`,
      name:
        language === 'id'
          ? 'Karya pilihan Arief Maulana'
          : 'Selected work by Arief Maulana',
      inLanguage: language,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: portfolioItems.length,
        itemListElement: portfolioItems,
      },
    }

    let script = document.getElementById('portfolio-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'portfolio-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
  }, [language, t])

  return null
}

export default SEOHead
