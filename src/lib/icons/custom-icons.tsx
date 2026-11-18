import * as React from 'react'

// Line icons drawn to match lucide's style (24x24, 2px round stroke) for shapes lucide doesn't have

type IconProps = React.SVGProps<SVGSVGElement>

function LineIcon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function Lungs(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3v8l-2 2M12 11l2 2" />
      <path d="M9 6.5C6.5 6.5 3 11 3 17c0 2.3 1.4 3.5 3.3 3.5 2 0 3.7-1.2 3.7-3.5V7.8A1.3 1.3 0 0 0 9 6.5z" />
      <path d="M15 6.5c2.5 0 6 4.5 6 10.5 0 2.3-1.4 3.5-3.3 3.5-2 0-3.7-1.2-3.7-3.5V7.8A1.3 1.3 0 0 1 15 6.5z" />
    </LineIcon>
  )
}

export function EntHead(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M18.5 22c-1.6-1.7-2.5-3.8-2.5-6.3 0-3.2 4-5.7 4-9.7C20 3.8 17.3 2 13.5 2 9 2 6 5.2 6 8c0 .9.3 1.4 0 2l-1.8 2.6c-.3.4 0 .9.4.9H6v2.3c0 1 .8 1.7 1.7 1.7H10V22" />
      <path d="M6.5 10.5c1.6-1.1 3.6-1.3 5.5-.8" />
      <path d="M13.2 11a2 2 0 1 1 3.1 1.6c-.6.4-.8 1-.8 1.6" />
      <path d="M11.5 14c.9 1.3 1.5 3.8 1.5 8" />
    </LineIcon>
  )
}

export function Jaw(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 5.2c0-1 1.3-1.3 1.8-.4l1.1 2 1.4-2.3c.5-.8 1.8-.5 1.8.5V9h9.6c.8 0 1.4.8 1.2 1.6l-1.1 4.7c-.4 1.7-2.1 2.7-3.8 2.2L8 15.6c-2-.6-3.4-2.2-3.8-4.2z" />
      <path d="M9.1 6.5H19V9M12.4 6.5V9M15.7 6.5V9" />
    </LineIcon>
  )
}

export function DentalAppliance(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3.5 19.5c0-8 3.5-15 8.5-15s8.5 7 8.5 15h-4c0-6.2-2-11-4.5-11s-4.5 4.8-4.5 11z" />
      <path d="M3.6 16.5h3.9M16.5 16.5h3.9" />
      <path d="M3.4 13H2.6L2 19h1.5M20.6 13h.8l.6 6h-1.5" />
    </LineIcon>
  )
}
