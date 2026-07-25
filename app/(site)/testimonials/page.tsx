import TestimonialsClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | Shine Windows',
  description:
    'Read real customer reviews and watch video testimonials from residential and commercial client stories across Ontario.',
  openGraph: {
    title: 'Client Reviews | Shine Windows & Exterior Cleaning',
    description:
      'See why homeowners and property managers trust Shine Windows for reliable exterior cleaning.',
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      rating: 5,
      content:
        'The team at ShineWindows did an amazing job on our home. The windows are sparkling clean and they were very professional and efficient.',
      category: 'residential',
      date: '2023-08-15',
    },
    {
      id: 2,
      name: 'Michael Thompson',
      role: 'Business Owner',
      rating: 5,
      content:
        "We've been using ShineWindows for our office building for 3 years now. Consistent quality and reliable service. Highly recommend!",
      category: 'commercial',
      date: '2023-07-22',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      rating: 5,
      content:
        'They handled our 20-story building with ease. The windows look incredible and the crew was very safety-conscious.',
      category: 'highrise',
      date: '2023-09-01',
    },
    {
      id: 4,
      name: 'David Chen',
      role: 'Restaurant Owner',
      rating: 5,
      content:
        'Our storefront windows had years of built-up grime. ShineWindows made them look brand new! Customers have commented on the difference.',
      category: 'commercial',
      date: '2023-08-05',
    },
    {
      id: 5,
      name: 'Jennifer Wilson',
      role: 'Homeowner',
      rating: 5,
      content:
        "I'm extremely impressed with their attention to detail. They even cleaned the window tracks which no other company has done before.",
      category: 'residential',
      date: '2023-07-30',
    },
    {
      id: 6,
      name: 'Robert Kim',
      role: 'Facility Manager',
      rating: 5,
      content:
        'We schedule quarterly cleanings with ShineWindows. Their maintenance program keeps our building looking professional year-round.',
      category: 'commercial',
      date: '2023-08-18',
    },
  ];

  const videoTestimonials = [
    {
      id: 1,
      title: 'Residential Transformation',
      description: "See how we transformed this homeowner's property",
    },
    {
      id: 2,
      title: 'Commercial Building Renewal',
      description: 'Office building restoration in downtown Toronto',
    },
    {
      id: 3,
      title: 'Pressure Washing Results',
      description: 'Driveway and deck cleaning process and results',
    },
  ];

  return (
    <TestimonialsClient
      testimonials={testimonials}
      videoTestimonials={videoTestimonials}
    />
  );
}