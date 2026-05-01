import { defineField, defineType } from 'sanity';

import { CodeBlockPreview } from '../../components/code-block-preview';
import { codeLanguageOptions } from '../shared';

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  components: {
    preview: CodeBlockPreview
  },
  preview: {
    select: {
      code: 'code',
      language: 'language'
    },
    prepare({ code, language }) {
      return {
        title: language,
        description: code
      };
    }
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: codeLanguageOptions
      }
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required()
    })
  ]
});
