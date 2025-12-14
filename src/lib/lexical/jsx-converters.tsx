import React from 'react'
import { ButtonBlock } from '@/app/(frontend)/components/button-block/component'
import { FormBlock } from '@/app/(frontend)/components/form-block/component'
import { IconTextBlock } from '@/app/(frontend)/components/icon-text-block/component'
import { ImageBlock } from '@/app/(frontend)/components/image-block/component'

type ButtonBlockFields = React.ComponentProps<typeof ButtonBlock>
type FormBlockFields = React.ComponentProps<typeof FormBlock>
type IconTextBlockFields = React.ComponentProps<typeof IconTextBlock>
type ImageBlockFields = React.ComponentProps<typeof ImageBlock>

type NodeWithFields<T extends Record<string, unknown>> = { node: { fields: T } }

/**
 * JSX converters for blocks in Lexical rich text editor
 */
export const jsxConverters = ({
  defaultConverters,
}: {
  defaultConverters: Record<string, unknown>
}) => ({
  ...defaultConverters,
  blocks: {
    buttonBlock: ({ node }: NodeWithFields<ButtonBlockFields>) => {
      const fields = { ...(node.fields as ButtonBlockFields) }
      return <ButtonBlock {...fields} />
    },
    formBlock: ({ node }: NodeWithFields<FormBlockFields>) => {
      const fields = { ...(node.fields as FormBlockFields) }
      return <FormBlock {...fields} />
    },
    iconTextBlock: ({ node }: NodeWithFields<IconTextBlockFields>) => {
      const fields = { ...(node.fields as IconTextBlockFields) }
      return <IconTextBlock {...fields} />
    },
    imageBlock: ({ node }: NodeWithFields<ImageBlockFields>) => {
      const fields = { ...(node.fields as ImageBlockFields) }
      return <ImageBlock {...fields} />
    },
  },
})
