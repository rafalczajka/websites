import type { Metadata } from 'next';

const siteMetadata = {
  title: 'Blog',
  description:
    "A personal blog about programming, AI, physics, and other things I'm learning and exploring.",
  url: 'https://blog.rczajka.me'
} as const;

type PageMetadataInput = {
  title?: Metadata['title'];
  description?: string | null;
  canonical?: string;
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`
  },
  description: siteMetadata.description
};

export function normalizeMetadataDescription(value?: string | null) {
  const description = value?.replace(/\s+/g, ' ').trim();
  return description || undefined;
}

export function createPageMetadata({ title, description, canonical }: PageMetadataInput): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description: normalizeMetadataDescription(description) } : {}),
    ...(canonical ? { alternates: { canonical } } : {})
  };
}
