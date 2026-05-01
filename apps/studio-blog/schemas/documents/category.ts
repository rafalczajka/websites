import { defineField, defineType } from 'sanity';

import { defaultSlugOptions } from '../shared';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
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
      name: 'description',
      title: 'Description',
      type: 'text'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
});
