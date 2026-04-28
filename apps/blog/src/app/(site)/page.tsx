import type { Metadata } from 'next';

import { PageLayout } from '@/app/(site)/_shared/layout';
import { createPageMetadata } from '@/app/metadata';
import { EmptyState, PostCardList } from '@/domain/posts/components';
import { getPosts } from '@/domain/posts/queries';

export const metadata: Metadata = createPageMetadata({ canonical: '/' });

export default async function Home() {
  const posts = await getPosts();
  return <PageLayout>{posts.length ? <PostCardList posts={posts} /> : <EmptyState />}</PageLayout>;
}
