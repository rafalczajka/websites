import { BackToTopButton, SiteFooter, SkipToContentLink } from '@/app/(site)/_shared/shell';
import { SiteHeader, SiteHeaderVisibility } from '@/app/(site)/_shared/shell/site-header';
import { getCategories } from '@/domain/posts/queries';

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

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
