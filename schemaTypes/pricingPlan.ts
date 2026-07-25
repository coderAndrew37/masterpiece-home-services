import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

/**
 * Maps to PricingPlan: { title, description, price, features: string[], popular: boolean }
 * Reused for both residentialPricing and commercialPricing arrays on pricingPage.
 */
export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Plan Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "$349" or "Custom"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'popular',
      title: 'Highlight as Popular',
      type: 'boolean',
      description: 'Adds the "Most Popular" visual treatment to this card.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
    },
  },
})