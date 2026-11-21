import {
  getHeadingId,
  type HeadingIdMap,
  type PortableTextBlock
} from '@websites/sanity-blog/content';
import React from 'react';

import { cn } from '@/utils/cn';

type TextProps = {
  children?: React.ReactNode;
};

type HeadingProps = TextProps & {
  value: PortableTextBlock;
  headingIds?: HeadingIdMap;
};

const headingSizeMap = {
  h1: 'text-4xl sm:text-5xl',
  h2: 'text-2xl sm:text-3xl',
  h3: 'text-xl sm:text-2xl',
  h4: 'text-lg sm:text-xl',
  h5: 'text-base sm:text-lg',
  h6: 'text-sm sm:text-base'
} as const;

type HeadingTag = keyof typeof headingSizeMap;

const isHeadingTag = (style: unknown): style is HeadingTag =>
  typeof style === 'string' && style in headingSizeMap;

export function Heading({ value, headingIds, children }: HeadingProps) {
  const H = isHeadingTag(value.style) ? value.style : 'h2';

  return (
    <H
      id={getHeadingId(value, headingIds)}
      className={cn('scroll-mt-24 mt-12 first:mt-0', headingSizeMap[H])}
    >
      {children}
    </H>
  );
}

export const Text = ({ children }: TextProps) => (
  <p className="text-base leading-loose md:text-lg">{children}</p>
);
