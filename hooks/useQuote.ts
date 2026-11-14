'use client';

import { useBooking } from '@/context/BookingContext';
import { useQuoteModal } from '@/components/QuoteModalProvider';

interface OpenOptions {
  /** Pre-selects a service/plan in the booking modal. */
  service?: string;
  summary?: string;
  quote?: string;
}

/**
 * The codebase currently has two modal systems (QuoteModalProvider and
 * BookingContext). This hook is the only place that knows about both, so
 * homepage components just call open(). When the two are merged later, this
 * is the single file to change.
 */
export function useQuote() {
  const { openModal } = useQuoteModal();
  const { openBooking } = useBooking();

  return {
    open: ({ service, summary }: OpenOptions = {}): void => {
      if (service) {
        openBooking(service, summary);
      } else {
        openModal();
      }
    },
  };
}
