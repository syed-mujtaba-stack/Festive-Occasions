import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockContentType } from './blockContentType'

export type BlogSection =
  | { type: 'p' | 'h2' | 'h3'; text: string }
  | { type: 'ul'; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  category: string
  published: string
  updated?: string
  readingMinutes: number
  metaDescription: string
  keywords: string[]
  heroImageKey: string
  lead: string
  sections: BlogSection[]
  faqs: { q: string; a: string }[]
  related: { label: string; href: string }[]
}

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Post Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      title: 'Author',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    }),
    defineField({
      name: 'updated',
      type: 'datetime',
      title: 'Last Updated',
    }),
    defineField({
      name: 'readingMinutes',
      type: 'number',
      title: 'Reading Time (min)',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      title: 'SEO Keywords',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'heroImageKey',
      type: 'string',
      title: 'Hero Image Key',
      description: 'Key in the website image manifest used to render this post hero.',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Post Body',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        defineArrayMember({
          name: 'blogSection',
          type: 'object',
          title: 'Article Section',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              title: 'Section Type',
              options: {
                list: [
                  { title: 'Paragraph', value: 'p' },
                  { title: 'Heading 2', value: 'h2' },
                  { title: 'Heading 3', value: 'h3' },
                  { title: 'Bullet List', value: 'ul' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'text',
              title: 'Text',
              rows: 4,
              hidden: ({ parent }) => parent?.type === 'ul',
            }),
            defineField({
              name: 'items',
              type: 'array',
              title: 'List Items',
              of: [defineArrayMember({ type: 'string' })],
              hidden: ({ parent }) => parent?.type !== 'ul',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'lead',
      type: 'text',
      title: 'Lead Paragraph',
      rows: 3,
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        defineArrayMember({
          name: 'faqEntry',
          type: 'object',
          title: 'FAQ Entry',
          fields: [
            defineField({
              name: 'q',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'a',
              type: 'text',
              title: 'Answer',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'related',
      type: 'array',
      title: 'Related Links',
      of: [
        defineArrayMember({
          name: 'relatedLink',
          type: 'object',
          title: 'Related Link',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              type: 'string',
              title: 'URL or internal path',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'heroImage',
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      }
    },
  },
})
