'use client';

import { useId, type ComponentPropsWithoutRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

const control =
  'w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus-visible:border-brand-ink focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring';

interface FieldShellProps {
  label: string;
  error?: string;
  icon?: LucideIcon;
  className?: string;
}

function FieldShell({
  id,
  label,
  error,
  icon: Icon,
  className,
  children,
}: FieldShellProps & { id: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />}
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = FieldShellProps & Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'id'>;

export function TextField({ label, error, icon, className, ...props }: TextFieldProps): React.JSX.Element {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} icon={icon} className={className}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, error ? 'border-danger' : 'border-border', icon && 'pl-10')}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = FieldShellProps &
  Omit<ComponentPropsWithoutRef<'select'>, 'className' | 'id' | 'children'> & {
    options: readonly string[];
    placeholder: string;
  };

export function SelectField({
  label,
  error,
  icon,
  className,
  options,
  placeholder,
  ...props
}: SelectFieldProps): React.JSX.Element {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} icon={icon} className={className}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, error ? 'border-danger' : 'border-border', icon && 'pl-10')}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
