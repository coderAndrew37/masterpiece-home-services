import type { Metadata } from 'next';
import AboutClient from './page.client';

export const metadata: Metadata = {
  title: 'About Us | Shine Windows & Exterior Cleaning',
  description:
    'Learn about Shine Windows. Trusted professional window and gutter cleaning team serving residential and commercial clients since 2010.',
  openGraph: {
    title: 'About Shine Windows | Our Story & Leadership Team',
    description:
      'Providing exceptional residential and commercial exterior cleaning across Ontario.',
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Michael Johnson',
      role: 'Founder & CEO',
      bio: 'With over 20 years in the industry, Michael started Shine Windows with a vision for exceptional service.',
      img: 'team1',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Operations Manager',
      bio: 'Sarah ensures every project runs smoothly and exceeds customer expectations.',
      img: 'team2',
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Lead Technician',
      bio: 'David brings expertise in both residential and high-rise commercial window cleaning.',
      img: 'team3',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Customer Success',
      bio: 'Emily is dedicated to ensuring every client has an outstanding experience.',
      img: 'team4',
    },
  ];

  const timelineEvents = [
    {
      year: '2010',
      title: 'Company Founded',
      description:
        'Started with a single truck and a commitment to quality service',
    },
    {
      year: '2013',
      title: 'Commercial Division Launch',
      description:
        'Expanded services to include commercial properties and high-rise buildings',
    },
    {
      year: '2016',
      title: 'Eco-Friendly Initiative',
      description:
        'Transitioned to 100% environmentally friendly cleaning solutions',
    },
    {
      year: '2019',
      title: 'Toronto Expansion',
      description: 'Opened second location to serve the Greater Toronto Area',
    },
    {
      year: '2022',
      title: '5,000th Customer',
      description: 'Celebrated serving our 5,000th satisfied customer',
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description:
        'We strive for perfection in every job, no matter how big or small',
    },
    {
      title: 'Integrity',
      description:
        'Honest pricing, transparent communication, and ethical business practices',
    },
    {
      title: 'Safety',
      description:
        'Rigorous safety protocols to protect our team and your property',
    },
    {
      title: 'Sustainability',
      description: 'Environmentally responsible methods and solutions',
    },
    {
      title: 'Community',
      description:
        'Active supporters of local charities and community initiatives',
    },
  ];

  return (
    <AboutClient
      teamMembers={teamMembers}
      timelineEvents={timelineEvents}
      values={values}
    />
  );
}