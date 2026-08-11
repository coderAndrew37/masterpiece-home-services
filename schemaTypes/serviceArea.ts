// sanity/schemas/serviceArea.ts
import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons/Pin'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'services', title: 'Services Offered Here'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Neighborhood Name',
      type: 'string',
      description: 'e.g. "Sahali" — used in H1, breadcrumbs, and schema.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'region',
      title: 'Parent Region',
      type: 'string',
      initialValue: 'Kamloops',
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      group: 'content',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description:
        'SAFETY GATE — leave OFF until every [TODO] blurb below has been replaced with genuinely unique, locally-accurate copy. Unpublished pages are excluded from generateStaticParams and will 404. Do not flip this on for templated or unverified content — see the local SEO roadmap on duplicate-content risk.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      description:
        'Must contain at least one concrete, verifiable local detail (streets, housing stock, landmarks). Never search-and-replace another area\u2019s intro.',
      validation: (Rule) => Rule.required().max(500),
      group: 'content',
    }),
    defineField({
      name: 'localHook',
      title: 'Local Hook (optional)',
      type: 'text',
      rows: 2,
      description: 'One specific fact unique to this area, e.g. housing age, terrain, tree cover.',
      group: 'content',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Services Offered Here',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'relatedServiceBlurb',
          fields: [
            defineField({
              name: 'service',
              title: 'Service',
              type: 'reference',
              to: [{type: 'service'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'blurb',
              title: 'Area-Specific Blurb',
              type: 'text',
              rows: 3,
              description:
                '2-3 sentences unique to this service IN THIS AREA. Must not be reused verbatim across other neighborhoods for the same service.',
              validation: (Rule) => Rule.required().max(400),
            }),
          ],
          preview: {
            select: {title: 'service.title', subtitle: 'blurb'},
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      group: 'services',
    }),
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
    select: {title: 'name', subtitle: 'region', media: 'heroImage', published: 'published'},
    prepare({title, subtitle, media, published}) {
      return {
        title: published ? title : `${title} (Draft)`,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
})