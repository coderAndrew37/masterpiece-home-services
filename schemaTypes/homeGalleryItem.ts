import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

/**
 * A single image in the homepage "Our Work Gallery" section.
 * Distinct from `galleryImage` (used on services) because it needs
 * a `category` for the homepage's filter/tab UI.
 */
export const homeGalleryItem = defineType({
  name: 'homeGalleryItem',
  title: 'Gallery Item',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the image for SEO and accessibility.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'Residential'},
          {title: 'Commercial', value: 'Commercial'},
          {title: 'High-Rise', value: 'High-Rise'},
          {title: 'Pressure Washing', value: 'Pressure Washing'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'category', subtitle: 'alt', media: 'image'},
  },
})