import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export function Brand({ onClick }: { onClick?: () => void }): React.JSX.Element {
  return (
    <Link href="/" onClick={onClick} aria-label={`${site.name}, home`} className="group flex shrink-0 items-center gap-2.5">
      <span className="relative size-10 shrink-0">
        <Image
          src={site.images.logo}
          alt=""
          fill
          priority
          sizes="40px"
          className="object-contain transition-transform group-hover:scale-105 motion-reduce:transition-none"
        />
      </span>
      <span className="flex flex-col">
        <span className="text-lg font-black leading-none tracking-tight">MASTERPIECE</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-ink">Home Services</span>
      </span>
    </Link>
  );
}