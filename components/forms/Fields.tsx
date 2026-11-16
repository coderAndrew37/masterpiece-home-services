import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus-visible:border-brand';

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, required = false, hint, className, children }: FieldProps): React.JSX.Element {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-danger">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-medium text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}