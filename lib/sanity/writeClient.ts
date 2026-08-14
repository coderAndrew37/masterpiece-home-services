// src/lib/sanity/writeClient.ts
// SERVER-ONLY. Never import this in a 'use client' file — the write token
// would end up in the browser bundle.
import { createClient } from '@sanity/client';

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});