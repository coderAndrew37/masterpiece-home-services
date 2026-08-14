// src/components/legal/Callout.tsx
import type { ReactNode } from 'react';

interface CalloutProps {
  title: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div className="rounded-md border-l-4 border-blue-600 bg-blue-50/60 px-4 py-3">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <div className="mt-1 text-sm text-slate-700">{children}</div>
    </div>
  );
}

interface QuickFactsProps {
  facts: { label: string; value: string }[];
}

export function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <div className="mb-10 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {f.label}
          </dt>
          <dd className="mt-0.5 text-sm text-slate-900">{f.value}</dd>
        </div>
      ))}
    </div>
  );
}