import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageAside } from '@/app/(site)/_shared/aside';
import { PageLayout } from '@/app/(site)/_shared/layout';
import type { SlugPageProps } from '@/app/(site)/_shared/routing';
import { createPageMetadata } from '@/app/metadata';
import { PostCardList } from '@/domain/posts/components';
import { getCategoryPageData, getCategorySlugs } from '@/domain/posts/queries';

export const dynamicParams = false;

const getCachedCategoryPageData = cache(getCategoryPageData);

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return createPageMetadata({
    title: pageData.title,
    description: pageData.description || `Articles in ${pageData.title}.`,
    canonical: `/categories/${slug}`
  });
}

export function generateStaticParams() {
  return getCategorySlugs();
}

export default async function CategoryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return (
    <PageLayout
      className="space-y-12"
      aside={<PageAside title={pageData.title} description={pageData.description} />}
    >
      {!!pageData.posts.length && <PostCardList posts={pageData.posts} />}
    </PageLayout>
  );
}
