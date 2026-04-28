import Link from 'next/link';

import { PageLayout } from '@/app/(site)/_shared/layout';
import { Button } from '@/ui/button';

export function NotFoundContent() {
  return (
    <PageLayout
      className="min-h-[60vh]"
      contentClassName="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-lg font-medium tracking-widest uppercase">404</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold sm:text-5xl">Page not found</h1>
            <p className="max-w-xs mx-auto leading-loose">
              This page may have moved, or the link you followed is no longer up to date.
            </p>
          </div>
        </div>
        <Button size="lg" variant="solid" asChild>
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
