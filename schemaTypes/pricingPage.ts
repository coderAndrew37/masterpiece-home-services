import {defineField, defineType} from 'sanity'

/**
 * Singleton document — there should only ever be one of these.
 * (Restrict creation of more than one via the desk structure, see structure.ts.)
 *
 * Maps to PricingClient's props: residentialPricing, commercialPricing, addons, faqs
 * plus the hero copy that's currently hardcoded in PricingClient.
 */
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
    // --- Hero ---
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'e.g. "Clear, Honest Estimates"',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'e.g. "Simple, Transparent Pricing"',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      group: 'hero',
    }),

    // --- Plans ---
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

    // --- Addons ---
    defineField({
      name: 'addons',
      title: 'Standalone / A La Carte Services',
      type: 'array',
      of: [{type: 'addon'}],
      group: 'addons',
    }),

    // --- FAQs (distinct to this page — see note below) ---
    defineField({
      name: 'faqs',
      title: 'Pricing FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      description: 'FAQs shown at the bottom of the pricing page only.',
      group: 'faqs',
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Pricing Page'}
    },
  },
})