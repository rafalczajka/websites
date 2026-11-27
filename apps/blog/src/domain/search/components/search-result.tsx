'use client';

import { cn } from '@/utils/cn';

type SearchResultProps = {
  title: string;
  excerpt?: string;
  className?: string;
};

export function SearchResult({ title, excerpt, className }: SearchResultProps) {
  return (
    <div className={cn('w-full px-2 py-2.5', className)}>
      <span className="line-clamp-2 text-sm font-medium">{title}</span>
      {excerpt ? (
        <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">{excerpt}</span>
      ) : null}
    </div>
  );
}
