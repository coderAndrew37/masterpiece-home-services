import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons/List'

/**
 * Maps to DetailedService.processSteps: { title: string; desc: string }[]
 */
export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      description: 'e.g. "1. Frame & Sill Vacuum / Wipe" — include the number if you want manual control.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Step Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'desc',
    },
  },
})