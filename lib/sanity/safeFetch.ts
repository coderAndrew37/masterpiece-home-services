import { client } from '@/lib/sanity/client';

/**
 * Fetch from Sanity without letting one failing query take the page down.
 * Every homepage query goes through this, and they all run in parallel.
 */
export async function safeFetch<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params);
    return result ?? fallback;
  } catch (error) {
    console.error('[sanity] query failed, using fallback:', error);
    return fallback;
  }
}
