'use client';

import { useWindowScroll } from '@websites/hooks';

type UseHeaderVisibilityOptions = {
  scrollDelta?: number;
  topThreshold?: number;
};

const DEFAULT_SCROLL_DELTA = 32;
const DEFAULT_TOP_THRESHOLD = 56;

export function useHeaderVisibility({
  scrollDelta = DEFAULT_SCROLL_DELTA,
  topThreshold = DEFAULT_TOP_THRESHOLD
}: UseHeaderVisibilityOptions = {}) {
  const { y, directionY } = useWindowScroll({ minDeltaY: scrollDelta });

  if (y <= topThreshold || directionY === null) return true;
  return directionY === 'up';
}
