import Link from 'next/link';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import type { PortableTextComponents } from '@portabletext/react';
import type { ReactNode } from 'react';
import { FaqList } from '@/components/faq/FaqList';
import { ButtonLink } from '@/components/ui/Button';
import { CmsImage } from '@/components/ui/CmsImage';
import { cn } from '@/lib/cn';
import { imageUrl } from '@/lib/sanity/image';

/**
 * No 'use client' on purpose: this file exports a plain object that server pages hand
 * to <PortableText>. Marking it as a client file turns that object into an opaque
 * reference, and headings and paragraphs render unstyled.
 */

interface InlinePostLinkValue {
  customText?: string;
  post?: { title?: string; slug?: { current?: string } };
}
interface FaqBlockValue {
  heading?: string;
  items: { question: string; answer: string }[];
}
interface TableBlockValue {
  caption?: string;
  hasHeaderRow?: boolean;
  rows: { cells: string[] }[];
}
interface CtaBlockValue {
  heading: string;
  body?: string;
  buttonText: string;
  buttonHref: string;
  style?: 'dark' | 'light' | 'highlight';
}
interface ImageBlockValue {
  asset?: { _type: 'reference'; _ref: string };
  alt?: string;
  caption?: string;
}
interface LinkMarkValue {
  href: string;
  blank?: boolean;
}
interface KeyTakeawaysValue {
  title?: string;
  items: string[];
}

const linkClass =
  'font-semibold text-brand-ink underline decoration-brand-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-ink';

function InlinePostLink({ value, children }: { value?: InlinePostLinkValue; children: ReactNode }): React.JSX.Element {
  const slug = value?.post?.slug?.current;

  if (!slug) {
    // Editors see the problem in development; visitors never see a "broken link" badge.
    if (process.env.NODE_ENV === 'production') return <>{children}</>;
    return (
      <span
        className="font-bold text-danger underline decoration-dotted underline-offset-4"
        title="Missing post reference. Check the GROQ query or the Sanity input."
      >
        {children} (broken post link)
      </span>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className={linkClass}>
      {value?.customText || children}
    </Link>
  );
}

function FaqBlock({ heading, items }: FaqBlockValue): React.JSX.Element | null {
  if (!items?.length) return null;
  return (
    <div className="my-12 border-t border-border pt-8">
      <h2 className="mb-6 text-2xl font-bold">{heading || 'Frequently asked questions'}</h2>
      <FaqList items={items} openFirst={false} />
    </div>
  );
}

function TableBlock({ caption, hasHeaderRow, rows }: TableBlockValue): React.JSX.Element | null {
  if (!rows?.length) return null;
  const all = rows.map((row) => row.cells);
  const header = hasHeaderRow ? all[0] : null;
  const body = hasHeaderRow ? all.slice(1) : all;

  return (
    <div className="my-10 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm sm:text-base">
        {caption && (
          <caption className="bg-surface-muted px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-muted">
            {caption}
          </caption>
        )}
        {header && (
          <thead>
            <tr className="bg-surface-muted">
              {header.map((cell, i) => (
                <th key={i} scope="col" className="border-b border-border px-4 py-3 text-left font-bold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-surface [&_tr:last-child_td]:border-b-0">
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="border-b border-border px-4 py-3 text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ctaTones = {
  dark: { box: 'tone-inverse', button: 'primary' },
  light: { box: 'border border-border bg-surface-muted', button: 'primary' },
  highlight: { box: 'bg-brand text-brand-foreground', button: 'secondary' },
} as const;

function CtaBlock({ heading, body, buttonText, buttonHref, style = 'highlight' }: CtaBlockValue): React.JSX.Element {
  const tone = ctaTones[style] ?? ctaTones.highlight;
  return (
    <div className={cn('my-10 rounded-2xl p-8 sm:p-10', tone.box)}>
      <h3 className="mb-3 text-2xl font-bold">{heading}</h3>
      {body && <p className="mb-6 text-base leading-relaxed opacity-90">{body}</p>}
      <ButtonLink href={buttonHref} variant={tone.button} size="md">
        {buttonText}
        <ArrowRight aria-hidden className="size-4" />
      </ButtonLink>
    </div>
  );
}

function KeyTakeaways({ title = 'Key takeaways', items }: KeyTakeawaysValue): React.JSX.Element | null {
  if (!items?.length) return null;
  return (
    <aside aria-label={title} className="my-10 rounded-2xl border border-border bg-surface-muted p-6 sm:p-8">
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check aria-hidden className="mt-1 size-5 shrink-0 text-brand-ink" />
            <span className="leading-relaxed text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 text-[17px] leading-[1.8]">{children}</p>,
    h2: ({ children }) => <h2 className="mb-5 mt-12 text-2xl font-bold sm:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-10 text-xl font-bold sm:text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-3 mt-8 text-lg font-bold sm:text-xl">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-brand pl-6 text-lg italic text-muted">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-outside list-disc space-y-3 pl-6 text-[17px]">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-outside list-decimal space-y-3 pl-6 text-[17px]">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: LinkMarkValue; children: ReactNode }) => {
      if (!value?.href) return <span>{children}</span>;

      const isWeb = /^https?:\/\//.test(value.href);
      const isPlainAnchor = isWeb || /^(mailto:|tel:)/.test(value.href);

      if (!isPlainAnchor) {
        return (
          <Link href={value.href} className={linkClass}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={value.href}
          {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(linkClass, isWeb && 'inline-flex items-center gap-1')}
        >
          {children}
          {isWeb && <ExternalLink aria-hidden className="size-3.5" />}
        </a>
      );
    },
    inlinePostLink: ({ value, children }) => (
      <InlinePostLink value={value as InlinePostLinkValue}>{children}</InlinePostLink>
    ),
  },
  types: {
    image: ({ value }: { value: ImageBlockValue }) => {
      if (!value?.asset) return null;
      const src = imageUrl(value, { width: 1200, height: 800 }, '');
      if (!src) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-muted">
            <CmsImage src={src} alt={value.alt || ''} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>
          {value.caption && <figcaption className="mt-3 text-center text-sm italic text-muted">{value.caption}</figcaption>}
        </figure>
      );
    },
    tableBlock: ({ value }: { value: TableBlockValue }) => <TableBlock {...value} />,
    ctaBlock: ({ value }: { value: CtaBlockValue }) => <CtaBlock {...value} />,
    faqBlock: ({ value }: { value: FaqBlockValue }) => <FaqBlock {...value} />,
    keyTakeaways: ({ value }: { value: KeyTakeawaysValue }) => <KeyTakeaways {...value} />,
  },
};