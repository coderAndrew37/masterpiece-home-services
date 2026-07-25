import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

/**
 * Maps to BeforeAfterItem: { title, service, beforeImg, afterImg }
 *
 * This is a standalone document (not embedded on a page) so you can keep adding
 * project results over time, tag which service they belong to, and reuse the
 * same pool of before/afters on the homepage swiper AND (optionally) on a
 * specific service's detail page later.
 */
export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before / After',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Exterior Window Restoration"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{type: 'service'}],
      description: 'Optional link to the service this result belongs to.',
    }),
    defineField({
      name: 'serviceLabel',
      title: 'Service Label',
      type: 'string',
      description:
        'Display label shown on the card, e.g. "Pure-Water Detailing". Falls back from Related Service if left blank.',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Only featured items show in the homepage swiper.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'serviceLabel',
      media: 'afterImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})