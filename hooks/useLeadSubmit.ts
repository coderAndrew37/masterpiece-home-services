'use client';

import { useCallback, useState } from 'react';
import { validateLead, type LeadErrors } from '@/lib/leads';

export type LeadStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Validates and posts a lead to /api/leads. Any form can reuse it:
 * pass a `source` label, call submit(values), render from status/errors.
 */
export function useLeadSubmit(source: string) {
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [errors, setErrors] = useState<LeadErrors>({});

  const submit = useCallback(
    async (values: Record<string, unknown>): Promise<boolean> => {
      const result = validateLead({ ...values, source });
      if (!result.ok) {
        setErrors(result.errors);
        setStatus('idle');
        return false;
      }

      setErrors({});
      setStatus('submitting');

      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // `company` is the honeypot field; real visitors leave it empty.
          body: JSON.stringify({ ...result.data, company: values.company ?? '' }),
        });
        if (!response.ok) throw new Error(`Lead request failed: ${response.status}`);
        setStatus('success');
        return true;
      } catch {
        setStatus('error');
        return false;
      }
    },
    [source],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setErrors({});
  }, []);

  return { status, errors, submit, reset };
}
