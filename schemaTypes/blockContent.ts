import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          // --- NEW: Inline Post Link for deep interlinking ---
          {
            title: 'Inline Article Link',
            name: 'inlinePostLink',
            type: 'object',
            fields: [
              {
                name: 'post',
                title: 'Linked Post',
                type: 'reference',
                to: [{type: 'post'}],
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'customText',
                title: 'Custom Link Text (Optional)',
                type: 'string',
                description: 'Override the post title, e.g. "our guide on gutter guards"',
              },
            ],
          },
        ],
      },
    }),

    // Full-width image
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),

    // --- NEW: AEO Key Takeaways ---
    defineArrayMember({
      type: 'object',
      name: 'keyTakeaways',
      title: 'Key Takeaways (AEO)',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Key Takeaways',
        },
        {
          name: 'items',
          title: 'Takeaway Points',
          type: 'array',
          of: [{type: 'string'}],
          validation: (Rule) => Rule.min(2).max(5),
        },
      ],
      preview: {
        prepare() { return {title: 'Key Takeaways Block'} }
      }
    }),

    // --- Inline Table ---
    defineArrayMember({
      type: 'object',
      name: 'tableBlock',
      title: 'Table',
      fields: [
        {
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
          description: 'Shown above the table — e.g. "Kamloops Gutter Cleaning Cost by Home Size"',
        },
        {
          name: 'hasHeaderRow',
          title: 'First Row is Header',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          validation: (Rule) => Rule.min(2).error('A table needs at least a header row and one data row.'),
          of: [
            {
              type: 'object',
              name: 'row',
              fields: [
                {
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [{type: 'string'}],
                  validation: (Rule) => Rule.min(1),
                },
              ],
              preview: {
                select: {cells: 'cells'},
                prepare({cells}: {cells?: string[]}) {
                  return {title: (cells || []).join(' | ')}
                },
              },
            },
          ],
        },
      ],
      preview: {
        select: {caption: 'caption', rows: 'rows'},
        prepare({caption, rows}: {caption?: string; rows?: unknown[]}) {
          return {
            title: caption || 'Table',
            subtitle: `${(rows || []).length} rows`,
          }
        },
      },
    }),

    // --- Inline CTA ---
    defineArrayMember({
      type: 'object',
      name: 'ctaBlock',
      title: 'Inline CTA',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Ready for a Free Quote?',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'body',
          title: 'Body Text',
          type: 'text',
          rows: 2,
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Free Quote',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'buttonHref',
          title: 'Button Link',
          type: 'string',
          initialValue: '/pricing',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'style',
          title: 'Visual Style',
          type: 'string',
          options: {
            list: [
              {title: 'Dark', value: 'dark'},
              {title: 'Light / Bordered', value: 'light'},
              {title: 'Blue Highlight', value: 'highlight'},
            ],
          },
          initialValue: 'dark',
        },
      ],
      preview: {
        select: {title: 'heading', subtitle: 'buttonText'},
      },
    }),

    // --- Inline FAQ Block ---
    defineArrayMember({
      type: 'object',
      name: 'faqBlock',
      title: 'FAQ Group',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading (optional)',
          type: 'string',
          description: 'e.g. "Common Questions About Timing" — leave blank to use default "Frequently Asked Questions"',
        },
        {
          name: 'items',
          title: 'Questions',
          type: 'array',
          validation: (Rule) => Rule.min(1),
          of: [
            {
              type: 'object',
              name: 'faqItem',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {select: {title: 'question'}},
            },
          ],
        },
      ],
      preview: {
        select: {heading: 'heading', items: 'items'},
        prepare({heading, items}: {heading?: string; items?: unknown[]}) {
          return {
            title: heading || 'FAQ Group',
            subtitle: `${(items || []).length} questions`,
          }
        },
      },
    }),
  ],
})