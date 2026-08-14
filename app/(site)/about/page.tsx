// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutClient from './page.client';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: 'About Us | Masterpiece Home Services Kamloops',
  description:
    'Masterpiece Home Services is a small, hands-on home care business founded in Kamloops, BC in 2025 \u2014 built on honest work and careful attention to every property we touch.',
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'About Masterpiece Home Services | Kamloops, BC',
    description:
      'A small, owner-operated home services business founded in Kamloops in 2025 \u2014 growing one job at a time.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'About Masterpiece Home Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Masterpiece Home Services | Kamloops, BC',
    description: 'A small, owner-operated home services business founded in Kamloops in 2025.',
    images: ['/images/og-image.jpg'],
  },
};

export default function AboutPage(): React.JSX.Element {
  const teamMembers = [
    {
      id: 1,
      name: '[Founder Name]',
      role: 'Founder',
      bio: 'Started Masterpiece Home Services in 2025 with a simple goal: do careful, honest work on every Kamloops property, one job at a time.',
      img: 'team1',
    },
  ];

  const timelineEvents = [
    {
      year: '2025',
      title: 'Masterpiece Founded',
      description: 'Started in Kamloops, BC as a hands-on, owner-operated home services business.',
    },
    {
      year: '2026',
      title: 'Officially Registered',
      description: 'Formalized the business to support a growing team and expanding service area across Kamloops.',
    },
  ];

  const values = [
    {
      title: 'Careful Work',
      description: 'Every property gets the same close attention, whether it\u2019s a single window or a full property service.',
    },
    {
      title: 'Honest Pricing',
      description: 'Clear quotes with no hidden fees \u2014 what we quote is what you pay.',
    },
    {
      title: 'Reliability',
      description: 'We show up when we say we will, and we stand behind the work we do.',
    },
    {
      title: 'Local Roots',
      description: 'Based in Kamloops, serving Kamloops \u2014 we know the neighborhoods we work in.',
    },
    {
      title: 'Room to Grow',
      description: 'As a small, growing business, we\u2019re building relationships with customers who\u2019ll grow with us.',
    },
  ];

  const orgId = `${SITE_URL}/#organization`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: PAGE_URL },
    ],
  };

  // References the homepage Organization node rather than redeclaring it.
  // foundingDate is real now \u2014 worth also adding to the homepage
  // Organization schema (src/app/page.tsx) since it's the same fact.
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#about`,
    url: PAGE_URL,
    name: 'About Masterpiece Home Services',
    mainEntity: { '@id': orgId },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />
      <AboutClient teamMembers={teamMembers} timelineEvents={timelineEvents} values={values} />
    </>
  );
}