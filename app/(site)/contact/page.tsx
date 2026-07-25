import type { Metadata } from 'next';
import ContactClient from './page.client';

export const metadata: Metadata = {
  title: 'Contact Us | Free Quote for Window & Gutter Cleaning',
  description:
    'Contact Shine Windows for professional exterior cleaning services across Toronto, Mississauga, Oakville, and GTA. Get a free, instant estimate today!',
  openGraph: {
    title: 'Get a Free Quote | Shine Windows & Gutters',
    description:
      'Schedule window or gutter cleaning in Ontario. Fast response times and satisfaction guaranteed.',
  },
};

export default function ContactPage() {
  const serviceAreas = [
    'Toronto',
    'Mississauga',
    'Brampton',
    'Markham',
    'Vaughan',
    'Richmond Hill',
    'Oakville',
    'Burlington',
    'Hamilton',
    'Oshawa',
  ];

  const faqs = [
    {
      question: 'How quickly can you schedule my service?',
      answer:
        'We typically schedule residential services within 2-3 business days and commercial services within 1 week. Emergency services may be available sooner.',
    },
    {
      question: 'Do I need to be home during the service?',
      answer:
        "For exterior cleaning, you don't need to be home. For interior cleaning, we'll need access to your property. We're happy to work with your schedule.",
    },
    {
      question: 'Are your cleaning solutions safe for children and pets?',
      answer:
        'Absolutely! We use 100% eco-friendly, non-toxic cleaning solutions that are safe for your family and pets.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit, e-transfer, and cash. Commercial clients may be eligible for net-30 terms.',
    },
    {
      question: 'Do you offer service guarantees?',
      answer:
        "Yes! We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll return to make it right at no additional cost.",
    },
  ];

  return <ContactClient serviceAreas={serviceAreas} faqs={faqs} />;
}