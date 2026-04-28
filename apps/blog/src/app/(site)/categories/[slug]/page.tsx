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

  const { title, description } = pageData;

  return createPageMetadata({
    title,
    description: description || `Articles in ${title}.`,
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

  const { title, description, posts } = pageData;

  return (
    <PageLayout
      className="space-y-12"
      aside={<PageAside title={title} description={description} />}
    >
      {!!posts.length && <PostCardList posts={posts} />}
    </PageLayout>
  );
}
