// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { sitemapPostsQuery, sitemapServicesQuery, sitemapServiceAreasQuery } from '@/lib/sanity/queries';
import glob from 'fast-glob';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.masterpiecehomeservices.ca';

// Anything discovered by the glob below that should NOT be in the sitemap
// despite having a page.tsx \u2014 add it here rather than letting it slip
// in silently (e.g. a future '/thank-you' or checkout confirmation page).
const EXCLUDED_ROUTES = new Set<string>([]);

const PRIORITY_BY_ROUTE: Record<string, number> = {
  '': 1.0,
  '/services': 0.9,
  '/service-areas': 0.8,
  '/blog': 0.8,
  '/pricing': 0.7,
  '/gallery': 0.6,
  '/testimonials': 0.6,
  '/contact': 0.6,
  '/why-us': 0.5,
  '/about': 0.5,
  '/privacy-policy': 0.1,
  '/terms-of-service': 0.1,
};

interface SlugDoc {
  slug: string;
  lastModified: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await glob('app/**/page.{tsx,jsx,js,ts}', {
    cwd: process.cwd(),
    ignore: [
      'app/**/\\[*\\]/**',
      'app/api/**',
      'app/**/studio/**',
    ],
  });

  const staticRoutes: MetadataRoute.Sitemap = pages
    .map((pagePath) =>
      pagePath
        .replace(/^app/, '')
        .replace(/\/\([^)]+\)/g, '')
        .replace(/\/page\.(tsx|jsx|js|ts)$/, '')
    )
    .filter((route) => !route.includes('[') && !route.includes(']'))
    .filter((route) => !EXCLUDED_ROUTES.has(route))
    .map((route): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}${route || ''}`,
      changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
      priority: PRIORITY_BY_ROUTE[route] ?? 0.5,
    }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<SlugDoc[]>(sitemapPostsQuery);
    blogRoutes = (posts ?? []).map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to fetch blog slugs for sitemap:', error);
  }

  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await client.fetch<SlugDoc[]>(sitemapServicesQuery);
    serviceRoutes = (services ?? []).map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: s.lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Failed to fetch service slugs for sitemap:', error);
  }

  let serviceAreaRoutes: MetadataRoute.Sitemap = [];
  try {
    const areas = await client.fetch<SlugDoc[]>(sitemapServiceAreasQuery);
    serviceAreaRoutes = (areas ?? []).map((a) => ({
      url: `${BASE_URL}/service-areas/${a.slug}`,
      lastModified: a.lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch service area slugs for sitemap:', error);
  }

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes, ...serviceAreaRoutes];
}