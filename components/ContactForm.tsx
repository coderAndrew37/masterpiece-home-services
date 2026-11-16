'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { contactEmail, phoneNumber, phoneTel } from '@/lib/constants';
import type { LeadPayload } from '@/types/lead';
import { Field, inputClass } from './forms/Fields';

type Status = 'idle' | 'sending' | 'success' | 'error';

const NOT_SURE = 'Not sure yet';
const linkClass = 'font-bold underline underline-offset-4';

export function ContactForm({ services }: { services: string[] }): React.JSX.Element {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const messageRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen-reader users notice it.
  useEffect(() => {
    if (status === 'success' || status === 'error') messageRef.current?.focus();
  }, [status]);

  const submit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const read = (key: keyof LeadPayload): string => String(form.get(key) ?? '').trim();
    const payload: LeadPayload = {
      name: read('name'),
      email: read('email'),
      phone: read('phone'),
      service: read('service'),
      message: read('message'),
      website: read('website'),
    };

    setStatus('sending');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card className="p-8 text-center sm:p-10">
        <div ref={messageRef} tabIndex={-1} role="status" className="focus-visible:outline-none">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft">
            <Check aria-hidden className="size-7 text-brand-ink" />
          </span>
          <h2 className="mt-5 text-2xl font-black">Thanks, we’ve got your request</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            A member of our Kamloops crew will review it and reply within one business day. Need it sooner? Call{' '}
            <a href={phoneTel} className={linkClass}>
              {phoneNumber}
            </a>
            .
          </p>
        </div>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-2xl font-black">Request your free quote</h2>
      <p className="mt-1 text-sm text-muted">We reply within one business day.</p>

      <form
        onSubmit={(event) => {
          void submit(event);
        }}
        className="mt-6 space-y-5"
      >
        <Field label="Full name" htmlFor={`${uid}-name`} required>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required className={inputClass} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" htmlFor={`${uid}-email`} required>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Phone" htmlFor={`${uid}-phone`}>
            <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
          </Field>
        </div>

        <Field label="What do you need?" htmlFor={`${uid}-service`} required>
          <select id={`${uid}-service`} name="service" required defaultValue="" className={inputClass}>
            <option value="">Select a service</option>
            {[...services, NOT_SURE].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Property details"
          htmlFor={`${uid}-message`}
          required
          hint="Rough size, number of storeys, and anything we should know."
        >
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            required
            placeholder="e.g. Two-storey home in Sahali, exterior windows and gutters"
            className={`${inputClass} resize-y`}
          />
        </Field>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden className="hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {status === 'error' && (
          <div
            ref={messageRef}
            tabIndex={-1}
            role="alert"
            className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm focus-visible:outline-none"
          >
            <p className="font-bold text-danger">We couldn’t send that.</p>
            <p className="mt-1 text-muted">
              Please try again, or call{' '}
              <a href={phoneTel} className={linkClass}>
                {phoneNumber}
              </a>{' '}
              or email{' '}
              <a href={`mailto:${contactEmail}`} className={linkClass}>
                {contactEmail}
              </a>
              .
            </p>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              Send my request
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted">
          We only use your details to reply to your request. See our{' '}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </Card>
  );
}