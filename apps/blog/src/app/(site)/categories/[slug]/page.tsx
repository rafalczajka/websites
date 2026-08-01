import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { createPageMetadata } from '@/app/metadata';
import type { SlugPageProps } from '@/app/route-types';
import { PostCardList, Tags } from '@/domain/posts/components';
import { getCategoryPageData, getCategorySlugs } from '@/domain/posts/queries';
import { PageAside } from '@/layout/page-aside';
import { PageContent } from '@/layout/page-content';

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

  const { title, description, posts, tags } = pageData;

  return (
    <PageContent
      className="space-y-12"
      aside={
        <PageAside title={title} description={description}>
          <Tags tags={tags} />
        </PageAside>
      }
    >
      {posts.length > 0 ? <PostCardList posts={posts} /> : null}
    </PageContent>
  );
}
