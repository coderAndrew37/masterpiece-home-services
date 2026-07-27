'use client';

import React, { useState } from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { FiLink, FiCheck } from 'react-icons/fi';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebookF className="w-4 h-4" />,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaXTwitter className="w-4 h-4" />,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn className="w-4 h-4" />,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, button just won't confirm.
    }
  };

  return (
    <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm">
      <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-4">
        Share This Article
      </span>
      <div className="flex items-center gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
          >
            {link.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
        >
          {copied ? <FiCheck className="w-4 h-4" /> : <FiLink className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}