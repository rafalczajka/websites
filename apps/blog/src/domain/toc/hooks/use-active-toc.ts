'use client';

import { useScrollSpy, useWindowSize } from '@websites/hooks';
import { useMemo } from 'react';

import type { TocItem } from '../models';

type UseActiveTocOptions = {
  offset?: number;
};

export function useActiveToc(items: readonly TocItem[], { offset }: UseActiveTocOptions = {}) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const { height } = useWindowSize();
  const activeId = useScrollSpy(ids, { offset: offset ?? height / 2 });

  return {
    ids,
    activeId
  };
}
