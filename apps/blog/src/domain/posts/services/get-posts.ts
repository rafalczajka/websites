import 'server-only';

import { getSearchIndex } from '@/infra/search';

import { toDomain } from '../mappings';
import type { Post } from '../models';

export async function getPosts(): Promise<Post[]> {
  const { documents } = await getSearchIndex();
  return documents.map(toDomain);
}
