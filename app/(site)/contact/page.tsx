// src/app/contact/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { serviceAreasQuery } from '@/lib/sanity/queries';
import ContactClient from './page.client';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: 'Contact Us | Masterpiece Home Services Kamloops',
  description:
    'Contact Masterpiece Home Services for professional exterior and interior cleaning across Kamloops, Sun Peaks, and the Thompson-Okanagan region. Get a free, fast estimate.',
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Get a Free Quote | Masterpiece Home Services',
    description: 'Schedule window detailing, soft washing, or eavestrough cleaning in Kamloops, BC.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact Masterpiece Home Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Free Quote | Masterpiece Home Services',
    description: 'Schedule window detailing, soft washing, or eavestrough cleaning in Kamloops, BC.',
    images: ['/images/og-image.jpg'],
  },
};

interface ServiceAreaItem {
  _id: string;
  name: string;
  slug: string;
}

export default async function ContactPage(): Promise<React.JSX.Element> {
  const serviceAreas = (await client.fetch<ServiceAreaItem[]>(serviceAreasQuery)) || [];

  const faqs = [
    {
      question: 'How quickly can you schedule my service?',
      answer:
        'We typically schedule residential services within 2-3 business days. Reach out directly if you need something sooner and we\u2019ll do our best to fit you in.',
    },
    {
      question: 'Do I need to be home during the service?',
      answer:
        'For exterior cleaning, you don\u2019t need to be home as long as exterior water spigots are accessible. For interior detailing, we\u2019ll coordinate access with you.',
    },
    {
      question: 'Are your cleaning solutions safe for plants and pets?',
      answer:
        'Yes \u2014 we use eco-friendly, biodegradable cleaning solutions along with pure-water filtration systems that are safe for landscaping and pets.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Interac e-Transfer, major credit cards, and cheque.',
    },
    {
      question: 'Do you offer service guarantees?',
      answer:
        'Yes \u2014 if you\u2019re not completely happy with our work, we\u2019ll return to make it right at no additional cost.',
    },
  ];

  const orgId = `${SITE_URL}/#organization`;

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${PAGE_URL}#contact`,
    url: PAGE_URL,
    name: 'Contact Masterpiece Home Services',
    mainEntity: { '@id': orgId },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: PAGE_URL },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ContactClient serviceAreas={serviceAreas} faqs={faqs} />
    </>
  );
}