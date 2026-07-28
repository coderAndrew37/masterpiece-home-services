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
      description: 'e.g. "Perfect for routine maintenance, seasonal window washes & quick indoor tidy-ups."',
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
  ],
  preview: {select: {title: 'title', subtitle: 'price'}},
})