import type { Metadata } from 'next';

import { createPageMetadata } from '@/app/metadata';
import { EmptyState, PostCardList } from '@/domain/posts/components';
import { getPosts } from '@/domain/posts/queries';

import { PageContent } from './_shared/page-content';

export const metadata: Metadata = createPageMetadata({ canonical: '/' });

export default async function Home() {
  const posts = await getPosts();
  return (
    <PageContent>{posts.length ? <PostCardList posts={posts} /> : <EmptyState />}</PageContent>
  );
}
