// src/app/why-us/page.tsx
import WhyUsClient from './page.client';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/why-us`;

export const metadata: Metadata = {
  title: 'Why Choose Us | Masterpiece Home Services Kamloops',
  description:
    'See why Kamloops homeowners choose Masterpiece Home Services for window detailing, soft washing, gutter clearing, and exterior care. Fully insured, WorkSafeBC covered.',
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Why Choose Masterpiece | Fully Insured & Certified Home Services',
    description: 'Eco-friendly solutions, insured technicians, and transparent Kamloops pricing.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Why Choose Masterpiece Home Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Masterpiece | Fully Insured & Certified Home Services',
    description: 'Eco-friendly solutions, insured technicians, and transparent Kamloops pricing.',
    images: ['/images/og-image.jpg'],
  },
};

export default function WhyUsPage(): React.JSX.Element {
  const benefits = [
    {
      title: 'Trained & Certified Crew',
      description: 'Our technicians are trained on every service we offer and follow standardized safety protocols on every job.',
      icon: 'FiAward',
    },
    {
      title: 'Quality Guarantee',
      description: 'We stand behind every job \u2014 if something isn\u2019t right, we come back and make it right.',
      icon: 'FiCheckCircle',
    },
    {
      title: 'Eco-Friendly Solutions',
      description: 'We use environmentally safe cleaning products that are gentle on siding, landscaping, and pets.',
      icon: 'FiDroplet',
    },
    {
      title: 'Insured & Certified',
      description: 'Fully insured with $5,000,000 liability coverage and WorkSafeBC-covered technicians.',
      icon: 'FiShield',
    },
    {
      title: 'Purpose-Built Equipment',
      description: 'Pure-water fed poles, commercial soft-wash rigs, and rotary surface cleaners built for the job, not general-purpose gear.',
      icon: 'FiTool',
    },
    {
      title: 'Flexible Scheduling',
      description: 'We work around your schedule across Kamloops, including weekends.',
      icon: 'FiCalendar',
    },
  ];

  const comparisonData = [
    { feature: 'Professional Equipment', masterpiece: true, competitors: false, shine: true },
    { feature: 'Eco-Friendly Products', masterpiece: true, competitors: 'Varies', shine: true },
    { feature: 'WorkSafeBC Certified', masterpiece: true, competitors: false, shine: true },
    { feature: 'Satisfaction Guarantee', masterpiece: true, competitors: false, shine: true },
    { feature: 'Fast Turnaround Available', masterpiece: true, competitors: false, shine: true },
    { feature: 'Fully Insured ($5M coverage)', masterpiece: true, competitors: 'Varies', shine: true },
  ];

  const processSteps = [
    { step: 1, title: 'Free Estimate', description: 'We provide a detailed quote with no obligation' },
    { step: 2, title: 'Schedule Service', description: 'Choose a convenient time that works for you' },
    { step: 3, title: 'Professional Cleaning', description: 'Our certified technicians perform the service' },
    { step: 4, title: 'Quality Inspection', description: 'We ensure every detail meets our standards' },
    { step: 5, title: 'Customer Satisfaction', description: 'We follow up to ensure you are completely satisfied' },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Why Choose Us', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <WhyUsClient benefits={benefits} comparisonData={comparisonData} processSteps={processSteps} />
    </>
  );
}