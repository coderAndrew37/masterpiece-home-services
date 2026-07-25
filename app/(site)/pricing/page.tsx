import PricingClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Cost Calculator | Window & Gutter Cleaning Rates',
  description:
    'Transparent pricing for residential and commercial window cleaning, gutter maintenance, and pressure washing across Ontario. Estimate your service costs today.',
  openGraph: {
    title: 'Transparent Cleaning Service Rates | Shine Windows',
    description:
      'Clear, honest rates with no hidden fees. Estimate your window and exterior cleaning costs online.',
  },
};

export default function PricingPage() {
  const residentialPricing = [
    {
      title: 'Standard Home',
      description: 'Up to 20 windows',
      price: '$129',
      features: [
        'Interior & exterior cleaning',
        'Screen cleaning included',
        'Track cleaning',
        'Streak-free guarantee',
        'Eco-friendly products',
      ],
      popular: false,
    },
    {
      title: 'Large Home',
      description: '21-40 windows',
      price: '$199',
      features: [
        'Everything in Standard',
        'Hard water stain removal',
        'Screen removal & cleaning',
        'Screen track cleaning',
        'Priority scheduling',
      ],
      popular: true,
    },
    {
      title: 'Premium Package',
      description: '40+ windows',
      price: 'Custom Quote',
      features: [
        'Everything in Large Home',
        'Screen replacement available',
        'Gutter cleaning add-on',
        'Pressure washing add-on',
        'Annual maintenance discount',
      ],
      popular: false,
    },
  ];

  const commercialPricing = [
    {
      title: 'Small Office',
      description: 'Up to 50 windows',
      price: '$349',
      features: [
        'Interior & exterior cleaning',
        'After-hours service available',
        'Monthly maintenance options',
        'Streak-free guarantee',
        'Eco-friendly products',
      ],
      popular: false,
    },
    {
      title: 'Medium Office',
      description: '51-100 windows',
      price: '$499',
      features: [
        'Everything in Small Office',
        'Hard water stain removal',
        'Screen cleaning included',
        'Track cleaning',
        'Priority scheduling',
      ],
      popular: true,
    },
    {
      title: 'Large Commercial',
      description: '100+ windows',
      price: 'Custom Quote',
      features: [
        'Everything in Medium Office',
        'High-rise capabilities',
        'Customized maintenance plans',
        'Dedicated account manager',
        'Volume discounts',
      ],
      popular: false,
    },
  ];

  const addons = [
    { service: 'Gutter Cleaning', price: '$99' },
    { service: 'Pressure Washing (Driveway)', price: '$149' },
    { service: 'Pressure Washing (Deck)', price: '$179' },
    { service: 'Screen Replacement', price: '$25/screen' },
    { service: 'Hard Water Stain Removal', price: '$75' },
    { service: 'Chandelier Cleaning', price: '$125' },
  ];

  const faqs = [
    {
      question: 'Do you offer discounts for regular maintenance?',
      answer:
        'Yes! We offer 10-20% discounts for customers who sign up for our quarterly or monthly maintenance programs.',
    },
    {
      question: 'Are there any hidden fees?',
      answer:
        'No, our prices include all labor, equipment, and cleaning solutions. We provide transparent pricing with no surprises.',
    },
    {
      question: 'How long does a typical service take?',
      answer:
        'For a standard home (20 windows), service typically takes 1-2 hours. Larger properties may take 2-4 hours.',
    },
    {
      question: 'Do I need to be home during the service?',
      answer:
        "For exterior cleaning, you don't need to be home. For interior cleaning, we'll need access to your property.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, cash, and e-transfer. Commercial clients may be eligible for net-30 terms.',
    },
  ];

  return (
    <PricingClient
      residentialPricing={residentialPricing}
      commercialPricing={commercialPricing}
      addons={addons}
      faqs={faqs}
    />
  );
}