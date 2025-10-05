import React from 'react'
import { ButtonBlock } from '@/app/(frontend)/components/button-block/component'
import { FormBlock } from '@/app/(frontend)/components/form-block/component'
import { IconTextBlock } from '@/app/(frontend)/components/icon-text-block/component'
import { ImageBlock } from '@/app/(frontend)/components/image-block/component'

/**
 * JSX converters for blocks in Lexical rich text editor
 */
export const jsxConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,
  blocks: {
    buttonBlock: ({ node }: { node: any }) => {
      return <ButtonBlock {...node.fields} />
    },
    formBlock: ({ node }: { node: any }) => {
      return <FormBlock {...node.fields} />
    },
    iconTextBlock: ({ node }: { node: any }) => {
      return <IconTextBlock {...node.fields} />
    },
    imageBlock: ({ node }: { node: any }) => {
      return <ImageBlock {...node.fields} />
    },
  },
})
