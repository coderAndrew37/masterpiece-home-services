// src/app/service-areas/[slug]/page.tsx
import CtaBanner from '@/components/CtaBanner';
import PageTransition from '@/components/PageTransition';
import { client, urlFor } from '@/lib/sanity/client';
import { serviceAreaBySlugQuery, serviceAreaSlugsQuery } from '@/lib/sanity/queries';
import { getServiceIcon } from '@/lib/ServiceIcons';
import type { ServiceAreaDetail } from '@/types/serviceArea';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { FiArrowRight, FiChevronRight } from 'react-icons/fi';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(serviceAreaSlugsQuery);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await client.fetch<ServiceAreaDetail | null>(serviceAreaBySlugQuery, { slug });

  if (!area) return { title: 'Service Area Not Found | Masterpiece Kamloops' };

  const canonicalUrl = `${SITE_URL}/service-areas/${slug}`;
  const title = area.seoTitle ?? `Home Services in ${area.name}, Kamloops | Masterpiece Home Services`;
  const description = area.seoDescription ?? area.intro;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const area = await client.fetch<ServiceAreaDetail | null>(serviceAreaBySlugQuery, { slug });

  if (!area) notFound();

  const pageUrl = `${SITE_URL}/service-areas/${slug}`;
  const areasUrl = `${SITE_URL}/service-areas`;

  // References existing Service @id nodes from each /services/[slug] page
  // instead of redefining Service entities here — avoids duplicate/conflicting
  // structured data for the same service across two URLs.
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    url: pageUrl,
    name: `Home Services in ${area.name}, Kamloops`,
    about: {
      '@type': 'Place',
      name: area.name,
      containedInPlace: { '@type': 'City', name: 'Kamloops' },
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (area.relatedServices ?? []).map((rs, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': `${SITE_URL}/services/${rs.service.slug}#service` },
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: areasUrl },
      { '@type': 'ListItem', position: 3, name: area.name, item: pageUrl },
    ],
  };

  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              area.heroImage?.asset?._ref
                ? urlFor({
                    ...area.heroImage,
                    asset: {
                      ...area.heroImage.asset,
                      _type: area.heroImage.asset._type ?? 'reference',
                    },
                  })?.auto('format').url() ?? '/images/residential-1.jpg'
                : '/images/residential-1.jpg'
            }
            alt={area.heroImage?.alt || `${area.name} Kamloops`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <FiChevronRight className="w-3 h-3" />
                <Link href="/service-areas" className="hover:text-blue-400 transition-colors">Service Areas</Link>
              </li>
              <li className="flex items-center gap-1.5 text-blue-400">
                <FiChevronRight className="w-3 h-3" />
                <span aria-current="page">{area.name}</span>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Home Services in {area.name}, Kamloops
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">{area.intro}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          {(area.relatedServices ?? []).map((rs) => (
            <div
              key={rs.service.slug}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  {getServiceIcon(rs.service.icon, 'w-5 h-5 text-blue-600')}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 pt-1.5">
                  {rs.service.title} in {area.name}
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">{rs.blurb}</p>

              <Link
                href={`/services/${rs.service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
              >
                <span>See our {rs.service.title.toLowerCase()} service</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        tagline={`Serving ${area.name}`}
        title={`Ready to Book Service in ${area.name}?`}
        description={`Get a fast, no-obligation quote for your ${area.name} property. Insured, WorkSafeBC-covered crew, 24-hour estimate delivery.`}
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}