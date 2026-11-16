'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import { contactEmail, phoneNumber, phoneTel } from '@/lib/constants';
import { Field, inputClass } from '../forms/Fields';

type Status = 'idle' | 'sending' | 'success' | 'error';

const RATING_LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'] as const;
const linkClass = 'font-bold underline underline-offset-4';

export function FeedbackForm(): React.JSX.Element {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const messageRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen-reader users notice it.
  useEffect(() => {
    if (status === 'success' || status === 'error') messageRef.current?.focus();
  }, [status]);

  const submit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const read = (key: string): string => String(form.get(key) ?? '').trim();

    setStatus('sending');
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: read('name'), email: read('email'), comment: read('comment'), rating }),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-10">
        <div ref={messageRef} tabIndex={-1} role="status" className="focus-visible:outline-none">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft">
            <Check aria-hidden className="size-7 text-brand-ink" />
          </span>
          <h3 className="mt-5 text-2xl font-black">Thank you</h3>
          <p className="mt-2 text-sm text-muted">We really appreciate you taking the time.</p>
        </div>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setRating(0);
            setStatus('idle');
          }}
        >
          Send more feedback
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="text-2xl font-black">Send us private feedback</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        This goes straight to our team, whatever your rating. Tell us what stood out, or what we could do better.
      </p>

      <form
        onSubmit={(event) => {
          void submit(event);
        }}
        className="mt-6 space-y-5"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            Your rating
            <span aria-hidden className="ml-0.5 text-danger">
              *
            </span>
          </legend>
          <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
            {RATING_LABELS.map((label, index) => {
              const value = index + 1;
              const filled = value <= (hover || rating);
              return (
                <label key={label} className="relative cursor-pointer" onMouseEnter={() => setHover(value)}>
                  <input
                    type="radio"
                    name={`${uid}-rating`}
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                    required
                    className="peer sr-only"
                  />
                  <span className="sr-only">
                    {value} star{value > 1 ? 's' : ''}, {label}
                  </span>
                  <span className="block rounded-lg p-1 peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                    <Star
                      aria-hidden
                      className={cn('size-8 transition-colors', filled ? 'fill-star text-star' : 'text-muted/40')}
                    />
                  </span>
                </label>
              );
            })}
            <span aria-live="polite" className="ml-2 text-sm font-semibold text-muted">
              {rating > 0 ? RATING_LABELS[rating - 1] : ''}
            </span>
          </div>
        </fieldset>

        <Field label="Your name" htmlFor={`${uid}-name`} required>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required className={inputClass} />
        </Field>

        <Field label="Email" htmlFor={`${uid}-email`} hint="Only if you'd like a reply.">
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
        </Field>

        <Field label="Your feedback" htmlFor={`${uid}-comment`} required>
          <textarea id={`${uid}-comment`} name="comment" rows={4} required className={`${inputClass} resize-y`} />
        </Field>

        {status === 'error' && (
          <div
            ref={messageRef}
            tabIndex={-1}
            role="alert"
            className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm focus-visible:outline-none"
          >
            <p className="font-bold text-danger">We couldn&rsquo;t send that.</p>
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
            'Sending…'
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              Send feedback
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}