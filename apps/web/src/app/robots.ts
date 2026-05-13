import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://codewithmangesh.in',
    sitemap: 'https://codewithmangesh.in/sitemap.xml',
  }
}
