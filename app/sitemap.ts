// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { allPostSlugsQuery, serviceSlugsQuery } from '@/lib/sanity/queries';
import glob from 'fast-glob';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.masterpiecehomeservices.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Discover static routes while ignoring route groups, dynamic parameters, studio, & APIs
  const pages = await glob('app/**/page.{tsx,jsx,js,ts}', {
    cwd: process.cwd(),
    ignore: [
      'app/**/\\[*\\]/**', // ignore dynamic route folders e.g. [slug], [[...tool]]
      'app/api/**',        // ignore API routes
      'app/**/studio/**',  // ignore Sanity Studio routes
    ],
  });

  const staticRoutes: MetadataRoute.Sitemap = pages
    .map((pagePath): MetadataRoute.Sitemap[number] => {
      // Clean path: remove 'app', route groups like '(site)', and '/page.tsx'
      const route = pagePath
        .replace(/^app/, '')
        .replace(/\/\([^)]+\)/g, '') // Strips route groups like /(site) or /(studio)
        .replace(/\/page\.(tsx|jsx|js|ts)$/, '');

      const changeFrequency = route === '' ? 'daily' : 'weekly';

      return {
        url: `${BASE_URL}${route || ''}`,
        lastModified: new Date(),
        changeFrequency,
        priority: route === '' ? 1.0 : 0.8,
      };
    })
    // Filter out any leftover dynamic parameters or double slashes
    .filter((item) => !item.url.includes('[') && !item.url.includes(']'));

  // 2. Dynamically fetch ALL blog posts from Sanity
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const postSlugs = await client.fetch<string[]>(allPostSlugsQuery);
    if (postSlugs?.length) {
      blogRoutes = postSlugs.map((slug) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch blog slugs for sitemap:', error);
  }

  // 3. Dynamically fetch ALL service pages from Sanity
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const serviceSlugs = await client.fetch<string[]>(serviceSlugsQuery);
    if (serviceSlugs?.length) {
      serviceRoutes = serviceSlugs.map((slug) => ({
        url: `${BASE_URL}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch service slugs for sitemap:', error);
  }

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}