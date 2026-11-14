import type { FaqItem } from '@/types/faq';

/**
 * Written as real questions Kamloops homeowners type or say to voice search,
 * each answered directly in the first sentence. This one array drives both the
 * visible FAQ and the FAQPage JSON-LD.
 *
 * Answers deliberately avoid dollar figures. Add real "from $X" numbers from
 * your pricing: concrete prices are the biggest AEO upgrade for the cost questions.
 */
export const homeFaqs: FaqItem[] = [
  {
    question: 'How much does window cleaning cost in Kamloops?',
    answer:
      "It depends on the number of panes, how many storeys your home has, and whether you want the outside, the inside or both. See our pricing page for package prices, and we'll confirm a firm quote before we book, so there are no surprises on the day. Heavy buildup, like construction dust or mineral staining, can take extra time.",
  },
  {
    question: 'Do you clean windows inside and out?',
    answer:
      'Yes. We clean exterior and interior glass. Outside, we use a pure-water system that filters out the minerals that cause spots, so windows dry streak-free without harsh chemicals.',
  },
  {
    question: 'How often should eavestroughs (gutters) be cleaned in Kamloops?',
    answer:
      'Most homes need cleaning twice a year: once in late spring after seeds and pollen drop, and again in late fall after the leaves and pine needles come down. Homes under heavy tree cover may need an extra visit. Clear eavestroughs matter before winter, because blocked ones can freeze and overflow.',
  },
  {
    question: "What's the difference between soft washing and pressure washing?",
    answer:
      "Soft washing uses low pressure and a cleaning solution to treat mold, algae and grime on delicate surfaces like vinyl, stucco and wood siding. Pressure washing uses high pressure to clean hard surfaces such as concrete driveways, patios and walkways. We'll recommend the right method for each surface.",
  },
  {
    question: 'Can you remove oil stains from a concrete driveway?',
    answer:
      "We can pressure wash driveways and walkways to lift dirt, moss and surface stains. Older or deeply set oil stains often lighten rather than disappear completely, and we'll tell you what to realistically expect before we start.",
  },
  {
    question: 'Do you install and take down Christmas lights in Kamloops?',
    answer:
      'Yes. Our seasonal service covers installation and takedown, so you can skip the ladder and the cold. Book early in the fall to secure a spot on the schedule.',
  },
  {
    question: "Are you insured, and what if I'm not happy with the result?",
    answer:
      "Yes. We carry $5M in liability insurance and are covered by WorkSafeBC. If anything isn't spotless when we finish, tell us and we'll re-clean it at no charge.",
  },
];
