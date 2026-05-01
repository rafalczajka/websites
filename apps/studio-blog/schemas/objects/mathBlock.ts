import { defineField, defineType } from 'sanity';

import { MathBlockPreview } from '../../components/math-block-preview';

export const mathBlock = defineType({
  name: 'mathBlock',
  title: 'Math Block',
  type: 'object',
  components: {
    preview: MathBlockPreview
  },
  preview: {
    select: {
      latex: 'latex',
      displayMode: 'displayMode'
    },
    prepare({ latex, displayMode }) {
      return {
        title: 'Math formula',
        subtitle: latex,
        description: displayMode ? 'block' : 'inline'
      };
    }
  },
  fields: [
    defineField({
      name: 'latex',
      title: 'LaTeX',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'displayMode',
      title: 'Display mode',
      type: 'boolean',
      initialValue: true
    })
  ]
});
