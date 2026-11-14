export interface ServiceCopy {
  /** The natural phrase people search for. Used in headings and the closing call to action. */
  keyword: string;
  /** One practical, seasonal tip. Shown beside the overview. */
  proTip: string;
  /** Honest list of what moves the price (no numbers). */
  priceFactors: string[];
}

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const copyBySlug: Record<string, ServiceCopy> = {
  'pure-water-window-detailing': {
    keyword: 'window cleaning in Kamloops',
    proTip:
      'Book once in late spring, after cottonwood fluff and pollen settle, and again in fall before winter road grit bonds to the glass.',
    priceFactors: [
      'Number and size of panes',
      'Storeys and ladder access',
      'Inside, outside or both',
      'Hard-water spotting or construction residue',
    ],
  },
  'eavestrough-gutter-cleaning': {
    keyword: 'gutter cleaning in Kamloops',
    proTip:
      'Clear your eavestroughs in late spring and again after the leaves and pine needles fall, before a hard freeze can turn a blockage into ice.',
    priceFactors: [
      'Length of your roofline',
      'Storeys and roof access',
      'Amount of debris and tree cover',
      'Add-ons such as downspout work',
    ],
  },
  'house-soft-washing': {
    keyword: 'house soft washing in Kamloops',
    proTip:
      'Soft washing uses low pressure and a cleaning solution, so it is safe for vinyl, stucco and wood siding that a pressure washer could damage.',
    priceFactors: [
      'Size and storeys of the home',
      'Siding type',
      'How much mold, algae or grime has built up',
      'Add-ons such as windows or gutters',
    ],
  },
  'pressure-surface-washing': {
    keyword: 'pressure washing in Kamloops',
    proTip: 'Concrete can take high pressure; siding, decks and wood cannot. We match the pressure to each surface.',
    priceFactors: [
      'Total area to clean',
      'Surface type (concrete, pavers, wood)',
      'Staining such as oil or moss',
      'Access and water supply',
    ],
  },
  'indoor-cleaning': {
    keyword: 'indoor house cleaning in Kamloops',
    proTip: 'A deep clean makes the most difference at a seasonal change, like spring, or before and after hosting.',
    priceFactors: [
      'Size of the home',
      'Number of rooms and bathrooms',
      'Time since the last deep clean',
      'Add-ons you want included',
    ],
  },
  'christmas-lights-installation': {
    keyword: 'Christmas light installation in Kamloops',
    proTip:
      'Book in early fall. Installation slots fill before the holiday rush, and it is far nicer to hang lights before the cold sets in.',
    priceFactors: [
      'Roofline length and storeys',
      'Simple outline or custom display',
      'Trees, shrubs and extras',
      'Takedown and storage',
    ],
  },
};

export function getServiceCopy(slug: string, title: string): ServiceCopy {
  return (
    copyBySlug[slug] ?? {
      keyword: `${title.toLowerCase()} in Kamloops`,
      proTip: 'Book early in the season. We confirm your exact price in writing before any work starts.',
      priceFactors: ['Size of the job', 'Access and number of storeys', 'Condition and buildup', 'Add-ons'],
    }
  );
}