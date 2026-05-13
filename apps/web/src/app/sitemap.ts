import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codewithmangesh.in',
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: 'https://codewithmangesh.in/docs',
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: 'https://codewithmangesh.in/blog',
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: 'https://codewithmangesh.in/tutorials',
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: 'https://codewithmangesh.in/snippets',
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: 'https://codewithmangesh.in/store',
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: 'https://codewithmangesh.in/hire-me',
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    }
  ]
}
