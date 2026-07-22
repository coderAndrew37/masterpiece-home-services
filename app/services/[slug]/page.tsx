import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import FAQ from '@/components/FAQ';
import CustomQuoteBanner from '@/components/CustomQuoteBanner';
import CtaBanner from '@/components/CtaBanner';
import ServiceCalculator from '@/components/ServiceCalculator';
import {
  FiCheckCircle,
  FiPhoneCall,
  FiArrowRight,
  FiShield,
  FiClock,
  FiAward,
  FiStar,
} from 'react-icons/fi';

// Define full interface for dedicated service data
export interface DetailedService {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  badge?: string;
  startingPrice: string;
  description: string[];
  processSteps: { title: string; desc: string }[];
  whatsIncluded: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

// 1. Data Store for All Services
const servicesData: Record<string, DetailedService> = {
  'window-cleaning': {
    slug: 'window-cleaning',
    title: 'Pure-Water Window Detailing',
    subtitle: 'Streak-Free Interior & Exterior Window Cleaning in Kamloops',
    heroImage: '/images/services/window-cleaning.jpg',
    badge: 'Most Popular',
    startingPrice: '$199',
    description: [
      'Over time, hard water mineral deposits, dust, pollen, and spider webs accumulate on your home’s glass, degrading natural light and damaging window seals.',
      'Our team uses pure 100% deionized water technology that acts as a natural magnet for dirt, drying completely spot-free without chemical residues that attract dust.',
    ],
    processSteps: [
      {
        title: '1. Frame & Sill Vacuum / Wipe',
        desc: 'We clear out built-up dead bugs, dust, and debris from your window tracks and sills.',
      },
      {
        title: '2. Pure-Water Exterior Scrub',
        desc: 'Using water-fed carbon fiber poles, we scrub glass and frames clean with deionized water.',
      },
      {
        title: '3. Hand Interior Detailing',
        desc: 'For interior glass, we hand-squeegee using lint-free microfiber towels and eco-friendly solutions.',
      },
      {
        title: '4. Screen Washing & Re-Installation',
        desc: 'Screens are removed, gently scrubbed, rinsed, dried, and re-installed safely.',
      },
    ],
    whatsIncluded: [
      'Pure deionized water exterior wash',
      'Interior glass hand-squeegee polish',
      'Track, sill & frame detailing',
      'Deep screen washing & inspection',
      'Hard water spot treatment',
      '48-Hour Streak-Free Guarantee',
    ],
    benefits: [
      'Allows maximum natural light into your home',
      'Extends the lifespan of window seals and glass panes',
      'Improves curb appeal for hosting or home resale',
      'Eliminates allergic triggers like pollen & mold spores',
    ],
    faqs: [
      {
        question: 'Do I need to be home during the service?',
        answer:
          'If we are only cleaning exterior windows, you do not need to be home as long as gate access is clear. For interior window detailing, an adult must be present to grant access.',
      },
      {
        question: 'What if it rains on the day of my appointment?',
        answer:
          'Rain water is pure water! Rain alone does not cause dirty windows—dirt does. However, if severe storms or high winds occur, we safely reschedule your appointment at no extra charge.',
      },
    ],
  },

  'eavestroughs': {
    slug: 'eavestroughs',
    title: 'Eavestrough & Gutter Clearing',
    subtitle: 'Protect Your Roof, Siding, and Foundation from Water Damage',
    heroImage: '/images/services/gutter-cleaning.jpg',
    startingPrice: '$169',
    description: [
      'Clogged gutters are the #1 cause of basement flooding, roof rot, and winter ice damming in Kamloops.',
      'Our comprehensive gutter clearing service ensures rainwater flows freely away from your foundation all year round.',
    ],
    processSteps: [
      {
        title: '1. Manual Debris Scoop',
        desc: 'We scoop out all leaves, pine needles, and wet sludge by hand into disposal bags.',
      },
      {
        title: '2. Downspout Flush',
        desc: 'We test and flush every downspout with high-volume water to guarantee zero blockages.',
      },
      {
        title: '3. Gutter Face Wash',
        desc: 'We wipe down exterior gutter faces to eliminate black tiger stripes and organic stains.',
      },
    ],
    whatsIncluded: [
      'Full roofline gutter clearing',
      'High-volume downspout testing & flush',
      'Bagging & eco-disposal of organic waste',
      'Exterior gutter face wipe down',
      'Gutter slope & bracket inspection',
    ],
    benefits: [
      'Prevents foundation cracking & basement leaks',
      'Stops winter ice dams from destroying shingles',
      'Deters pests, mosquitoes, and wasps from nesting',
    ],
    faqs: [
      {
        question: 'How often should gutters be cleaned in Kamloops?',
        answer:
          'We recommend cleaning eavestroughs twice a year: in spring after pine pollen drops, and in late autumn after trees shed leaves.',
      },
    ],
  },

  'soft-washing': {
    slug: 'soft-washing',
    title: 'House Soft Washing',
    subtitle: 'Low-Pressure Exterior Siding Cleaning for Vinyl, Stucco & Wood',
    heroImage: '/images/services/soft-washing.jpg',
    startingPrice: '$249',
    description: [
      'High-pressure power washing can strip paint, blast water behind siding, and destroy stucco. Soft washing is the safe, modern alternative.',
      'We use low-pressure sprayers combined with biodegradable cleaning solutions that kill mold, algae, and mildew at the root.',
    ],
    processSteps: [
      {
        title: '1. Pre-Rinse & Plant Protection',
        desc: 'We wet down surrounding garden beds and grass to protect landscaping.',
      },
      {
        title: '2. Low-Pressure Detergent Application',
        desc: 'We apply our custom eco-friendly wash to lift dirt and break down organic spores.',
      },
      {
        title: '3. Gentle Pure-Water Rinse',
        desc: 'We rinse away all residue at garden-hose pressure, leaving siding spotless.',
      },
    ],
    whatsIncluded: [
      'Full exterior house wash (Vinyl, Stucco, Hardie Board)',
      'Soffit, fascia, and gutter face wash',
      'Plant & garden bed pre-hydration & post-rinse',
      'Spider web & bug nest removal',
    ],
    benefits: [
      '100% safe—zero risk of high-pressure siding damage',
      'Results last 3x longer than high-pressure water alone',
      'Kills algae spores at the root level',
    ],
    faqs: [
      {
        question: 'Will soft washing harm my plants or pet?',
        answer:
          'No! We pre-saturate all surrounding landscaping with fresh water before and after detergent application. Once rinsed, it is 100% safe for pets and plants.',
      },
    ],
  },

  'pressure-washing': {
    slug: 'pressure-washing',
    title: 'Pressure & Surface Washing',
    subtitle: 'Deep Surface Scrubbing for Concrete, Driveways & Stone Patios',
    heroImage: '/images/services/pressure-washing.jpg',
    startingPrice: '$149',
    description: [
      'Driveways, walkways, and patios build up oil stains, tire marks, moss, and slippery grime over time.',
      'Our professional rotary surface cleaners restore flat concrete and stone surfaces quickly and evenly without leaving zebra striping.',
    ],
    processSteps: [
      {
        title: '1. Degreaser Treatment',
        desc: 'Pre-treating oil stains and stubborn spots with industrial eco-safe cleaners.',
      },
      {
        title: '2. Rotary Surface Scrubbing',
        desc: 'Using dual-nozzle rotary flat surface cleaners for uniform, deep cleaning.',
      },
      {
        title: '3. Detail Wand Edge & Rinse',
        desc: 'Clearing corners, curb edges, and washing loose dirt into drainage zones.',
      },
    ],
    whatsIncluded: [
      'Concrete driveway & sidewalk cleaning',
      'Stone patio & paver washing',
      'Oil & tire mark pre-treatment',
      'Moss & weed removal from paver joints',
    ],
    benefits: [
      'Eliminates dangerous slippery moss hazards',
      'Restores bright, original stone and concrete finish',
      'Protects concrete from winter spalling & freeze cracks',
    ],
    faqs: [
      {
        question: 'Does surface washing remove deep oil stains?',
        answer:
          'We apply specialized degreasers that draw out deep oil stains. While older oil stains may leave a subtle shadow, the surface dirt and fresh oil will be completely removed.',
      },
    ],
  },

  'indoor-cleaning': {
    slug: 'indoor-cleaning',
    title: 'Indoor House Cleaning',
    subtitle: 'Detailed Housekeeping & Deep Sanitization for Kamloops Homes',
    heroImage: '/images/services/indoor-cleaning.jpg',
    badge: 'New Service',
    startingPrice: '$219',
    description: [
      'Enjoy a pristine interior without spending your weekend scrubbing floors or dusting baseboards.',
      'Our bonded interior housekeeping team provides meticulous deep cleans, move-in/move-out detailing, and recurring care packages.',
    ],
    processSteps: [
      {
        title: '1. Top-Down Dusting',
        desc: 'Clearing cobwebs, ceiling fans, light fixtures, and baseboards.',
      },
      {
        title: '2. Kitchen & Bath Sanitization',
        desc: 'Scrubbing countertops, sinks, tile grout, showers, tubs, and appliance exteriors.',
      },
      {
        title: '3. Floor & Glass Detailing',
        desc: 'Vacuuming carpets, mopping hard floors, and wiping interior glass doors.',
      },
    ],
    whatsIncluded: [
      'Kitchen deep clean & appliance exterior scrub',
      'Bathroom sanitization & grout scrubbing',
      'Baseboard, door frame & light switch dusting',
      'HEPA-filter carpet vacuuming & hard floor mopping',
    ],
    benefits: [
      'Reclaim 6-10 hours of free weekend time every month',
      'Customized cleaning checklists tailored to your lifestyle',
      'Eco-friendly, non-toxic products safe for kids & pets',
    ],
    faqs: [
      {
        question: 'Do you bring your own cleaning supplies?',
        answer:
          'Yes, our team arrives fully equipped with professional HEPA vacuums, microfiber cloths, and eco-safe cleaning supplies.',
      },
    ],
  },

  'christmas-lights': {
    slug: 'christmas-lights',
    title: 'Christmas Lights Installation',
    subtitle: 'Turnkey Holiday Lighting Design, Setup, Maintenance & Storage',
    heroImage: '/images/services/christmas-lights.jpg',
    badge: 'Winter Special',
    startingPrice: 'from $299',
    description: [
      'Skip the dangerous icy ladders and tangled wire hassle this winter.',
      'We handle your entire holiday display: custom commercial LED light fitting, safe ladder installation, season-long bulb replacement, and January removal/storage.',
    ],
    processSteps: [
      {
        title: '1. Custom Design & Sizing',
        desc: 'We measure your rooflines and custom-fit commercial LED strands.',
      },
      {
        title: '2. Safe Professional Installation',
        desc: 'Our insured team uses non-damaging shingle/gutter clips to hang strands.',
      },
      {
        title: '3. In-Season Maintenance & Removal',
        desc: 'If a bulb goes out, we replace it within 24 hours. In January, we safely remove and box everything.',
      },
    ],
    whatsIncluded: [
      'Commercial-grade ultra-bright LED lights (Custom Fit)',
      'Commercial timers & outdoor extension cords',
      '24-Hour maintenance guarantee during the holiday season',
      'Post-holiday removal & organized tote storage',
    ],
    benefits: [
      'Zero risk of ladder falls on icy roofs',
      'Custom-tailored, professional-looking roofline display',
      'Includes removal and storage—no attic clutter',
    ],
    faqs: [
      {
        question: 'Do I get to keep the lights?',
        answer:
          'We supply commercial-grade LEDs on a hassle-free rental model. We store them safely in climate-controlled totes in January so they are ready for next year!',
      },
    ],
  },
};

// 2. Pre-generate Dynamic Routes for Build Time (SEO Boost)
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

// 3. Dynamic Metadata Generator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];

  if (!service) {
    return { title: 'Service Not Found | Masterpiece Kamloops' };
  }

  return {
    title: `${service.title} Kamloops | Masterpiece Home Services`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} | Masterpiece Kamloops`,
      description: service.subtitle,
      images: [{ url: service.heroImage }],
    },
  };
}

// 4. Main Page Component
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/services"
                className="text-xs font-bold text-blue-400 hover:underline uppercase tracking-wider"
              >
                ← All Services
              </Link>
              {service.badge && (
                <span className="bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              {service.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#estimate"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-7 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/30"
              >
                <span>Get Instant Estimate</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:2505550199"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-bold px-6 py-4 rounded-2xl text-sm transition-all"
              >
                <FiPhoneCall className="w-4 h-4 text-blue-400" />
                <span>(250) 555-0199</span>
              </a>

              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-2xl text-xs font-bold text-slate-300">
                Starting at <span className="text-blue-400 text-base font-black ml-1">{service.startingPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Service Overview */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Service Overview
                </h2>
                {service.description.map((paragraph, index) => (
                  <p key={index} className="text-slate-600 leading-relaxed text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* What's Included & Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <FiShield className="text-blue-600 w-5 h-5" /> What’s Included
                  </h3>
                  <ul className="space-y-3">
                    {service.whatsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-slate-700">
                        <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0 mr-2.5 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <FiAward className="text-blue-600 w-5 h-5" /> Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-slate-700">
                        <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0 mr-2.5 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-By-Step Process */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                    How It Works
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Our Step-by-Step Process
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {service.processSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Calculator Anchor */}
              <div id="estimate" className="pt-4">
                <div className="mb-6">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                    Instant Pricing
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Calculate Your Custom Estimate
                  </h2>
                </div>
                <ServiceCalculator />
              </div>

              {/* Custom Quote Banner */}
              <CustomQuoteBanner />

              {/* Service FAQs */}
              <FAQ faqs={service.faqs} title={`Questions About ${service.title}`} />
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Fast Booking Sidebar Widget */}
              <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl sticky top-28 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                    Fast & Simple
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Book This Service
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Get your property serviced by Kamloops’ highest-rated technicians.
                  </p>
                </div>

                <div className="space-y-3 border-y border-slate-800 py-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiShield className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>$5,000,000 Commercial Liability Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiAward className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>WorkSafeBC Covered Staff</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiClock className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>24-Hour Estimate Delivery</span>
                  </div>
                </div>

                <a
                  href="#estimate"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/30"
                >
                  <span>Request Online Quote</span>
                  <FiArrowRight className="w-4 h-4" />
                </a>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-400 block mb-1">Or call our Kamloops dispatch:</span>
                  <a
                    href="tel:2505550199"
                    className="text-white font-black text-lg hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    <FiPhoneCall className="w-4 h-4 text-blue-400" />
                    <span>(250) 555-0199</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title={`Ready to Book ${service.title}?`}
        description="Our team provides streak-free window wash, soft washing, eavestrough care, and Christmas light setups across Kamloops."
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}