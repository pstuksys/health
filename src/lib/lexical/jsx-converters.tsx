import React from 'react'
import { ButtonBlock } from '@/app/(frontend)/components/button-block/component'

/**
 * JSX converters for blocks in Lexical rich text editor
 */
export const jsxConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,
  blocks: {
    buttonBlock: ({ node }: { node: any }) => {
      return <ButtonBlock {...node.fields} />
    },
  },
})
