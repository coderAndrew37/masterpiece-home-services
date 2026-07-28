// sanity/schemas/pricingPage.ts — unchanged from what you provided, included for completeness
import {defineField, defineType} from 'sanity'

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'plans', title: 'Plans'},
    {name: 'addons', title: 'Addons'},
    {name: 'faqs', title: 'FAQs'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroTagline', title: 'Hero Tagline', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'string', validation: (Rule) => Rule.required(), group: 'hero'}),
    defineField({name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 2, group: 'hero'}),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      group: 'hero',
    }),
    defineField({
      name: 'residentialPricing',
      title: 'Residential Plans',
      type: 'array',
      of: [{type: 'pricingPlan'}],
      validation: (Rule) => Rule.required().min(1),
      group: 'plans',
    }),
    defineField({
      name: 'commercialPricing',
      title: 'Commercial & Strata Plans',
      type: 'array',
      of: [{type: 'pricingPlan'}],
      validation: (Rule) => Rule.required().min(1),
      group: 'plans',
    }),
    defineField({
      name: 'addons',
      title: 'Standalone / A La Carte Services',
      type: 'array',
      of: [{type: 'addon'}],
      group: 'addons',
    }),
    defineField({
      name: 'faqs',
      title: 'Pricing FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      group: 'faqs',
    }),
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo'}),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
  ],
  preview: {prepare: () => ({title: 'Pricing Page'})},
})