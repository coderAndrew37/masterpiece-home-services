import type { Metadata } from 'next';

import ContactClient from './page.client';
import { sanityFetch } from '@/lib/sanity/client';
import { serviceAreasQuery } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Contact Us | Free Quote for Window & Gutter Cleaning',
  description:
    'Contact Masterpiece Home Services for professional exterior cleaning services across Kamloops, Sun Peaks, and the Thompson-Okanagan region. Get a free, instant estimate today!',
  openGraph: {
    title: 'Get a Free Quote | Masterpiece Home Services',
    description:
      'Schedule window or eavestrough cleaning in Kamloops, BC. Fast response times and satisfaction guaranteed.',
  },
};

interface ServiceAreaItem {
  _id: string;
  name: string;
  slug: string;
}

export default async function ContactPage() {
  const serviceAreas = (await sanityFetch<ServiceAreaItem[]>({
    query: serviceAreasQuery,
  })) || [];

  const faqs = [
    {
      question: 'How quickly can you schedule my service?',
      answer:
        'We typically schedule residential services within 2-3 business days and commercial services within 1 week. Emergency services may be available sooner.',
    },
    {
      question: 'Do I need to be home during the service?',
      answer:
        "For exterior cleaning, you don't need to be home as long as exterior water spigots are accessible. For interior detailing, we will coordinate access with you.",
    },
    {
      question: 'Are your cleaning solutions safe for plants and pets?',
      answer:
        'Absolutely! We use eco-friendly, biodegradable cleaning solutions along with pure water filtration systems that protect your landscaping and pets.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept Interac e-Transfer, major credit cards, and cheque.',
    },
    {
      question: 'Do you offer service guarantees?',
      answer:
        "Yes! We offer a 100% satisfaction guarantee. If you're not completely happy with our work, we'll return to make it right at no additional cost.",
    },
  ];

  return <ContactClient serviceAreas={serviceAreas} faqs={faqs} />;
}