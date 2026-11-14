'use client';

import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CmsImage } from '@/components/ui/CmsImage';

export interface WorkPhoto {
  id: string;
  alt: string;
  category?: string;
  thumb: string;
  full: string;
}

/**
 * The only client code in the "work" section: a grid plus a lightbox built on
 * native <dialog> (focus trap, Esc to close and backdrop come for free).
 * Image URLs are resolved on the server, so the Sanity image builder never
 * ships to the browser.
 */
export function WorkGallery({ photos }: { photos: WorkPhoto[] }): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<WorkPhoto | null>(null);

  const open = (photo: WorkPhoto): void => {
    setActive(photo);
    dialogRef.current?.showModal();
  };
  const close = (): void => dialogRef.current?.close();

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.id} className="reveal">
            <button
              type="button"
              onClick={() => open(photo)}
              aria-label={`View larger: ${photo.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted"
            >
              <CmsImage
                src={photo.thumb}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              {photo.category && (
                <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">
                  {photo.category}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-label={active?.alt ?? 'Project photo'}
        className="m-auto w-[min(92vw,64rem)] rounded-2xl border border-border bg-surface p-3 text-foreground backdrop:bg-black/80"
      >
        {active && (
          <>
            <div className="relative h-[70vh] w-full overflow-hidden rounded-xl bg-surface-muted">
              <CmsImage src={active.full} alt={active.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-3">
              <p className="text-sm text-muted">{active.alt}</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-border hover:bg-surface-muted"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
