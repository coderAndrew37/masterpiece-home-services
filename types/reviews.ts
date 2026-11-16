export interface Review {
  id: string;
  source: 'google' | 'direct';
  rating: number;
  text: string;
  author: string;
  /** Relative date for Google reviews, location for direct ones. */
  meta?: string;
}