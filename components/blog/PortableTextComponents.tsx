import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/client";

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
      const isExternal = /^https?:\/\//.test(value?.href || "");
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;

      if (!isExternal) {
        return (
          <Link href={value.href} className="text-blue-700 font-semibold underline underline-offset-2 hover:text-blue-800">
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
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <span className="block relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden my-8 border border-slate-200/90">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
        </span>
      );
    },
  },
};