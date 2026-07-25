import {defineField, defineType} from 'sanity'
import {AddCircleIcon} from '@sanity/icons/AddCircle'

/**
 * Maps to Addon: { service: string; price: string; category?: string }
 */
export const addon = defineType({
  name: 'addon',
  title: 'Addon Service',
  type: 'object',
  icon: AddCircleIcon,
  fields: [
    defineField({
      name: 'service',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "from $149"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      description: 'e.g. "Interior Care", "Winter Service"',
    }),
  ],
  preview: {
    select: {
      title: 'service',
      subtitle: 'price',
    },
  },
})