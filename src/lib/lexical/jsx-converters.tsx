import React from 'react'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { ButtonBlock } from '@/app/(frontend)/components/button-block/component'
import { FormBlock } from '@/app/(frontend)/components/form-block/component'
import { IconTextBlock } from '@/app/(frontend)/components/icon-text-block/component'
import { ImageBlock } from '@/app/(frontend)/components/image-block/component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<React.ComponentProps<typeof ButtonBlock> & { blockType: 'buttonBlock' }>
  | SerializedBlockNode<React.ComponentProps<typeof FormBlock>>
  | SerializedBlockNode<React.ComponentProps<typeof IconTextBlock> & { blockType: 'iconTextBlock' }>
  | SerializedBlockNode<React.ComponentProps<typeof ImageBlock> & { blockType: 'imageBlock' }>

/**
 * JSX converters for blocks in Lexical rich text editor
 */
export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    buttonBlock: ({ node }) => <ButtonBlock {...node.fields} />,
    formBlock: ({ node }) => <FormBlock {...node.fields} />,
    iconTextBlock: ({ node }) => <IconTextBlock {...node.fields} />,
    imageBlock: ({ node }) => <ImageBlock {...node.fields} />,
  },
})
