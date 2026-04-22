import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent, TaxonomyAside } from '@/app/(site)/_components';
import { getPosts, getTagSlugs } from '@/domain/posts/services';
import { PostCardList } from '@/domain/posts/ui';

export const dynamicParams = false;

export const generateStaticParams = async () => getTagSlugs();

const getCachedTaggedPosts = cache((slug: string) => getPosts({ type: 'tag', slug }));

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getCachedTaggedPosts(slug);

  if (!posts.length) notFound();

  return {
    title: `#${slug}`,
    description: `Articles tagged with ${slug}.`,
    alternates: {
      canonical: `/tags/${slug}`
    }
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [posts, tagParams] = await Promise.all([getCachedTaggedPosts(slug), getTagSlugs()]);

  if (posts.length < 1) notFound();

  const currentTagSlug = slug.toLowerCase();
  const relatedTags = tagParams
    .map(({ slug: tag }) => tag)
    .filter((tag) => tag.toLowerCase() !== currentTagSlug)
    .sort((a, b) => a.localeCompare(b));

  return (
    <PageContent
      className="space-y-10 sm:space-y-16"
      aside={<TaxonomyAside title={`#${slug}`} count={posts.length} relatedTags={relatedTags} />}
    >
      {posts.length > 0 && <PostCardList posts={posts} />}
    </PageContent>
  );
}
