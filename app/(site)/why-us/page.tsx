import WhyUsClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Us | Shine Windows & Exterior Cleaning',
  description:
    'Discover why homeowners and businesses across Ontario choose Shine Windows. 15+ years experience, $5M liability insurance, and a 100% satisfaction guarantee.',
  openGraph: {
    title: 'Why Choose Shine Windows | Fully Insured & Certified Cleaning',
    description:
      'Eco-friendly solutions, safety-certified technicians, and state-of-the-art cleaning equipment.',
  },
};

export default function WhyUsPage() {
  const benefits = [
    {
      title: 'Professional Expertise',
      description:
        'Our team has over 15 years of industry experience and undergoes regular training',
      icon: 'FiAward',
    },
    {
      title: 'Quality Guarantee',
      description: 'We offer a 100% satisfaction guarantee on all our services',
      icon: 'FiCheckCircle',
    },
    {
      title: 'Eco-Friendly Solutions',
      description:
        'We use environmentally safe cleaning products that are gentle on surfaces',
      icon: 'FiDroplet',
    },
    {
      title: 'Insured & Certified',
      description:
        'Fully insured with $5M liability coverage and safety-certified technicians',
      icon: 'FiShield',
    },
    {
      title: 'Advanced Equipment',
      description: 'State-of-the-art tools for superior results and efficiency',
      icon: 'FiTool',
    },
    {
      title: 'Flexible Scheduling',
      description:
        'We work around your schedule, including evenings and weekends',
      icon: 'FiCalendar',
    },
  ];

  const comparisonData = [
    {
      feature: 'Professional Equipment',
      shine: true,
      competitors: false,
    },
    {
      feature: 'Eco-Friendly Products',
      shine: true,
      competitors: 'Sometimes',
    },
    {
      feature: 'Safety Certified',
      shine: true,
      competitors: false,
    },
    {
      feature: '100% Satisfaction Guarantee',
      shine: true,
      competitors: false,
    },
    {
      feature: 'Same Day Service Available',
      shine: true,
      competitors: false,
    },
    {
      feature: 'Fully Insured ($5M coverage)',
      shine: true,
      competitors: '$2M coverage',
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Free Estimate',
      description: 'We provide a detailed quote with no obligation',
    },
    {
      step: 2,
      title: 'Schedule Service',
      description: 'Choose a convenient time that works for you',
    },
    {
      step: 3,
      title: 'Professional Cleaning',
      description: 'Our certified technicians perform the service',
    },
    {
      step: 4,
      title: 'Quality Inspection',
      description: 'We ensure every detail meets our standards',
    },
    {
      step: 5,
      title: 'Customer Satisfaction',
      description: 'We follow up to ensure you are completely satisfied',
    },
  ];

  return (
    <WhyUsClient
      benefits={benefits}
      comparisonData={comparisonData}
      processSteps={processSteps}
    />
  );
}