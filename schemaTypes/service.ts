import {defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'

/**
 * Single source of truth for both:
 *  - ServiceItem (used on /services list page + homepage ServicePlatforms cards)
 *  - DetailedService (used on /services/[slug] detail page)
 *
 * Field name notes vs your current TS interfaces:
 *  - ServiceItem.image        -> cardImage
 *  - ServiceItem.shortDesc    -> shortDescription
 *  - DetailedService.heroImage-> heroImage (falls back to cardImage in the frontend if empty)
 *  - DetailedService.description (string[]) -> description (blockContent, richer + easier to edit)
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'listing', title: 'Listing (Cards)', default: true},
    {name: 'detail', title: 'Detail Page'},
    {name: 'gallery', title: 'Gallery'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Core identity ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Pure-Water Window Detailing"',
      validation: (Rule) => Rule.required(),
      group: ['listing', 'detail'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: ['listing', 'detail'],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first on the services grid.',
      initialValue: 0,
      group: 'listing',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional flag shown on the card and detail hero, e.g. "Most Popular", "New Service".',
      group: ['listing', 'detail'],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon shown on the service card.',
      options: {
        list: [
          {title: 'Home', value: 'FiHome'},
          {title: 'Droplet', value: 'FiDroplet'},
          {title: 'Sun', value: 'FiSun'},
          {title: 'Zap', value: 'FiZap'},
          {title: 'Shield', value: 'FiShield'},
          {title: 'Calendar', value: 'FiCalendar'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'FiHome',
      validation: (Rule) => Rule.required(),
      group: 'listing',
    }),

    // --- Listing / card fields ---
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      validation: (Rule) => Rule.required(),
      group: 'listing',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the services grid card.',
      validation: (Rule) => Rule.required().max(200),
      group: 'listing',
    }),
    defineField({
      name: 'features',
      title: 'Card Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short checklist bullets shown on the card (3-5 items).',
      validation: (Rule) => Rule.max(6),
      group: 'listing',
    }),

    // --- Detail page fields ---
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Shown under the title in the detail page hero.',
      validation: (Rule) => Rule.required(),
      group: 'detail',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      description: 'Used as the detail page hero background. Falls back to Card Image if left empty.',
      group: 'detail',
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g. "$199" or "from $299"',
      validation: (Rule) => Rule.required(),
      group: ['listing', 'detail'],
    }),
    defineField({
      name: 'description',
      title: 'Service Overview',
      type: 'blockContent',
      description: 'Rich text overview shown in the "Service Overview" block on the detail page.',
      group: 'detail',
    }),
    defineField({
      name: 'whatsIncluded',
      title: "What's Included",
      type: 'array',
      of: [{type: 'string'}],
      group: 'detail',
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{type: 'string'}],
      group: 'detail',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{type: 'processStep'}],
      group: 'detail',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'faq'}],
      group: 'detail',
    }),

    // --- Gallery ---
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'galleryImage'}],
      description: 'Additional photos for this specific service (before/after, job site shots, etc.), shown on the detail page.',
      options: {layout: 'grid'},
      group: 'gallery',
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the auto-generated <title>. Leave blank to use the default pattern.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Overrides the meta description. Leave blank to fall back to the subtitle.',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'cardImage',
      badge: 'badge',
    },
    prepare({title, subtitle, media, badge}) {
      return {
        title: badge ? `${title} · ${badge}` : title,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})