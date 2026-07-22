import { ServiceItem } from '@/types';
import ServicesClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Property Services | Masterpiece Home Services Kamloops',
  description:
    'Explore our complete range of exterior and interior home services in Kamloops: pure-water window detailing, eavestroughs, house soft washing, pressure washing, indoor cleaning, and holiday light setup.',
  openGraph: {
    title: 'Professional Home & Exterior Services | Masterpiece Kamloops',
    description:
      'Window detailing, eavestrough flushing, soft washing, indoor house cleaning, and seasonal Christmas lights installation.',
  },
};


export interface PricingOption {
  service: string;
  details: string;
  price: string;
}

export default function ServicesPage() {
  const services: ServiceItem[] = [
  {
    id: 1,
    slug: 'window-cleaning',
    title: 'Pure-Water Window Detailing',
    image: '/images/residential-1.jpg',
    shortDesc: 'Streak-free interior and exterior glass cleaning using pure deionized water systems.',
    features: ['Pure deionized water technology', 'Interior & exterior glass detailing', 'Sills, tracks & frame wipes included', 'Screen washing included'],
    icon: 'FiHome',
    badge: 'Most Popular',
  },
  {
    id: 2,
    slug: 'eavestroughs',
    title: 'Eavestrough & Gutter Clearing',
image: '/images/residential-1.jpg',
    shortDesc: 'Prevent water damage and foundation erosion with complete gutter debris removal.',
    features: ['Hand-clearing pine needles & debris', 'Full high-pressure downspout flush', 'Gutter exterior face soft scrub', 'Pre-winter ice dam protection'],
    icon: 'FiDroplet',
  },
  {
    id: 3,
    slug: 'soft-washing',
    title: 'House Soft Washing',
   image: '/images/residential-1.jpg',
    shortDesc: 'Safe, low-pressure exterior washing that eliminates algae, moss, and dirt from siding.',
    features: ['Eco-friendly biodegradable detergent', 'Low-pressure zero-damage application', 'Algae, mold & mildew elimination', 'Protects paint & siding warranties'],
    icon: 'FiSun',
  },
  {
    id: 4,
    slug: 'pressure-washing',
    title: 'Pressure & Surface Washing',
  image: '/images/residential-1.jpg',
    shortDesc: 'High-volume surface cleaning to restore driveways, walkways, patios, and decks.',
    features: ['Heavy oil & dirt stain lifting', 'Concrete driveway rotary scrubbing', 'Patio & composite deck detailing', 'Slip-hazard moss removal'],
    icon: 'FiZap',
  },
  {
    id: 5,
    slug: 'indoor-cleaning',
    title: 'Indoor House Cleaning',
    image: '/images/residential-1.jpg',
    shortDesc: 'Comprehensive interior housekeeping, deep cleaning, and move-in/move-out detailing.',
    features: ['Kitchen & bathroom deep sanitization', 'Whole-home floor vacuuming & mopping', 'Dusting, baseboards & interior glass', 'Custom recurring care schedules'],
    icon: 'FiShield',
    badge: 'New Service',
  },
  {
    id: 6,
    slug: 'christmas-lights',
    title: 'Christmas Lights Installation',
image: '/images/residential-1.jpg',
    shortDesc: 'Turnkey holiday lighting: commercial-grade LED supply, safe hanging, and takedown.',
    features: ['Custom-fit commercial LED strands', 'Zero-damage gutter/shingle clips', 'In-season replacement guarantee', 'Post-holiday removal & box storage'],
    icon: 'FiCalendar',
    badge: 'Winter Special',
  },
];

  const benefits = [
    'Restores and protects your property value & curb appeal',
    'Prevents costly water damage, rot, and glass degradation',
    'Fully insured ($5M liability) and WorkSafeBC covered crew',
    'Eco-friendly, child & pet-safe cleaning solutions',
    'Convenient 24-hour fast quotes and simple online booking',
  ];

  const pricing: PricingOption[] = [
    {
      service: 'Residential Window Detailing',
      details: 'Interior & exterior (Up to 25 windows)',
      price: '$199',
    },
    {
      service: 'Full Eavestrough & Downspout Flush',
      details: 'Standard 2-story home',
      price: '$169',
    },
    {
      service: 'House Soft Wash (Siding & Trim)',
      details: 'Up to 2,500 sq. ft. home',
      price: '$249',
    },
    {
      service: 'Concrete Driveway Surface Wash',
      details: 'Standard 2-car driveway',
      price: '$149',
    },
    {
      service: 'Indoor House Deep Clean',
      details: '3 Bedroom / 2 Bath home',
      price: '$219',
    },
    {
      service: 'Custom Christmas Light Installation',
      details: 'Design, install, removal & storage',
      price: 'from $299',
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