import ServicesClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Window & Exterior Cleaning Solutions',
  description:
    'Comprehensive exterior cleaning services including residential & commercial window washing, pressure washing, and quarterly maintenance plans across Ontario.',
  openGraph: {
    title: 'Professional Window & Exterior Cleaning Services | Shine Windows',
    description:
      'Explore our full line of residential, commercial, and pressure washing solutions.',
  },
};

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Residential Window Cleaning',
      description:
        'Professional window cleaning for homes, apartments, and condos. We ensure streak-free results and attention to detail.',
      features: [
        'Interior and exterior cleaning',
        'Screen cleaning included',
        'Hard water stain removal',
        'Track cleaning',
        'Eco-friendly cleaning solutions',
      ],
      icon: 'FiHome',
    },
    {
      id: 2,
      title: 'Commercial Window Cleaning',
      description:
        'Office buildings, retail spaces, and commercial properties. We work around your schedule with minimal disruption.',
      features: [
        'High-rise capabilities',
        'Regular maintenance programs',
        'Customized scheduling',
        'Pressure washing services',
        'Safety-certified technicians',
      ],
      icon: 'FiBriefcase',
    },
    {
      id: 3,
      title: 'Pressure Washing Services',
      description:
        'Exterior cleaning for sidewalks, driveways, decks, and building exteriors to restore their original beauty.',
      features: [
        'Soft wash technology',
        'Concrete cleaning',
        'Deck and fence restoration',
        'Building exterior cleaning',
        'Eco-friendly detergents',
      ],
      icon: 'FiDroplet',
    },
    {
      id: 4,
      title: 'Regular Maintenance Plans',
      description:
        'Scheduled cleaning plans to keep your property looking its best all year round at discounted rates.',
      features: [
        'Customizable schedules',
        'Priority booking',
        '10-20% discount',
        'Consistent quality',
        'No contract required',
      ],
      icon: 'FiCalendar',
    },
  ];

  const benefits = [
    'Increased property value and curb appeal',
    'Improved natural lighting and energy efficiency',
    'Extended window lifespan and reduced maintenance costs',
    'Professional results with streak-free finish',
    'Safe and environmentally friendly cleaning methods',
  ];

  const pricing = [
    {
      service: 'Residential (Standard Home)',
      details: 'Up to 20 windows',
      price: '$129',
    },
    {
      service: 'Residential (Large Home)',
      details: '21-40 windows',
      price: '$199',
    },
    {
      service: 'Commercial (Small Office)',
      details: 'Up to 50 windows',
      price: '$349',
    },
    {
      service: 'Commercial (Medium Office)',
      details: '51-100 windows',
      price: '$499',
    },
    {
      service: 'Pressure Washing (Driveway)',
      details: 'Standard 2-car driveway',
      price: '$149',
    },
    {
      service: 'Pressure Washing (Deck)',
      details: 'Up to 300 sq. ft.',
      price: '$179',
    },
    {
      service: 'Maintenance Plan (Quarterly)',
      details: '4 visits per year',
      price: '$99/month',
    },
  ];

  return (
    <ServicesClient
      services={services}
      benefits={benefits}
      pricing={pricing}
    />
  );
}