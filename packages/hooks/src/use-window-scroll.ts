'use client';

import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = 'up' | 'down' | null;

export type WindowScrollState = {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  directionX: ScrollDirection;
  directionY: ScrollDirection;
};

export type UseWindowScrollOptions = {
  minDeltaX?: number;
  minDeltaY?: number;
};

const defaultScrollState: WindowScrollState = {
  x: 0,
  y: 0,
  deltaX: 0,
  deltaY: 0,
  directionX: null,
  directionY: null
};

const isWindowDefined = () => typeof window !== 'undefined';

const getWindowScrollState = (): WindowScrollState => ({
  ...defaultScrollState,
  x: window.scrollX,
  y: window.scrollY
});

const getScrollDirection = (delta: number): ScrollDirection => {
  if (delta > 0) return 'down';
  if (delta < 0) return 'up';
  return null;
};

const hasPassedThreshold = (delta: number, minDelta: number) => {
  return minDelta > 0 ? Math.abs(delta) >= minDelta : delta !== 0;
};

export function useWindowScroll({ minDeltaX = 0, minDeltaY = 0 }: UseWindowScrollOptions = {}) {
  const [scrollState, setScrollState] = useState<WindowScrollState>(() =>
    isWindowDefined() ? getWindowScrollState() : defaultScrollState
  );

  const lastScrollRef = useRef({ x: scrollState.x, y: scrollState.y });

  useEffect(() => {
    if (!isWindowDefined()) return;

    lastScrollRef.current = { x: window.scrollX, y: window.scrollY };
    let frameId = 0;

    const updateScrollState = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      const deltaX = x - lastScrollRef.current.x;
      const deltaY = y - lastScrollRef.current.y;

      if (!hasPassedThreshold(deltaX, minDeltaX) && !hasPassedThreshold(deltaY, minDeltaY)) {
        return;
      }

      lastScrollRef.current = { x, y };

      setScrollState({
        x,
        y,
        deltaX,
        deltaY,
        directionX: getScrollDirection(deltaX),
        directionY: getScrollDirection(deltaY)
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [minDeltaX, minDeltaY]);

  return scrollState;
}
