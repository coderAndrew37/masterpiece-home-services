'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SelectField, TextField } from '@/components/ui/Field';
import { useLeadSubmit } from '@/hooks/useLeadSubmit';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { LEAD_SERVICES } from '@/lib/leads';

interface QuoteFormProps {
  /** Attribution label saved with the lead, e.g. "home-hero". */
  source: string;
  title?: string;
  description?: string;
}

export function QuoteForm({
  source,
  title = 'Get your free quote',
  description = 'Takes 30 seconds. No obligation.',
}: QuoteFormProps): React.JSX.Element {
  const { status, errors, submit, reset } = useLeadSubmit(source);
  const [firstName, setFirstName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const ok = await submit(values);
    if (ok) {
      setFirstName(String(values.name ?? '').trim().split(' ')[0]);
      form.reset();
    }
  };

  if (status === 'success') {
    return (
      <Card className="p-6 shadow-2xl sm:p-8" role="status">
        <CheckCircle2 aria-hidden className="size-10 text-brand-ink" />
        <p className="mt-4 text-xl font-extrabold">Thanks{firstName ? `, ${firstName}` : ''}. We got it.</p>
        <p className="mt-2 text-sm text-muted">We&apos;ll text you a quote within one business day.</p>
        <Button variant="secondary" size="md" className="mt-6" onClick={reset}>
          Send another request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-2xl sm:p-8">
      <h2 className="text-lg font-extrabold">{title}</h2>
      <p className="mb-5 mt-1 text-sm text-muted">{description}</p>

      <form onSubmit={handleSubmit} noValidate className="relative space-y-4">
        {/* Honeypot: invisible to people, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <TextField
          label="Your name"
          name="name"
          icon={User}
          autoComplete="name"
          placeholder="Jane Smith"
          required
          error={errors.name}
        />
        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="tel"
          icon={Phone}
          autoComplete="tel"
          placeholder="250 555 0123"
          required
          error={errors.phone}
        />
        <SelectField label="What do you need?" name="service" options={LEAD_SERVICES} placeholder="Select a service (optional)" />

        {status === 'error' && (
          <p role="alert" className="text-sm font-medium text-danger">
            We couldn&apos;t send that. Please try again or call{' '}
            <a href={phoneTel} className="underline">
              {phoneNumber}
            </a>
            .
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            'Sending…'
          ) : (
            <>
              Get my free quote <ArrowRight aria-hidden className="size-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
