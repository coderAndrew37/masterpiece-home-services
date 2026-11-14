export interface Review {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

/**
 * TODO(content): confirm these are real, attributable customer reviews
 * (ideally copied from your Google Business Profile) before launch.
 * Don't publish invented testimonials. They erode trust and can be a
 * consumer-protection problem. Later, move these into Sanity.
 */
export const reviews: Review[] = [
  {
    id: 'review-1',
    name: 'Sarah Johnson',
    location: 'Kamloops, BC',
    quote:
      'The Masterpiece team did an amazing job on our home. The windows are sparkling clean and they were very professional and efficient. Highly recommend their pure-water system!',
    rating: 5,
  },
  {
    id: 'review-2',
    name: 'Michael Thompson',
    location: 'Sun Peaks',
    quote:
      "We've been using them for our property for 3 years now. Consistent quality, reliable service, and they handle the high ladder work safely. Total peace of mind.",
    rating: 5,
  },
  {
    id: 'review-3',
    name: 'Emily Rodriguez',
    location: 'Valleyview',
    quote:
      'They cleared out years of pine needles from our eavestroughs in just a few hours. The crew was safety-conscious, polite, and cleaned up everything before leaving.',
    rating: 5,
  },
];
