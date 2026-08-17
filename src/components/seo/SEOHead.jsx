import { useEffect } from 'react'
import { projects } from '../../data/projects'
import { services } from '../../data/services'
import { faqs } from '../../data/faqs'

const SEOHead = () => {
  useEffect(() => {
    // Generate ItemList schema for Portfolio Projects
    const projectSchemaItems = projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        genre: project.category,
        keywords: project.technologies.join(', '),
        url: project.link || project.github || 'https://mavlana.space/#projects',
        author: {
          '@type': 'Person',
          name: 'Arief Maulana'
        }
      }
    }))

    // Generate Service schema for Offered Services
    const serviceSchemaItems = services.map((service) => ({
      '@type': 'Service',
      name: `${service.title} - Arief Maulana (ariefmavlana)`,
      description: service.description,
      provider: {
        '@type': 'Person',
        name: 'Arief Maulana',
        alternateName: 'ariefmavlana'
      },
      areaServed: ['Bandung', 'Jawa Barat', 'Indonesia', 'Worldwide']
    }))

    // FAQPage Schema for Google Rich Snippets
    const faqSchemaItems = faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))

    const faqSchema = {
      '@type': 'FAQPage',
      '@id': 'https://mavlana.space/#faq-page',
      mainEntity: faqSchemaItems
    }

    // BreadcrumbList Schema for Navigation
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mavlana.space/' },
        { '@type': 'ListItem', position: 2, name: 'About Arief Maulana', item: 'https://mavlana.space/#about' },
        { '@type': 'ListItem', position: 3, name: 'Experience', item: 'https://mavlana.space/#experience' },
        { '@type': 'ListItem', position: 4, name: 'Skills & Tech Stack', item: 'https://mavlana.space/#skills' },
        { '@type': 'ListItem', position: 5, name: 'Jasa Web & Services Bandung', item: 'https://mavlana.space/#services' },
        { '@type': 'ListItem', position: 6, name: 'Portfolio Projects', item: 'https://mavlana.space/#projects' },
        { '@type': 'ListItem', position: 7, name: 'FAQ', item: 'https://mavlana.space/#faq' },
        { '@type': 'ListItem', position: 8, name: 'Contact Arief Maulana', item: 'https://mavlana.space/#contact' }
      ]
    }

    const dynamicSchemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          '@id': 'https://mavlana.space/#project-portfolio',
          name: 'Arief Maulana (ariefmavlana) Shipped Portfolio Projects',
          numberOfItems: projectSchemaItems.length,
          itemListElement: projectSchemaItems
        },
        {
          '@type': 'OfferCatalog',
          '@id': 'https://mavlana.space/#services-offered',
          name: 'Jasa Pembuatan Website, Fullstack Development & AI Services Bandung',
          itemListElement: serviceSchemaItems
        },
        faqSchema,
        breadcrumbSchema
      ]
    }

    // Inject JSON-LD Script into Head
    let scriptTag = document.getElementById('dynamic-seo-schema')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'dynamic-seo-schema'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(dynamicSchemaData)

    return () => {
      // Optional cleanup on unmount
    }
  }, [])

  return null
}

export default SEOHead
