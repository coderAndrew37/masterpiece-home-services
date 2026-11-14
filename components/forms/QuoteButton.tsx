'use client';

import { Button, type ButtonProps } from '@/components/ui/Button';
import { useQuote } from '@/hooks/useQuote';

type QuoteButtonProps = Omit<ButtonProps, 'onClick'> & {
  service?: string;
  summary?: string;
};

/**
 * The one "open the quote modal" button. Server components can render it
 * without becoming client components themselves, which keeps the rest of
 * each section server-rendered.
 */
export function QuoteButton({
  service,
  summary,
  children = 'Get a free quote',
  ...buttonProps
}: QuoteButtonProps): React.JSX.Element {
  const { open } = useQuote();

  return (
    <Button onClick={() => open({ service, summary })} {...buttonProps}>
      {children}
    </Button>
  );
}
