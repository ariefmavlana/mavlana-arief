import { useEffect } from 'react'
import { projects } from '../../data/projects'

const SITE_URL = 'https://mavlana.space'

const SEOHead = () => {
  useEffect(() => {
    const portfolioItems = projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.summary,
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
      name: 'Karya pilihan Arief Maulana',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@type': 'ItemList', numberOfItems: portfolioItems.length, itemListElement: portfolioItems },
    }

    let script = document.getElementById('portfolio-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'portfolio-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
  }, [])

  return null
}

export default SEOHead
