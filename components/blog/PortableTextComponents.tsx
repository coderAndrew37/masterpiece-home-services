import { urlFor } from '@/lib/sanity/client';
import type { PortableTextComponents } from '@portabletext/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { FiArrowRight, FiChevronDown, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface InlinePostLinkValue {
  customText?: string;
  post?: { title?: string; slug?: { current?: string } };
}
interface FaqBlockValue { heading?: string; items: { question: string; answer: string }[]; }
interface TableRow { cells: string[]; }
interface TableBlockValue { caption?: string; hasHeaderRow?: boolean; rows: TableRow[]; }
interface CtaBlockValue { heading: string; body?: string; buttonText: string; buttonHref: string; style?: 'dark' | 'light' | 'highlight'; }
interface ImageBlockValue { asset?: { _type: 'reference'; _ref: string }; alt?: string; caption?: string; }
interface LinkMarkValue { href: string; blank?: boolean; }
interface KeyTakeawaysValue { title?: string; items: string[]; }

// ─── Renderers ──────────────────────────────────────────────────────────────

function InlinePostLinkRenderer({ value, children }: { value?: InlinePostLinkValue; children: ReactNode }) {
  // Fallback: If the post reference is missing, show a red warning link
  if (!value?.post?.slug?.current) {
    return (
      <span 
        className="font-bold text-red-500 underline decoration-red-300 underline-offset-4 cursor-not-allowed" 
        title="Missing Sanity Post Reference! Check your GROQ query or Sanity Studio input."
      >
        {children} (⚠️ Broken Link)
      </span>
    );
  }

  // If customText is provided, use it. Otherwise, use the text highlighted in Sanity.
  const linkText = value.customText || children;

  return (
    <Link
      href={`/blog/${value.post.slug.current}`}
      className="font-bold text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-4 hover:text-blue-800 hover:decoration-blue-600 transition-all duration-200 ease-out inline cursor-pointer"
    >
      {linkText}
    </Link>
  );
}

function FaqBlockRenderer({ heading, items }: FaqBlockValue) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!items?.length) return null;

  return (
    <div className="my-12 pt-8 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {heading || 'Frequently Asked Questions'}
      </h2>
      <div className="divide-y divide-slate-200">
        {items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{faq.question}</span>
                <FiChevronDown className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-slate-600 leading-relaxed text-base mt-3 pr-8"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableBlockRenderer({ caption, hasHeaderRow, rows }: TableBlockValue) {
  if (!rows?.length) return null;
  const allRows = rows.map((r) => r.cells);
  const header = hasHeaderRow ? allRows[0] : null;
  const body = hasHeaderRow ? allRows.slice(1) : allRows;

  return (
    <div className="my-10">
      {caption && <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">{caption}</p>}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm sm:text-base border-collapse">
          {header && (
            <thead>
              <tr className="bg-slate-50">
                {header.map((cell, i) => (
                  <th key={i} className="text-left font-bold text-slate-900 px-4 py-3 border-b border-slate-200">{cell}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="bg-white">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-slate-600 border-b border-slate-100 last:border-0">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CtaBlockRenderer({ heading, body, buttonText, buttonHref, style }: CtaBlockValue) {
  const styles = {
    dark: 'bg-slate-900 text-white',
    light: 'bg-slate-50 text-slate-900 border border-slate-200',
    highlight: 'bg-blue-600 text-white',
  } as const;
  const resolvedStyle = style || 'highlight';

  return (
    <div className={`my-10 rounded-2xl p-8 sm:p-10 ${styles[resolvedStyle]}`}>
      <h3 className="text-2xl font-bold mb-3">{heading}</h3>
      {body && <p className={`text-base leading-relaxed mb-6 opacity-90`}>{body}</p>}
      <a href={buttonHref} className={`inline-flex items-center gap-2 font-bold py-3 px-6 rounded-lg text-sm transition-all hover:scale-105 ${
        resolvedStyle === 'light' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900'
      }`}>
        {buttonText} <FiArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function KeyTakeawaysRenderer({ title = 'Key Takeaways', items }: KeyTakeawaysValue) {
  if (!items?.length) return null;
  return (
    <div className="my-10 rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <FiCheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span className="text-slate-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[17px] leading-[1.8] text-slate-700 mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold text-slate-900 mt-8 mb-3">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 my-8 text-lg italic text-slate-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-6 space-y-3 text-[17px] text-slate-700 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-6 space-y-3 text-[17px] text-slate-700 mb-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: LinkMarkValue; children: ReactNode }) => {
      if (!value?.href) return <span>{children}</span>;
      const isExternal = /^https?:\/\//.test(value.href);
      
      // Standard Link Hover Styling
      const baseClasses = "text-blue-600 font-bold underline decoration-blue-300 decoration-2 underline-offset-4 hover:text-blue-800 hover:decoration-blue-600 transition-all duration-200 ease-out cursor-pointer";

      if (!isExternal) return <Link href={value.href} className={baseClasses}>{children}</Link>;

      return (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} inline-flex items-center gap-1`}>
          {children} <FiExternalLink className="w-3.5 h-3.5" />
        </a>
      );
    },
    inlinePostLink: ({ value, children }) => (
      <InlinePostLinkRenderer value={value as InlinePostLinkValue}>{children}</InlinePostLinkRenderer>
    ),
  },
  types: {
    image: ({ value }: { value: ImageBlockValue }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value as Parameters<typeof urlFor>[0])?.width(1200).height(800).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-10">
          <span className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden">
            <Image src={imageUrl} alt={value.alt || ''} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </span>
          {value.caption && <figcaption className="text-sm text-slate-500 mt-3 text-center italic">{value.caption}</figcaption>}
        </figure>
      );
    },
    tableBlock: ({ value }: { value: TableBlockValue }) => <TableBlockRenderer {...value} />,
    ctaBlock: ({ value }: { value: CtaBlockValue }) => <CtaBlockRenderer {...value} />,
    faqBlock: ({ value }: { value: FaqBlockValue }) => <FaqBlockRenderer {...value} />,
    keyTakeaways: ({ value }: { value: KeyTakeawaysValue }) => <KeyTakeawaysRenderer {...value} />,
  },
};