// sanity/schemas/feedback.ts
import {defineField, defineType} from 'sanity'
import {WarningOutlineIcon} from '@sanity/icons/WarningOutline'

// INTERNAL ONLY. This document type must never be referenced by any public
// GROQ query. Restrict Studio read access to owner/admin roles in
// manage.sanity.io \u2014 this holds private customer complaints.
export const feedback = defineType({
  name: 'feedback',
  title: 'Private Feedback (Internal Only)',
  type: 'document',
  icon: WarningOutlineIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'rating',
      title: 'Rating Given',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({name: 'comment', title: 'What could we improve?', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'resolved', title: 'Followed Up?', type: 'boolean', initialValue: false}),
    defineField({name: 'createdAt', title: 'Submitted At', type: 'datetime', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'comment', rating: 'rating', resolved: 'resolved'},
    prepare({title, subtitle, rating, resolved}) {
      return {title: `${title} \u2014 ${'\u2605'.repeat(rating)}${resolved ? ' \u2713' : ' (needs follow-up)'}`, subtitle}
    },
  },
})