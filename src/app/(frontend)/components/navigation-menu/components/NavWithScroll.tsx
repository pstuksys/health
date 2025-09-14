'use client'

import type React from 'react'
import { useScrollNavigation } from '@/hooks/use-scroll-navigation'
import { NavigationMenu } from '..'

type Props = React.ComponentProps<typeof NavigationMenu>

export function NavWithScroll(props: Props) {
  const { isScrolled, isVisible } = useScrollNavigation()
  return <NavigationMenu {...props} isScrolled={isScrolled} isVisible={isVisible} sticky />
}
