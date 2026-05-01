import { defineField } from 'sanity';

import { slugify } from '../lib/slug';

export const defaultSlugOptions = {
  source: 'title',
  maxLength: 96
};

export const imageAltField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description: 'Optional, but recommended for accessibility.'
});

export const portableTextStyles = [
  { title: 'Normal', value: 'normal' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' }
];

export const codeLanguageOptions = [
  { title: 'C#', value: 'csharp' },
  { title: 'TypeScript', value: 'typescript' },
  { title: 'TSX', value: 'tsx' },
  { title: 'Python', value: 'python' },
  { title: 'YAML', value: 'yaml' },
  { title: 'Plaintext', value: 'txt' }
];

export const validateSlugCompatibleTags = (tags: unknown) => {
  if (!tags) return true;
  if (!Array.isArray(tags)) return 'Tags must be an array.';

  for (const tag of tags) {
    if (typeof tag !== 'string') return 'Tags must be strings.';
    if (slugify(tag) !== tag) return `Tag "${tag}" is not slug compatible.`;
  }

  return true;
};
