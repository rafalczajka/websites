import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageAside } from '@/app/(site)/_shared/page-aside';
import { PageContent } from '@/app/(site)/_shared/page-content';
import type { SlugPageProps } from '@/app/(site)/_shared/routing';
import { createPageMetadata } from '@/app/metadata';
import { PostCardList } from '@/domain/posts/components';
import { getTagPageData, getTagSlugs } from '@/domain/posts/queries';

export const dynamicParams = false;

const getCachedTagPageData = cache(getTagPageData);

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedTagPageData(slug);

  if (!pageData) notFound();

  const { title } = pageData;

  return createPageMetadata({
    title,
    description: `Articles tagged with ${slug}.`,
    canonical: `/tags/${slug}`
  });
}

export function generateStaticParams() {
  return getTagSlugs();
}

export default async function TagPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const pageData = await getCachedTagPageData(slug);

  if (!pageData) notFound();

  const { title, relatedTags, posts } = pageData;

  return (
    <PageContent
      className="space-y-10 sm:space-y-16"
      aside={<PageAside title={title} relatedTags={relatedTags} />}
    >
      {posts.length > 0 && <PostCardList posts={posts} />}
    </PageContent>
  );
}
