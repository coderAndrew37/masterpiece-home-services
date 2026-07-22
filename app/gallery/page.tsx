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
    { id: 1, category: 'residential', title: 'Modern Home Transformation', src: '/images/gallery/residential-1.jpg' },
    { id: 2, category: 'commercial', title: 'Office Building Restoration', src: '/images/gallery/commercial-1.jpg' },
    { id: 3, category: 'highrise', title: 'Downtown Skyscraper', src: '/images/gallery/highrise-1.jpg' },
    { id: 4, category: 'residential', title: 'Suburban Home Makeover', src: '/images/gallery/residential-2.jpg' },
    { id: 5, category: 'pressure', title: 'Driveway Renewal', src: '/images/gallery/pressure-1.jpg' },
    { id: 6, category: 'commercial', title: 'Retail Storefront', src: '/images/gallery/commercial-2.jpg' },
    { id: 7, category: 'residential', title: 'Historic Home Restoration', src: '/images/gallery/residential-3.jpg' },
    { id: 8, category: 'highrise', title: 'Condominium Complex', src: '/images/gallery/highrise-2.jpg' },
    { id: 9, category: 'pressure', title: 'Deck Refinishing', src: '/images/gallery/pressure-2.jpg' },
    { id: 10, category: 'residential', title: 'Luxury Estate', src: '/images/gallery/residential-4.jpg' },
    { id: 11, category: 'commercial', title: 'Shopping Center', src: '/images/gallery/commercial-3.jpg' },
    { id: 12, category: 'pressure', title: 'Building Exterior', src: '/images/gallery/pressure-3.jpg' },
  ];

  return <GalleryClient categories={categories} images={images} />;
}