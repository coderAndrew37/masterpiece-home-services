// src/components/legal/LegalSection.tsx
import type { ReactNode } from 'react';

interface LegalSectionProps {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}

export default function LegalSection({ id, number, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-slate-100 py-8 first:pt-0 last:border-b-0">
      <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900">
        <span className="text-sm font-normal text-slate-400">{String(number).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="prose prose-slate mt-3 max-w-none prose-p:leading-relaxed prose-p:text-slate-600">
        {children}
      </div>
    </section>
  );
}