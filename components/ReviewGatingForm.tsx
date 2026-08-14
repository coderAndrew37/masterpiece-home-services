// src/components/ReviewGatingForm.tsx
'use client';

import React, { useState } from 'react';
import { FiStar, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

interface ReviewGatingFormProps {
  googleReviewUrl: string;
}

type Step = 'rating' | 'positive' | 'negative' | 'done';

export default function ReviewGatingForm({ googleReviewUrl }: ReviewGatingFormProps): React.JSX.Element {
  const [step, setStep] = useState<Step>('rating');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleRatingSelect = (value: number): void => {
    setRating(value);
    setStep(value >= 4 ? 'positive' : 'negative');
  };

  const handleSubmit = async (): Promise<void> => {
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment, email }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStep('done');
    } catch {
      setSubmitError('Something went wrong \u2014 please try again, or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm max-w-2xl mx-auto mb-16">
      {step === 'rating' && (
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">How was your experience?</h3>
          <p className="text-slate-600 text-sm mb-6">Tap a star to get started \u2014 it takes 30 seconds.</p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingSelect(value)}
                className="p-1.5 hover:scale-110 transition-transform"
                aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
              >
                <FiStar className={`w-9 h-9 ${value <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'positive' && (
        <div className="text-center space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900">We&apos;re so glad to hear that!</h3>
          <p className="text-slate-600 text-sm">
            Mind sharing it on Google? It takes less than a minute and really helps other Kamloops homeowners find us.
          </p>
<a          
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/30"
          >
            <FcGoogle className="w-5 h-5 bg-white rounded-full" />
            <span>Leave a Google Review</span>
            <FiExternalLink className="w-4 h-4" />
          </a>

          <div className="pt-4 border-t border-slate-100 text-left">
            <p className="text-xs text-slate-500 mb-3">Want to also leave a quick note for us? (optional)</p>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Tell us what stood out..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full mb-3 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {submitError && <p className="text-xs text-red-600 mb-2">{submitError}</p>}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !name.trim() || !comment.trim()}
              className="text-sm font-bold text-blue-700 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send note to Masterpiece'}
            </button>
          </div>
        </div>
      )}

      {step === 'negative' && (
        <div className="space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">We&apos;re sorry to hear that.</h3>
            <p className="text-slate-600 text-sm">This goes straight to our team, not posted publicly. What could we have done better?</p>
          </div>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email (optional \u2014 if you'd like a reply)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="What could we improve?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {submitError && <p className="text-xs text-red-600">{submitError}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !name.trim() || !comment.trim()}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Feedback to Our Team'}
          </button>

          {/* Required for policy compliance — do not remove. See message notes. */}
          <p className="text-center text-xs text-slate-400 pt-2">
            You&apos;re also welcome to{' '}
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
              share this on Google
            </a>{' '}
            if you&apos;d like.
          </p>
        </div>
      )}

      {step === 'done' && (
        <div className="text-center space-y-3 py-4">
          <FiCheckCircle className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="text-xl font-extrabold text-slate-900">Thank you!</h3>
          <p className="text-slate-600 text-sm">We really appreciate you taking the time.</p>
        </div>
      )}
    </div>
  );
}