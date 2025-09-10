# Icon Text Block

A flexible rich text block component that displays a Lucide React icon alongside text with various positioning and styling options.

## Features

- **Lucide React Icons**: Choose from 60+ pre-built icons from the Lucide React library
- **Flexible Positioning**: Icon can be positioned left, right, top, or bottom of text
- **Size Options**: Multiple size options for both icon and text
- **Color Themes**: Uses design system colors (primary, secondary, accent, default)
- **Responsive Design**: Adapts to different screen sizes
- **Rich Text Integration**: Available as a block in the Lexical rich text editor
- **Type Safe**: Full TypeScript support with proper icon validation

## Usage in Rich Text Editor

1. In any rich text field, click the "+" button to add a block
2. Select "Icon Text Block" from the available blocks
3. Configure the following fields:
   - **Icon**: Select from 60+ Lucide React icons (Heart, Clock, Check, etc.)
   - **Text**: Enter the text to display
   - **Icon Position**: Choose where to place the icon relative to text
   - **Icon Size**: Select from Small (16px) to Extra Large (40px)
   - **Text Size**: Choose text size from Small to Extra Large
   - **Text Color**: Select from design system colors
   - **Icon Color**: Select from design system colors

## Available Icons

The component includes 60+ popular Lucide React icons including:

### Common Icons
- Heart, Clock, Check, Star, User, Mail, Phone, MapPin
- Calendar, Shield, Zap, Activity, Scan, Stethoscope
- Settings, Info, AlertCircle, CheckCircle, XCircle

### Navigation Icons
- ArrowRight, ArrowLeft, ArrowUp, ArrowDown
- ExternalLink, Download, Upload, Search, Filter
- Menu, X, Home, Building, Globe

### UI Icons
- Eye, EyeOff, Lock, Unlock, Key
- Plus, Minus, Wifi, Bluetooth, Battery
- Volume2, VolumeX, Play, Pause, Stop

### Weather Icons
- Sun, Moon, Cloud, CloudRain, CloudSnow
- Wind, Thermometer, Droplets, Umbrella
- Sunrise, Sunset

### And many more!

## Design System Integration

The component uses the following design system colors:
- **Primary**: Dark Blue (`#3d426a`)
- **Secondary**: Pastille Green (`#547b82`)
- **Accent**: Yellow (`#faa636`)
- **Default**: Gray variants

## Technical Details

- Built with TypeScript for type safety
- Uses Tailwind CSS for styling
- Integrates with Payload CMS rich text editor
- Supports all standard accessibility features
- Responsive design with mobile-first approach
