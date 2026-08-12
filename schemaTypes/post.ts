import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Meta & Organization'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- Content ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on blog listing cards and used as a fallback meta description.',
      validation: (Rule) => Rule.required().max(240),
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative Text', type: 'string'}],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Insert tables, CTAs, and FAQ groups directly using the toolbar buttons.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // --- Meta & organization ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated At',
      type: 'datetime',
      group: 'meta',
      description: 'Update manually on material revisions — feeds dateModified in BlogPosting schema for freshness signals.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Featured posts can be pinned to the top of the blog index or homepage.',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      description: 'Optional manual override. Leave blank to calculate on the frontend from the body word count.',
      group: 'meta',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      description: 'Optional — link this post to the service(s) it discusses, for cross-promotion.',
      group: 'meta',
    }),
    defineField({
      name: 'relatedServiceAreas',
      title: 'Related Service Areas',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'serviceArea'}]}],
      description: 'Optional — link this post to neighborhood(s) it references, for internal linking to /service-areas/[slug].',
      group: 'meta',
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the auto-generated <title>. Leave blank to use the post title.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Overrides the meta description. Leave blank to fall back to the excerpt.',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO / Social Share Image',
      type: 'image',
      description: 'Overrides the Open Graph image. Leave blank to fall back to Main Image.',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Exclude from Search Engines',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
      description: 'Toggle on to noindex this post (thin content, duplicate coverage, etc). Use if two posts end up cannibalizing the same keyword.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, authorName, media, publishedAt}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unpublished'
      return {
        title,
        subtitle: authorName ? `${authorName} · ${date}` : date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})