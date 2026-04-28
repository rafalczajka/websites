import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageLayout } from '@/app/(site)/_shared/layout';
import type { SlugPageProps } from '@/app/(site)/_shared/routing';
import { createPageMetadata } from '@/app/metadata';
import { PortableTextRenderer } from '@/domain/content/portable-text';
import { PostCoverImage, PostHeader, Tags } from '@/domain/posts/components';
import type { PostDetails } from '@/domain/posts/models';
import { getPostDetails, getPostSlugs } from '@/domain/posts/queries';
import { formatDateLong } from '@/utils/dates';

export const dynamicParams = false;

const getCachedPostDetails = cache(getPostDetails);

function getLastUpdatedLabel(post: PostDetails) {
  const dateLabel = formatDateLong(post.publishedAt);
  const updatedLabel = formatDateLong(post.updatedAt);
  return updatedLabel && updatedLabel !== dateLabel ? updatedLabel : null;
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

  if (!post) notFound();

  return createPageMetadata({
    title: post.title ?? 'Untitled',
    description: post.excerpt,
    canonical: `/posts/${slug}`
  });
}

export async function generateStaticParams() {
  return getPostSlugs();
}

export default async function PostPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

  if (!post) notFound();

  const lastUpdatedLabel = getLastUpdatedLabel(post);

  return (
    <PageLayout contentClassName="space-y-10 sm:space-y-14">
      <header className="space-y-6">
        <PostHeader
          title={post.title}
          excerpt={post.excerpt}
          category={post.category}
          date={formatDateLong(post.publishedAt)}
          updated={lastUpdatedLabel}
          readTime={post.readTime}
        />
        <PostCoverImage
          coverUrl={post.coverUrl}
          coverAlt={post.coverAlt}
          coverImageLqip={post.coverImageLqip}
          className="sm:w-[calc(100%+3rem)] sm:-mx-6"
        />
        <Tags tags={post.tags} />
      </header>
      <article className="space-y-6">
        <PortableTextRenderer value={post.bodyBlocks} headingIds={post.headingIds} />
      </article>
    </PageLayout>
  );
}
