'use client';

/**
 * This route mounts the Sanity Studio at /studio in your existing Next.js app.
 * The [[...tool]] catch-all lets Studio handle its own internal sub-routes
 * (e.g. /studio/desk, /studio/vision) without you creating a page for each.
 *
 * This MUST stay a Client Component ('use client'). Sanity Studio is a
 * client-only bundle — if this file is treated as a Server Component,
 * Next tries to resolve Studio's dependencies (e.g. swr) in the server/RSC
 * graph, which breaks because some of those packages only ship client builds.
 * That also means we can't export `metadata` from this file (Next disallows
 * metadata exports from Client Components) — if you want a custom title for
 * /studio, add a layout.tsx alongside this file instead (see note below).
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  return <NextStudio config={config} />;
}