import { SiteShell } from '@/app/(site)/_shared/shell';
import { getCategories } from '@/domain/posts/queries';

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  return <SiteShell categories={categories}>{children}</SiteShell>;
}
