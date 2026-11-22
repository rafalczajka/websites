import 'server-only';

import { getPosts } from './get-posts';
import { getTagSlugs } from './get-tag-slugs';

type TagPageData = {
  title: string;
  posts: Awaited<ReturnType<typeof getPosts>>;
  otherTags: string[];
};

export async function getTagPageData(slug: string): Promise<TagPageData | null> {
  const [posts, tagParams] = await Promise.all([getPosts({ type: 'tag', slug }), getTagSlugs()]);

  if (!posts.length) return null;

  const currentTagSlug = slug.toLowerCase();
  const otherTags = tagParams
    .map(({ slug: tag }) => tag)
    .filter((tag) => tag.toLowerCase() !== currentTagSlug)
    .sort((a, b) => a.localeCompare(b));

  return {
    title: `#${slug}`,
    posts,
    otherTags
  };
}
