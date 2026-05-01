import { getCategories } from '@/domain/posts/queries';

import { SiteShell } from './_shared/site-shell';

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return <SiteShell categories={categories}>{children}</SiteShell>;
}
