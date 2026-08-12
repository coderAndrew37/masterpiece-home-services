'use client';

import { urlFor } from '@/lib/sanity/client';
import type { PortableTextComponents } from '@portabletext/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

// FaqBlockRenderer — drop the boxed card, use a plain section with a top rule
function FaqBlockRenderer({
  heading,
  items,
}: {
  heading?: string;
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!items?.length) return null;

  return (
    <div className="my-10 pt-8 border-t border-slate-100">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
        {heading || 'Frequently Asked Questions'}
      </h2>
      <div className="divide-y divide-slate-100">
        {items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-base">{faq.question}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-slate-600 leading-relaxed text-sm mt-3 pr-8"
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

function TableBlockRenderer({
  caption,
  hasHeaderRow,
  rows,
}: {
  caption?: string;
  hasHeaderRow?: boolean;
  rows: { cells: string[] }[];
}) {
  if (!rows?.length) return null;

  const allRows = rows.map((r) => r.cells);
  const header = hasHeaderRow ? allRows[0] : null;
  const body = hasHeaderRow ? allRows.slice(1) : allRows;

  return (
    <div className="my-8">
      {caption && (
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">{caption}</p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-sm">
        <table className="w-full text-sm border-collapse">
          {header && (
            <thead>
              <tr className="bg-slate-900">
                {header.map((cell, i) => (
                  <th key={i} className="text-left text-white font-bold px-4 py-3 whitespace-nowrap">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-slate-700 border-t border-slate-100">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CtaBlockRenderer({
  heading,
  body,
  buttonText,
  buttonHref,
  style,
}: {
  heading: string;
  body?: string;
  buttonText: string;
  buttonHref: string;
  style?: 'dark' | 'light' | 'highlight';
}) {
  const styles = {
    dark: 'bg-slate-950 text-white border-slate-800',
    light: 'bg-white text-slate-900 border-slate-200',
    highlight: 'bg-blue-600 text-white border-blue-500',
  } as const;
  const resolvedStyle = style || 'dark';

  return (
    <div className={`my-10 rounded-3xl p-8 border shadow-sm ${styles[resolvedStyle]}`}>
      <h3 className="text-xl font-black mb-2">{heading}</h3>
      {body && (
        <p
          className={`text-sm leading-relaxed mb-5 ${
            resolvedStyle === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          {body}
        </p>
      )}
<a      
        href={buttonHref}
        className={`inline-flex items-center gap-2 font-extrabold py-3 px-6 rounded-2xl text-sm transition-all ${
          resolvedStyle === 'light'
            ? 'bg-blue-700 hover:bg-blue-600 text-white'
            : 'bg-white hover:bg-slate-100 text-slate-900'
        }`}
      >
        <span>{buttonText}</span>
        <FiArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate-600 leading-relaxed text-base mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-extrabold text-slate-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-slate-900 mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 bg-blue-50/60 rounded-r-xl px-6 py-4 my-6 text-slate-700 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 space-y-2 text-slate-600 mb-5">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const isExternal = /^https?:\/\//.test(value?.href || '');
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;

      if (!isExternal) {
        return (
          <Link
            href={value.href}
            className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-800"
          >
            {children}
          </Link>
        );
      }

      return (
  <a      
          href={value.href}
          target={target}
          rel={rel}
          className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    // image renderer — replace existing block
image: ({ value }) => {
  if (!value?.asset) return null;
  return (
    <figure className="my-8">
      <span className="block relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden">
        <Image
          src={urlFor(value).width(1200).height(800).url()}
          alt={value.alt || ''}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
      </span>
      {value.caption && (
        <figcaption className="text-xs text-slate-500 mt-2 italic">{value.caption}</figcaption>
      )}
    </figure>
  );
},
    tableBlock: ({ value }) => (
      <TableBlockRenderer caption={value.caption} hasHeaderRow={value.hasHeaderRow} rows={value.rows} />
    ),

    ctaBlock: ({ value }) => (
      <CtaBlockRenderer
        heading={value.heading}
        body={value.body}
        buttonText={value.buttonText}
        buttonHref={value.buttonHref}
        style={value.style}
      />
    ),

    faqBlock: ({ value }) => <FaqBlockRenderer heading={value.heading} items={value.items} />,
  },
};