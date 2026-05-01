import type { PostCategory } from '@/domain/posts/models';
import { Layout } from '@/ui/layout';

import { BackToTopButton, SkipToContentLink } from './_controls';
import { SiteHeader, SiteHeaderVisibility } from './_site-header';

type SiteShellProps = {
  categories: PostCategory[];
  children: React.ReactNode;
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-center text-sm text-muted-foreground">
      &copy; {currentYear} Rafał Czajka. All rights reserved.
    </p>
  );
}

export function SiteShell({ categories, children }: SiteShellProps) {
  return (
    <>
      <SkipToContentLink />
      <Layout className="max-w-5xl">
        <SiteHeaderVisibility>
          <Layout.Header className="header-backdrop">
            <SiteHeader className="px-4 sm:px-6 py-4" categories={categories} />
          </Layout.Header>
        </SiteHeaderVisibility>
        <Layout.Main id="main-content" className="px-4 sm:px-6">
          {children}
        </Layout.Main>
        <Layout.Footer className="px-4 sm:px-6 pb-6 pt-16 sm:pt-20">
          <Footer />
        </Layout.Footer>
      </Layout>
      <BackToTopButton />
    </>
  );
}
