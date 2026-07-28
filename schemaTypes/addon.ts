// sanity/schemas/addon.ts
import {defineField, defineType} from 'sanity'

export const addon = defineType({
  name: 'addon',
  title: 'Addon',
  type: 'object',
  fields: [
    defineField({name: 'service', title: 'Service Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'price', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'category',
      title: 'Category Tag',
      type: 'string',
      description: 'e.g. "Interior Care", "Winter Service", "Eco Care"',
    }),
  ],
  preview: {select: {title: 'service', subtitle: 'price'}},
})