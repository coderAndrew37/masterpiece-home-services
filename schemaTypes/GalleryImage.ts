import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

/**
 * A single image inside a service's gallery.
 * Kept as its own object (rather than a bare image array) so each photo
 * can carry alt text + an optional caption for before/after style shots.
 */
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
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
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional short caption shown under the image, e.g. "Before / After".',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || subtitle || 'Gallery image',
        subtitle: title ? subtitle : undefined,
        media,
      }
    },
  },
})