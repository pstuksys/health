import { Field } from 'payload'

export const scoreAppWidgetFields: Field[] = [
  {
    name: 'scorecardUrl',
    type: 'text',
    label: 'ScoreApp URL',
    required: true,
    admin: {
      description:
        'The full URL of your ScoreApp quiz/assessment (e.g., https://app.scoreapp.com/quiz/...)',
    },
  },
  {
    name: 'displayMode',
    type: 'select',
    label: 'Display Mode',
    options: [
      {
        label: 'Chat (Floating Button)',
        value: 'chat',
      },
      {
        label: 'Popup Modal',
        value: 'popup',
      },
      {
        label: 'Slider',
        value: 'slider',
      },
      {
        label: 'Inline Embed',
        value: 'inline',
      },
    ],
    defaultValue: 'chat',
    admin: {
      description: 'Choose how the quiz should be displayed on the page',
    },
  },
  {
    name: 'buttonText',
    type: 'text',
    label: 'Button Text',
    defaultValue: 'Take Quiz',
    admin: {
      description: 'Text displayed on the button (for chat, popup, and slider modes)',
    },
  },
  {
    name: 'buttonColor',
    type: 'text',
    label: 'Button Text Color',
    defaultValue: '#ffffff',
    admin: {
      description: 'Hex color code for button text (chat mode)',
      condition: (data) => data.displayMode === 'chat',
    },
  },
  {
    name: 'icon',
    type: 'select',
    label: 'Chat Icon',
    options: [
      { label: 'No Icon (Text Only)', value: '' },
      { label: 'Chat', value: 'chat' },
      { label: 'Quiz', value: 'quiz' },
      { label: 'Help', value: 'help' },
    ],
    defaultValue: '',
    admin: {
      description: 'Icon displayed on the chat button - Default is no icon for cleaner look',
      condition: (data) => data.displayMode === 'chat',
    },
  },
  {
    name: 'autoOpen',
    type: 'checkbox',
    label: 'Auto Open',
    defaultValue: false,
    admin: {
      description: 'Automatically open the chat when page loads',
      condition: (data) => data.displayMode === 'chat',
    },
  },
  {
    name: 'size',
    type: 'select',
    label: 'Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Full', value: 'full' },
    ],
    defaultValue: 'medium',
    admin: {
      description: 'Size of the popup/slider modal',
      condition: (data) => data.displayMode === 'popup' || data.displayMode === 'slider',
    },
  },
  {
    name: 'position',
    type: 'select',
    label: 'Slider Position',
    options: [
      { label: 'Bottom Right', value: 'bottom-right' },
      { label: 'Bottom Left', value: 'bottom-left' },
      { label: 'Top Right', value: 'top-right' },
      { label: 'Top Left', value: 'top-left' },
    ],
    defaultValue: 'bottom-right',
    admin: {
      description: 'Position of the slider on the page',
      condition: (data) => data.displayMode === 'slider',
    },
  },
  {
    name: 'preload',
    type: 'checkbox',
    label: 'Preload',
    defaultValue: false,
    admin: {
      description: 'Preload the quiz content for faster opening',
      condition: (data) => data.displayMode === 'popup',
    },
  },
  {
    name: 'autoHeight',
    type: 'checkbox',
    label: 'Auto Height',
    defaultValue: true,
    admin: {
      description: 'Automatically adjust height based on content',
      condition: (data) => data.displayMode === 'inline',
    },
  },
]
