// scripts/seedServices.ts
import { createClient } from '@sanity/client';
import 'dotenv/config';

// with:
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});



interface ProcessStep {
  _key: string;
  title: string;
  desc: string;
}

interface Faq {
  _key: string;
  question: string;
  answer: string;
}

interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style: string;
  children: PortableTextSpan[];
  markDefs: unknown[];
}

interface ServiceSeed {
  _id: string;
  _type: 'service';
  title: string;
  slug: { _type: 'slug'; current: string };
  order: number;
  featuredOnHome: boolean;
  homeSubtitle?: string;
  badge?: string;
  icon: string;
  shortDescription: string;
  features: string[];
  subtitle: string;
  startingPrice: string;
  description: PortableTextBlock[];
  processSteps: ProcessStep[];
  whatsIncluded: string[];
  benefits: string[];
  faqs: Faq[];
}

function toBlocks(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: crypto.randomUUID(),
    style: 'normal',
    children: [{ _type: 'span', _key: crypto.randomUUID(), text, marks: [] }],
    markDefs: [],
  }));
}

function withKeys<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ _key: crypto.randomUUID(), ...item }));
}

const services: ServiceSeed[] = [
  {
    _id: 'service-window-cleaning',
    _type: 'service',
    title: 'Pure-Water Window Detailing',
    slug: { _type: 'slug', current: 'window-cleaning' },
    order: 1,
    featuredOnHome: true,
    homeSubtitle: 'Streak-free pure water cleaning',
    badge: 'Most Popular',
    icon: 'FiHome',
    shortDescription:
      'Streak-free interior and exterior glass cleaning using pure deionized water systems.',
    features: [
      'Pure deionized water technology',
      'Interior & exterior glass detailing',
      'Sills, tracks & frame wipes included',
      'Screen washing included',
    ],
    subtitle: 'Streak-Free Interior & Exterior Window Cleaning in Kamloops',
    startingPrice: '$199',
    description: toBlocks([
      "Over time, hard water mineral deposits, dust, pollen, and spider webs accumulate on your home's glass, degrading natural light and damaging window seals.",
      'Our team uses pure 100% deionized water technology that acts as a natural magnet for dirt, drying completely spot-free without chemical residues that attract dust.',
    ]),
    processSteps: withKeys([
      { title: '1. Frame & Sill Vacuum / Wipe', desc: 'We clear out built-up dead bugs, dust, and debris from your window tracks and sills.' },
      { title: '2. Pure-Water Exterior Scrub', desc: 'Using water-fed carbon fiber poles, we scrub glass and frames clean with deionized water.' },
      { title: '3. Hand Interior Detailing', desc: 'For interior glass, we hand-squeegee using lint-free microfiber towels and eco-friendly solutions.' },
      { title: '4. Screen Washing & Re-Installation', desc: 'Screens are removed, gently scrubbed, rinsed, dried, and re-installed safely.' },
    ]),
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
    faqs: withKeys([
      { question: 'Do I need to be home during the service?', answer: 'If we are only cleaning exterior windows, you do not need to be home as long as gate access is clear. For interior window detailing, an adult must be present to grant access.' },
      { question: 'What if it rains on the day of my appointment?', answer: 'Rain water is pure water! Rain alone does not cause dirty windows—dirt does. However, if severe storms or high winds occur, we safely reschedule your appointment at no extra charge.' },
    ]),
  },

  {
    _id: 'service-eavestroughs',
    _type: 'service',
    title: 'Eavestrough & Gutter Clearing',
    slug: { _type: 'slug', current: 'eavestroughs' },
    order: 2,
    featuredOnHome: true,
    homeSubtitle: 'Debris clearing & flow testing',
    icon: 'FiDroplet',
    shortDescription:
      'Prevent water damage and foundation erosion with complete gutter debris removal.',
    features: [
      'Hand-clearing pine needles & debris',
      'Full high-pressure downspout flush',
      'Gutter exterior face soft scrub',
      'Pre-winter ice dam protection',
    ],
    subtitle: 'Protect Your Roof, Siding, and Foundation from Water Damage',
    startingPrice: '$169',
    description: toBlocks([
      'Clogged gutters are the #1 cause of basement flooding, roof rot, and winter ice damming in Kamloops.',
      'Our comprehensive gutter clearing service ensures rainwater flows freely away from your foundation all year round.',
    ]),
    processSteps: withKeys([
      { title: '1. Manual Debris Scoop', desc: 'We scoop out all leaves, pine needles, and wet sludge by hand into disposal bags.' },
      { title: '2. Downspout Flush', desc: 'We test and flush every downspout with high-volume water to guarantee zero blockages.' },
      { title: '3. Gutter Face Wash', desc: 'We wipe down exterior gutter faces to eliminate black tiger stripes and organic stains.' },
    ]),
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
    faqs: withKeys([
      { question: 'How often should gutters be cleaned in Kamloops?', answer: 'We recommend cleaning eavestroughs twice a year: in spring after pine pollen drops, and in late autumn after trees shed leaves.' },
    ]),
  },

  {
    _id: 'service-soft-washing',
    _type: 'service',
    title: 'House Soft Washing',
    slug: { _type: 'slug', current: 'soft-washing' },
    order: 3,
    featuredOnHome: true,
    homeSubtitle: 'Gentle siding & brick restoration',
    icon: 'FiSun',
    shortDescription:
      'Safe, low-pressure exterior washing that eliminates algae, moss, and dirt from siding.',
    features: [
      'Eco-friendly biodegradable detergent',
      'Low-pressure zero-damage application',
      'Algae, mold & mildew elimination',
      'Protects paint & siding warranties',
    ],
    subtitle: 'Low-Pressure Exterior Siding Cleaning for Vinyl, Stucco & Wood',
    startingPrice: '$249',
    description: toBlocks([
      'High-pressure power washing can strip paint, blast water behind siding, and destroy stucco. Soft washing is the safe, modern alternative.',
      'We use low-pressure sprayers combined with biodegradable cleaning solutions that kill mold, algae, and mildew at the root.',
    ]),
    processSteps: withKeys([
      { title: '1. Pre-Rinse & Plant Protection', desc: 'We wet down surrounding garden beds and grass to protect landscaping.' },
      { title: '2. Low-Pressure Detergent Application', desc: 'We apply our custom eco-friendly wash to lift dirt and break down organic spores.' },
      { title: '3. Gentle Pure-Water Rinse', desc: 'We rinse away all residue at garden-hose pressure, leaving siding spotless.' },
    ]),
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
    faqs: withKeys([
      { question: 'Will soft washing harm my plants or pet?', answer: 'No! We pre-saturate all surrounding landscaping with fresh water before and after detergent application. Once rinsed, it is 100% safe for pets and plants.' },
    ]),
  },

  {
    _id: 'service-pressure-washing',
    _type: 'service',
    title: 'Pressure & Surface Washing',
    slug: { _type: 'slug', current: 'pressure-washing' },
    order: 4,
    featuredOnHome: false,
    icon: 'FiZap',
    shortDescription:
      'High-volume surface cleaning to restore driveways, walkways, patios, and decks.',
    features: [
      'Heavy oil & dirt stain lifting',
      'Concrete driveway rotary scrubbing',
      'Patio & composite deck detailing',
      'Slip-hazard moss removal',
    ],
    subtitle: 'Deep Surface Scrubbing for Concrete, Driveways & Stone Patios',
    startingPrice: '$149',
    description: toBlocks([
      'Driveways, walkways, and patios build up oil stains, tire marks, moss, and slippery grime over time.',
      'Our professional rotary surface cleaners restore flat concrete and stone surfaces quickly and evenly without leaving zebra striping.',
    ]),
    processSteps: withKeys([
      { title: '1. Degreaser Treatment', desc: 'Pre-treating oil stains and stubborn spots with industrial eco-safe cleaners.' },
      { title: '2. Rotary Surface Scrubbing', desc: 'Using dual-nozzle rotary flat surface cleaners for uniform, deep cleaning.' },
      { title: '3. Detail Wand Edge & Rinse', desc: 'Clearing corners, curb edges, and washing loose dirt into drainage zones.' },
    ]),
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
    faqs: withKeys([
      { question: 'Does surface washing remove deep oil stains?', answer: 'We apply specialized degreasers that draw out deep oil stains. While older oil stains may leave a subtle shadow, the surface dirt and fresh oil will be completely removed.' },
    ]),
  },

  {
    _id: 'service-indoor-cleaning',
    _type: 'service',
    title: 'Indoor House Cleaning',
    slug: { _type: 'slug', current: 'indoor-cleaning' },
    order: 5,
    featuredOnHome: false,
    badge: 'New Service',
    icon: 'FiShield',
    shortDescription:
      'Comprehensive interior housekeeping, deep cleaning, and move-in/move-out detailing.',
    features: [
      'Kitchen & bathroom deep sanitization',
      'Whole-home floor vacuuming & mopping',
      'Dusting, baseboards & interior glass',
      'Custom recurring care schedules',
    ],
    subtitle: 'Detailed Housekeeping & Deep Sanitization for Kamloops Homes',
    startingPrice: '$219',
    description: toBlocks([
      'Enjoy a pristine interior without spending your weekend scrubbing floors or dusting baseboards.',
      'Our bonded interior housekeeping team provides meticulous deep cleans, move-in/move-out detailing, and recurring care packages.',
    ]),
    processSteps: withKeys([
      { title: '1. Top-Down Dusting', desc: 'Clearing cobwebs, ceiling fans, light fixtures, and baseboards.' },
      { title: '2. Kitchen & Bath Sanitization', desc: 'Scrubbing countertops, sinks, tile grout, showers, tubs, and appliance exteriors.' },
      { title: '3. Floor & Glass Detailing', desc: 'Vacuuming carpets, mopping hard floors, and wiping interior glass doors.' },
    ]),
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
    faqs: withKeys([
      { question: 'Do you bring your own cleaning supplies?', answer: 'Yes, our team arrives fully equipped with professional HEPA vacuums, microfiber cloths, and eco-safe cleaning supplies.' },
    ]),
  },

  {
    _id: 'service-christmas-lights',
    _type: 'service',
    title: 'Christmas Lights Installation',
    slug: { _type: 'slug', current: 'christmas-lights' },
    order: 6,
    featuredOnHome: true,
    homeSubtitle: 'Custom LED setup & removal',
    badge: 'Winter Special',
    icon: 'FiCalendar',
    shortDescription:
      'Turnkey holiday lighting: commercial-grade LED supply, safe hanging, and takedown.',
    features: [
      'Custom-fit commercial LED strands',
      'Zero-damage gutter/shingle clips',
      'In-season replacement guarantee',
      'Post-holiday removal & box storage',
    ],
    subtitle: 'Turnkey Holiday Lighting Design, Setup, Maintenance & Storage',
    startingPrice: 'from $299',
    description: toBlocks([
      'Skip the dangerous icy ladders and tangled wire hassle this winter.',
      'We handle your entire holiday display: custom commercial LED light fitting, safe ladder installation, season-long bulb replacement, and January removal/storage.',
    ]),
    processSteps: withKeys([
      { title: '1. Custom Design & Sizing', desc: 'We measure your rooflines and custom-fit commercial LED strands.' },
      { title: '2. Safe Professional Installation', desc: 'Our insured team uses non-damaging shingle/gutter clips to hang strands.' },
      { title: '3. In-Season Maintenance & Removal', desc: 'If a bulb goes out, we replace it within 24 hours. In January, we safely remove and box everything.' },
    ]),
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
    faqs: withKeys([
      { question: 'Do I get to keep the lights?', answer: 'We supply commercial-grade LEDs on a hassle-free rental model. We store them safely in climate-controlled totes in January so they are ready for next year!' },
    ]),
  },
];

async function run() {
  const tx = client.transaction();
  services.forEach((doc) => tx.createOrReplace(doc));
  const result = await tx.commit();
  console.log(`Seeded ${services.length} services.`, result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});