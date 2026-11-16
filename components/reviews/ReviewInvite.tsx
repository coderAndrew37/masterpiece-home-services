import { ExternalLink } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import { FeedbackForm } from './FeedbackForm';

/** Same two options for every customer. Never route people by how many stars they would give. */
export function ReviewInvite({ googleReviewUrl }: { googleReviewUrl?: string }): React.JSX.Element {
  return (
    <div className={cn('grid gap-6', googleReviewUrl ? 'lg:grid-cols-2 lg:items-start' : 'mx-auto max-w-2xl')}>
      {googleReviewUrl && (
        <Card className="flex flex-col p-6 sm:p-8">
          <FcGoogle aria-hidden className="size-10" />
          <h3 className="mt-4 text-2xl font-black">Review us on Google</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A public review helps other Kamloops homeowners find a crew they can trust. It takes about a minute, and
            we read every one.
          </p>
          <ButtonLink
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="mt-6 w-full sm:w-auto sm:self-start"
          >
            Write a Google review
            <ExternalLink aria-hidden className="size-4" />
          </ButtonLink>
        </Card>
      )}

      <FeedbackForm />
    </div>
  );
}