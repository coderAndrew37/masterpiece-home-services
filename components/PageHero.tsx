import type { ReactNode } from 'react';
import Image from 'next/image';
import { Breadcrumbs, type Crumb } from '@/components/ui/BreadCrumbs';
import { Container } from '@/components/ui/Section';

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  crumbs: Crumb[];
  /** Buttons or links shown under the description. */
  children?: ReactNode;
  /** Optional URL for a background image */
  imageUrl?: string;
}

export function PageHero({ 
  title, 
  description, 
  eyebrow, 
  crumbs, 
  children,
  imageUrl 
}: PageHeroProps): React.JSX.Element {
  const hasImage = Boolean(imageUrl);

  return (
    <section
      aria-labelledby="page-heading"
      className="relative isolate overflow-hidden border-b border-border bg-surface-muted"
    >
      {/* Background Image & Overlay */}
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt="" // Decorative, the title handles the semantic meaning
            fill
            priority
            className="object-cover object-center -z-20"
          />
          {/* Dark overlay to guarantee text contrast */}
          <div 
            className="absolute inset-0 bg-slate-950/60 -z-10" 
            aria-hidden="true" 
          />
        </>
      )}

      <Container className="relative z-10 py-12 lg:py-20">
        <div className={hasImage ? 'text-white' : ''}>
          <Breadcrumbs items={crumbs} />
        </div>
        
        {eyebrow && (
          <p className={`mt-5 text-xs font-bold uppercase tracking-widest ${hasImage ? 'text-white/80' : 'text-brand-ink'}`}>
            {eyebrow}
          </p>
        )}
        
        <h1
          id="page-heading"
          className={`mt-3 max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl ${hasImage ? 'text-white' : ''}`}
        >
          {title}
        </h1>
        
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed sm:text-xl ${hasImage ? 'text-slate-200' : 'text-muted'}`}>
          {description}
        </p>
        
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </Container>
    </section>
  );
}