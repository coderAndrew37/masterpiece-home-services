import Image, { type ImageProps } from 'next/image';

const REMOTE = /^https?:\/\//;

/**
 * next/image wrapper for CMS content. Remote URLs (Sanity CDN) are already
 * resized and format-converted by imageUrl(), so we skip a second optimisation
 * pass. Local files in /public still go through the Next optimiser.
 */
export function CmsImage(props: ImageProps): React.JSX.Element {
  const isRemote = typeof props.src === 'string' && REMOTE.test(props.src);
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is a required prop of ImageProps
  return <Image {...props} unoptimized={props.unoptimized ?? isRemote} />;
}
