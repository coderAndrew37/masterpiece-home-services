// sanity/schemas/pricingPlan.ts
import {defineField, defineType} from 'sanity'

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'description',
      title: 'Scope',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'string',
      description: '"$199" or "Custom"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({name: 'popular', title: 'Highlight as Most Popular', type: 'boolean', initialValue: false}),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Include this plan in the condensed pricing preview on the homepage.',
      initialValue: true,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'price'}},
})