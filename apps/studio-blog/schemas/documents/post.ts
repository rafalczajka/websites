import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  defaultSlugOptions,
  imageAltField,
  portableTextStyles,
  validateSlugCompatibleTags
} from '../shared';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'metadata',
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: defaultSlugOptions,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      fieldset: 'metadata'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(300).warning('Keep excerpts under 300 characters.')
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Main image used on the post page and in social previews.',
      fields: [imageAltField],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      fieldset: 'metadata',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (Rule) => Rule.custom(validateSlugCompatibleTags)
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: portableTextStyles
        }),
        defineArrayMember({ type: 'codeBlock' }),
        defineArrayMember({ type: 'mathBlock' }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [imageAltField]
        })
      ],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category.title'
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category ? `Category: ${category}` : 'No category'
      };
    }
  }
});
