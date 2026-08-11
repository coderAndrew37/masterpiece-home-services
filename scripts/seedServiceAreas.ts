// scripts/seedServiceAreas.ts
/**
 * Seeds initial Service Area documents in Sanity — UNPUBLISHED by default.
 * Run: npx tsx scripts/seedServiceAreas.ts
 *
 * Re-running is safe: uses deterministic _ids (createOrReplace), so it
 * updates existing seeded docs rather than duplicating them.
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!, // write-access token
  useCdn: false,
});

interface RelatedServiceBlurbInput {
  slug: string;
  blurb: string;
}

interface SeedArea {
  name: string;
  slug: string;
  region: string;
  intro: string;
  localHook: string;
  seoTitle: string;
  seoDescription: string;
  relatedServices: RelatedServiceBlurbInput[];
}

const seedAreas: SeedArea[] = [
  {
    name: 'Sahali',
    slug: 'sahali',
    region: 'Kamloops',
    intro:
      'Sitting elevated on the benchlands overlooking the Thompson River valley, Sahali homes feature expansive multi-story view windows that trap airborne dust carried by strong hillside gusts. From upper Sahali near Peterson Creek down along Summit Drive, keeping exterior glass and vinyl siding immaculate requires specialized pure-water equipment that safe-cleans hard-to-reach gables.',
    localHook:
      'Properties near Peterson Creek Park and along Summit Drive face elevated windborne dust and seasonal pollen build-up from surrounding sagebrush hillsides.',
    seoTitle: 'Sahali Window Detailing & Exterior Washing | Masterpiece Home Services',
    seoDescription:
      'Professional pure-water window cleaning and soft washing for homes in Sahali, Kamloops. Spotless multi-story view glass without harsh chemicals.',
    relatedServices: [
      {
        slug: 'window-cleaning',
        blurb:
          'Hillside view homes along Columbia Street and Springhill Drive showcase floor-to-ceiling glass that highlights mineral spotting under direct sunlight. Our purified water system strips mineral deposits without leaving film or streaks, restoring optical clarity to your valley vistas.',
      },
      {
        slug: 'soft-washing',
        blurb:
          'Stucco and vinyl exteriors in upper Sahali bake under intense summer sun while collecting sagebrush dust in textured surfaces. Our low-pressure soft wash process removes embedded grit and mildew without damaging delicate siding or exterior paint.',
      },
    ],
  },
  {
    name: 'Aberdeen',
    slug: 'aberdeen',
    region: 'Kamloops',
    intro:
      'Positioned high above Kamloops along Pacific Way and Aberdeen Drive, properties in Aberdeen endure higher wind exposure and heavier seasonal precipitation than valley-bottom areas. Large multi-level family homes require routine gutter maintenance to handle sudden mountain runoff and pure-water window care to maintain clear valley sightlines.',
    localHook:
      'Located at an elevation over 600 meters, Aberdeen homes experience higher rainfall and pine needle buildup from neighboring forest stands along Coal Hill.',
    seoTitle: 'Aberdeen Gutter Clearing & Window Washing | Masterpiece Home Services',
    seoDescription:
      'Premier eavestrough cleaning and pure-water window detailing for Aberdeen, Kamloops homes. Protect your multi-story property from seasonal water runoff.',
    relatedServices: [
      {
        slug: 'window-cleaning',
        blurb:
          'Architectural multi-story windows across Pacific Way require specialized carbon-fiber reach poles to clean safely from the ground. We utilize 100% pure deionized water to rinse away pine sap mist and road film without water spots.',
      },
      {
        slug: 'eavestroughs',
        blurb:
          'Ponderosa pine needles and heavy autumn rain frequently clog eavestroughs in Aberdeen, risking foundation overflow during rapid snowmelts. We scoop, flush, and inspect downspouts to guarantee free-flowing drainage year-round.',
      },
    ],
  },
  {
    name: 'Westsyde',
    slug: 'westsyde',
    region: 'Kamloops',
    intro:
      'Spanning parallel to the North Thompson River along Westsyde Road, Westsyde features spacious residential lots with extensive concrete driveways, sunrooms, and mature shade trees. The combination of riverbed humidity and agricultural airborne sediment creates film on siding and dark organic staining on flat concrete surfaces.',
    localHook:
      'Proximity to the North Thompson River and Westsyde Centennial Park subjects residential surfaces to high summer humidity and cottonwood fluff accumulation.',
    seoTitle: 'Westsyde Soft Washing & Pressure Washing | Masterpiece Home Services',
    seoDescription:
      'Deep pressure washing and house soft washing across Westsyde, Kamloops. Clear moss, river silt, and concrete staining from driveways and siding.',
    relatedServices: [
      {
        slug: 'soft-washing',
        blurb:
          'Homes backing onto the river corridor frequently develop green algae patches along north-facing walls and soffits. Our biodegradable soft-wash solution neutralizes organic spores at the root without stripping or scarring your home’s exterior cladding.',
      },
      {
        slug: 'pressure-washing',
        blurb:
          'Large concrete driveways and stone patios along Westsyde Road absorb river silt, oil drips, and winter grit. We use heavy-duty rotary surface cleaners to deliver uniform, streak-free deep cleaning across wide paved areas.',
      },
    ],
  },
  {
    name: 'Brocklehurst',
    slug: 'brocklehurst',
    region: 'Kamloops',
    intro:
      'Characterized by wide flat lots, mature fruit orchards, and leafy residential streets near Tranquille Road, Brocklehurst is one of Kamloops’ classic established communities. Heavy autumn foliage from deciduous tree canopies demands thorough eavestrough cleaning, while busy household schedules benefit from meticulous indoor cleaning services.',
    localHook:
      'Brocklehurst’s dense canopy of mature elm, maple, and fruit trees near McArthur Island leads to significant annual organic debris build-up in home gutter networks.',
    seoTitle: 'Brocklehurst Gutter & Indoor Cleaning | Masterpiece Home Services',
    seoDescription:
      'Reliable eavestrough clearing and home interior deep cleaning in Brocklehurst, Kamloops. Keep your gutters flowing and your home interior spotless.',
    relatedServices: [
      {
        slug: 'eavestroughs',
        blurb:
          'Massive leaf drops every fall around McArthur Island Park completely pack eavestroughs with damp foliage. Our thorough manual clearing and downspout flushing prevent water backup and eavestrough sagging under heavy wet leaves.',
      },
      {
        slug: 'indoor-cleaning',
        blurb:
          'Whether preparing a home along Crestline Street for seasonal hosting or managing week-to-week upkeep, our interior detailing covers everything from baseboards to kitchen sanitization with meticulous care.',
      },
    ],
  },
  {
    name: 'Pineview Valley',
    slug: 'pineview-valley',
    region: 'Kamloops',
    intro:
      'Tucked into the hills south of Trans-Canada Highway off Hugh Allan Drive, Pineview Valley features modern, multi-pitch rooflines and compact residential footprints. Winter conditions here bring heavy snowfall and ice, making professional roofline holiday lighting and spring driveway surface restoration essential for neighborhood homeowners.',
    localHook:
      'Steep roof angles and narrow property lines near Python Lake require specialized safety rigging for roofline installations and surface treatments.',
    seoTitle: 'Pineview Valley Concrete Cleaning & Holiday Lighting | Masterpiece',
    seoDescription:
      'Custom Christmas light installation and pressure surface washing for Pineview Valley homes in Kamloops. Professional, safe, and fully customized fit.',
    relatedServices: [
      {
        slug: 'pressure-washing',
        blurb:
          'Winter road salt and de-icing chemicals tracked into Pineview Valley driveways can cause premature concrete pitting and discoloration. High-pressure washing removes embedded salt residue, restoring driveways and entry steps to clean condition.',
      },
      {
        slug: 'christmas-lights',
        blurb:
          'Navigating steep gable roofs along Copperhead Drive in sub-zero weather is dangerous without commercial-grade gear. We custom-cut commercial C9 LEDs to your exact roofline, handling complete installation, maintenance, and post-holiday removal.',
      },
    ],
  },
  {
    name: 'Batchelor Heights',
    slug: 'batchelor-heights',
    region: 'Kamloops',
    intro:
      'Perched on the northern bluffs overlooking the Kamloops airport and Thompson Valley, Batchelor Heights homes are engineered to maximize sweeping panoramic views. Exposed to persistent valley winds and intense sun, these hillside properties demand spot-free window detailing and custom, secure Christmas light installations built to withstand severe wind gusts.',
    localHook:
      'The high ridge along Batchelor Drive experiences strong updrafts from the valley floor, accelerating dust accumulation on high-elevation exterior glass.',
    seoTitle: 'Batchelor Heights Window Cleaning & Light Install | Masterpiece',
    seoDescription:
      'Pure-water window cleaning and professional Christmas lighting in Batchelor Heights, Kamloops. Crystal-clear view windows and custom holiday displays.',
    relatedServices: [
      {
        slug: 'window-cleaning',
        blurb:
          'Dust whipped up from the river valley settles constantly on picture windows facing south toward Mount Paul. Our pure-water reverse osmosis filtration cleans glass and frames without leaving static charge, keeping windows cleaner for longer.',
      },
      {
        slug: 'christmas-lights',
        blurb:
          'High wind loads along the northern ridge can dislodge cheap retail holiday lights. We install custom commercial-grade LED displays using specialized roofline clips that stay locked in place through winter storms.',
      },
    ],
  },
];

async function run(): Promise<void> {
  const services = await client.fetch<{ _id: string; slug: string }[]>(
    `*[_type == "service"]{ _id, "slug": slug.current }`
  );

  const serviceIdBySlug = new Map(services.map((s) => [s.slug, s._id]));

  for (const area of seedAreas) {
    const missingSlugs = area.relatedServices
      .map((rs) => rs.slug)
      .filter((s) => !serviceIdBySlug.has(s));

    if (missingSlugs.length > 0) {
      console.warn(
        `Skipping "${area.name}" — missing service slug(s) in Sanity: ${missingSlugs.join(', ')}`
      );
      continue;
    }

    const doc = {
      _type: 'serviceArea',
      _id: `serviceArea-${area.slug}`,
      name: area.name,
      slug: { _type: 'slug', current: area.slug },
      region: area.region,
      published: false,
      intro: area.intro,
      localHook: area.localHook,
      seoTitle: area.seoTitle,
      seoDescription: area.seoDescription,
      relatedServices: area.relatedServices.map((rs) => ({
        _type: 'relatedServiceBlurb',
        _key: rs.slug,
        service: { _type: 'reference', _ref: serviceIdBySlug.get(rs.slug) },
        blurb: rs.blurb,
      })),
    };

    await client.createOrReplace(doc);
    console.log(`Seeded (unpublished): ${area.name}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});