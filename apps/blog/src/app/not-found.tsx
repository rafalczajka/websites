import type { Metadata } from 'next';

import { createPageMetadata } from '@/app/metadata';
import { getCategories } from '@/domain/posts/queries';
import { SiteShell } from '@/layout/site-shell';

import { NotFoundContent } from './not-found-content';

export const metadata: Metadata = createPageMetadata({
  title: 'Page not found',
  description: 'The page you are looking for could not be found.'
});

async function getNotFoundCategories() {
  try {
    return await getCategories();
  } catch {
    return [];
  }
}

export default async function NotFound() {
  const categories = await getNotFoundCategories();

  return (
    <SiteShell categories={categories}>
      <NotFoundContent />
    </SiteShell>
  );
}
