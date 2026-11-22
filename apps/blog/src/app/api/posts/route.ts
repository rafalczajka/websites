import { type NextRequest, NextResponse } from 'next/server';

import type { Post } from '@/domain/posts/models';
import { getPosts } from '@/domain/posts/queries';

export const runtime = 'nodejs';

type PostsResponse = {
  items: Post[];
  total: number;
  top: number | null;
};

export function parseTop(value: string | null): number | null | undefined {
  if (value === null) {
    return null;
  }

  const isDecimalInteger = /^\d+$/.test(value);

  if (!isDecimalInteger) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const top = parseTop(searchParams.get('top'));

  if (top === undefined) {
    return NextResponse.json({ error: 'top must be a positive safe integer.' }, { status: 400 });
  }

  const items = await getPosts();

  const response: PostsResponse = {
    total: items.length,
    top,
    items: top === null ? items : items.slice(0, top)
  };

  return NextResponse.json(response);
}
