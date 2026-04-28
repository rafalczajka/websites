import type { PostCategory } from '@/domain/posts/models';

import { BackToTopButton } from './back-to-top-button';
import { SiteFooter } from './site-footer';
import { SiteHeader, SiteHeaderVisibility } from './site-header';
import { SkipToContentLink } from './skip-to-content-link';

type SiteShellProps = {
  categories: PostCategory[];
  children: React.ReactNode;
};

export function SiteShell({ categories, children }: SiteShellProps) {
  return (
    <>
      <SkipToContentLink />
      <div className="flex min-h-screen flex-col">
        <SiteHeaderVisibility>
          <SiteHeader
            categories={categories}
            className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6"
          />
        </SiteHeaderVisibility>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 sm:px-6">
          {children}
          <SiteFooter className="mt-auto pt-16 sm:pt-20" />
        </div>
      </div>
      <BackToTopButton />
    </>
  );
}
