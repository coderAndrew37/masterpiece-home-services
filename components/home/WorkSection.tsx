import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { imageUrl } from '@/lib/sanity/image';
import { site } from '@/lib/site';
import type { HomeGalleryItem } from '@/types/gallery';
import { WorkGallery, type WorkPhoto } from './WorkGallery';

const MAX_PHOTOS = 6;

/**
 * Replaces BeforeAfterSwiper + Gallery. Those were two sliders/grids built from
 * the same placeholder image. If there are no real photos in the CMS the section
 * hides instead of showing empty frames.
 */
export function WorkSection({ items }: { items: HomeGalleryItem[] }): React.JSX.Element | null {
  const photos: WorkPhoto[] = items.slice(0, MAX_PHOTOS).map((item, index) => ({
    id: item._id || item._key || `work-${index}`,
    category: item.category || undefined,
    alt: item.alt || `${item.category || 'Exterior cleaning'} project in ${site.city}`,
    thumb: imageUrl(item.image, { width: 800, height: 600 }),
    full: imageUrl(item.image, { width: 1600 }),
  }));

  if (photos.length === 0) return null;

  return (
    <Section
      id="work"
      eyebrow="Our work"
      title={`Recent projects around ${site.city}`}
      description="Real homes, real results. Tap a photo to see it larger."
      action={
        <ButtonLink href={site.routes.gallery} variant="outline">
          See more projects
        </ButtonLink>
      }
    >
      <WorkGallery photos={photos} />
    </Section>
  );
}
