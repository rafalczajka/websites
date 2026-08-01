'use client';

import { useWindowScroll } from '@websites/hooks';

type UseBackToTopVisibilityOptions = {
  threshold?: number;
};

export function useBackToTopVisibility({ threshold = 200 }: UseBackToTopVisibilityOptions = {}) {
  const { y } = useWindowScroll();
  return y > threshold;
}
