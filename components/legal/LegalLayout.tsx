// src/components/legal/LegalLayout.tsx
import type { ReactNode } from 'react';

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  toc: TocItem[];
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, toc, children }: LegalLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          Last updated {lastUpdated}
        </p>
      </header>

      {/* Mobile: collapsible jump-to nav */}
      <details className="mb-8 rounded-lg border border-slate-200 lg:hidden">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-slate-900">
          Jump to a section
        </summary>
        <nav className="border-t border-slate-200 px-4 py-3">
          <ul className="space-y-2 text-sm">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-blue-700 hover:underline">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Desktop: sticky sidebar TOC */}
        <nav className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              On this page
            </p>
            <ul className="space-y-2 border-l border-slate-200 text-sm">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-slate-600 hover:border-blue-600 hover:text-blue-700"
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}