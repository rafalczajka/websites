import { getCategoryBySlug } from '@websites/sanity-blog/api';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent, TaxonomyAside } from '@/app/(site)/_components';
import { getCategorySlugs, getPosts } from '@/domain/posts/services';
import { PostCardList } from '@/domain/posts/ui';

export const dynamicParams = false;

export const generateStaticParams = () => getCategorySlugs();

const getCachedCategoryPageData = cache(async (slug: string) => {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPosts({ type: 'category', slug })
  ]);

  if (!category || !posts.length) return null;

  return {
    categoryTitle: category.title ?? slug,
    categoryDescription: category.description ?? undefined,
    posts
  };
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return {
    title: pageData.categoryTitle,
    description:
      pageData.categoryDescription?.replace(/\s+/g, ' ').trim() ||
      `Articles in ${pageData.categoryTitle}.`,
    alternates: {
      canonical: `/categories/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return (
    <PageContent
      className="space-y-12"
      aside={
        <TaxonomyAside title={pageData.categoryTitle} description={pageData.categoryDescription} />
      }
    >
      {!!pageData.posts.length && <PostCardList posts={pageData.posts} />}
    </PageContent>
  );
}
