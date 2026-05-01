'use client';

import type { PostCategory } from '@/domain/posts/models';
import { SearchDialog } from '@/domain/search/components';
import { useSearchDialog, useSearchIndex } from '@/domain/search/hooks';

import { DesktopHeader, MobileHeader } from './_parts';

type SiteHeaderProps = {
  categories: PostCategory[];
  className?: string;
};

export function SiteHeader({ categories, className }: SiteHeaderProps) {
  const { documents, indexJson, isLoading, error, load } = useSearchIndex();
  const { open, setOpen, openDialog, query, setQuery } = useSearchDialog({ onOpen: load });

  return (
    <div className={className}>
      <div className="block w-full sm:hidden">
        <MobileHeader categories={categories} onOpenSearch={openDialog} />
      </div>
      <div className="hidden w-full sm:block">
        <DesktopHeader categories={categories} onOpenSearch={openDialog} />
      </div>
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        documents={documents}
        indexJson={indexJson}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
