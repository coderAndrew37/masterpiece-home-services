export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  features: string[];
  icon: string;
  image: string; // Dynamic service photo path
  badge?: string;
}