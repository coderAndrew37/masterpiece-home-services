import type { JsonLdNode } from '@/lib/seo/schema';

/**
 * Renders one JSON-LD script containing a @graph of nodes.
 * `<` is escaped so CMS text can never close the script tag early.
 */
export function JsonLd({ nodes }: { nodes: JsonLdNode[] }): React.JSX.Element {
  const graph = { '@context': 'https://schema.org', '@graph': nodes };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}