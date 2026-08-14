// sanity/schemas/testimonial.ts
import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({name: 'comment', title: 'Comment', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Only fill this in if the customer stated it themselves \u2014 never infer or guess a neighborhood.',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {list: ['Direct', 'Google', 'Other'], layout: 'radio'},
      initialValue: 'Direct',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'SAFETY GATE \u2014 submissions land here unpublished. Review for authenticity before flipping this on.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Submitted At', type: 'datetime', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'comment', rating: 'rating', published: 'published'},
    prepare({title, subtitle, rating, published}) {
      return {title: `${title} \u2014 ${'\u2605'.repeat(rating)}${published ? '' : ' (Unpublished)'}`, subtitle}
    },
  },
})