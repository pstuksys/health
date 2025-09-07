import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  InlineCodeFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  AlignFeature,
  IndentFeature,
  LinkFeature,
  UploadFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

/**
 * Simplified editor configuration for nested rich text fields within blocks
 * This prevents infinite recursion by excluding BlocksFeature
 */
export const nestedRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),

    // Headings (limited to prevent deep nesting)
    HeadingFeature({
      enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'], // Exclude h1, h2 to maintain hierarchy
    }),

    // Lists
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),

    // Other elements
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Alignment and layout
    AlignFeature(),
    IndentFeature(),

    // Links and media (simplified)
    LinkFeature({
      fields: [
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'text',
          admin: {
            description: 'The rel attribute for the link',
          },
        },
      ],
    }),
    UploadFeature({
      collections: {
        uploads: {
          fields: [
            {
              name: 'caption',
              type: 'text', // Use text instead of richText to avoid further nesting
            },
          ],
        },
      },
    }),

    // Toolbar
    FixedToolbarFeature(),

    // Note: BlocksFeature is intentionally excluded to prevent infinite recursion
  ],
})

/**
 * Minimal editor configuration for very simple rich text fields
 * Use this for short descriptions, captions, etc.
 */
export const minimalRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Only basic text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),

    // Basic links
    LinkFeature(),

    // Simple toolbar
    FixedToolbarFeature(),
  ],
})

/**
 * Content-focused editor for longer form content within blocks
 * Includes more features but still avoids blocks to prevent recursion
 */
export const contentRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Full text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),

    // Headings for content structure
    HeadingFeature({
      enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'],
    }),

    // All list types
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),

    // Content elements
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Layout
    AlignFeature(),
    IndentFeature(),

    // Enhanced links and media
    LinkFeature({
      fields: [
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'text',
        },
      ],
    }),
    UploadFeature({
      collections: {
        uploads: {
          fields: [
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
      },
    }),

    FixedToolbarFeature(),
  ],
})
