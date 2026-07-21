import type { Metadata } from 'next';
import HomeClient from './page.client';

export const metadata: Metadata = {
  title: 'Shine Windows & Gutters | Window & Exterior Cleaning in Canada',
  description:
    'Professional window cleaning, gutter maintenance, and exterior home care services. Request a free quote today!',
  openGraph: {
    title: 'Shine Windows & Gutters | Professional Cleaning Services',
    description: 'Crystal clear windows and reliable home exterior maintenance.',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}