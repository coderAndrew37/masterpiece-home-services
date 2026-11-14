import { WorkGallery, type WorkPhoto } from '@/components/home/WorkGallery';
import { Section } from '@/components/ui/Section';
import { imageUrl } from '@/lib/sanity/image';
import type { DetailedService } from '@/types/service';

const MAX_PHOTOS = 6;

export function ServiceGallery({ service }: { service: DetailedService }): React.JSX.Element | null {
  const photos: WorkPhoto[] = (service.gallery ?? [])
    .slice(0, MAX_PHOTOS)
    .map((item, index) => {
      // Works whether a gallery item is { image, alt } or a bare image.
      const source = item.image ?? item;
      return {
        id: item._key ?? `gallery-${index}`,
        alt: item.alt || item.caption || `${service.title} in Kamloops`,
        thumb: imageUrl(source, { width: 800, height: 600 }, ''),
        full: imageUrl(source, { width: 1600 }, ''),
      };
    })
    .filter((photo) => photo.thumb && photo.full);

  if (photos.length === 0) return null;

  return (
    <Section
      id="work"
      eyebrow="Our work"
      title={`${service.title}: recent projects`}
      description="Real Kamloops properties. Tap a photo to see it larger."
    >
      <WorkGallery photos={photos} />
    </Section>
  );
}