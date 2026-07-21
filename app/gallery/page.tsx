import type { Metadata } from 'next';
import GalleryClient from './gallery.client';

export const metadata: Metadata = {
  title: 'Project Gallery | Window & Exterior Cleaning Portfolio',
  description:
    'Explore our portfolio of completed residential, commercial, high-rise window cleaning, and pressure washing projects across Ontario.',
  openGraph: {
    title: 'Work Gallery | Shine Windows & Gutters',
    description:
      'View real transformations from our commercial and residential exterior cleaning projects.',
  },
};

export default function GalleryPage() {
  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'highrise', name: 'High-Rise' },
    { id: 'pressure', name: 'Pressure Washing' },
  ];

  const images = [
    { id: 1, category: 'residential', title: 'Modern Home Transformation' },
    { id: 2, category: 'commercial', title: 'Office Building Restoration' },
    { id: 3, category: 'highrise', title: 'Downtown Skyscraper' },
    { id: 4, category: 'residential', title: 'Suburban Home Makeover' },
    { id: 5, category: 'pressure', title: 'Driveway Renewal' },
    { id: 6, category: 'commercial', title: 'Retail Storefront' },
    { id: 7, category: 'residential', title: 'Historic Home Restoration' },
    { id: 8, category: 'highrise', title: 'Condominium Complex' },
    { id: 9, category: 'pressure', title: 'Deck Refinishing' },
    { id: 10, category: 'residential', title: 'Luxury Estate' },
    { id: 11, category: 'commercial', title: 'Shopping Center' },
    { id: 12, category: 'pressure', title: 'Building Exterior' },
  ];

  return <GalleryClient categories={categories} images={images} />;
}