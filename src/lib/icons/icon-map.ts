import * as React from 'react'
import {
  // Core icons used across the site
  FileText,
  PhoneCall,
  Beaker,
  SquareActivity,
  Activity,
  Heart,
  Scan,
  Stethoscope,
  Brain,
  Moon,
  Baby,
  TrendingUp,
  HeartHandshake,
  ClipboardList,
  UserCheck,
  List,
  UserPlus,
  BriefcaseMedical,
  BarChart3,
  Building,
  Building2,
} from 'lucide-react'
import type { Field } from 'payload'

export type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

export type IconKey =
  | 'FileText'
  | 'PhoneCall'
  | 'Beaker'
  | 'SquareActivity'
  | 'Activity'
  | 'Heart'
  | 'Scan'
  | 'Stethoscope'
  | 'Brain'
  | 'Moon'
  | 'Baby'
  | 'TrendingUp'
  | 'HeartHandshake'
  | 'ClipboardList'
  | 'UserCheck'
  | 'List'
  | 'UserPlus'
  | 'BriefcaseMedical'
  | 'BarChart3'
  | 'Building'
  | 'Building2'

export const iconMap: Record<IconKey, LucideIcon> = {
  FileText,
  PhoneCall,
  Beaker,
  SquareActivity,
  Activity,
  Heart,
  Scan,
  Stethoscope,
  Brain,
  Moon,
  Baby,
  TrendingUp,
  HeartHandshake,
  ClipboardList,
  UserCheck,
  List,
  UserPlus,
  BriefcaseMedical,
  BarChart3,
  Building,
  Building2,
}

type CreateIconSelectFieldArgs = {
  name: string
  label?: string
  required?: boolean
  defaultValue?: IconKey
  description?: string
}

// Factory to create a Payload select field for choosing an icon from iconMap
export function createIconSelectField(args: CreateIconSelectFieldArgs): Field {
  const { name, label, required = false, defaultValue, description } = args
  const options = (Object.keys(iconMap) as IconKey[]).map((k) => ({ label: k, value: k }))
  return {
    name,
    type: 'select',
    label: label ?? 'Icon',
    required,
    options,
    defaultValue: defaultValue ?? options[0]?.value,
    admin: {
      description:
        description ?? 'Select an icon from the shared icon map (src/lib/icons/icon-map.ts).',
    },
  }
}
