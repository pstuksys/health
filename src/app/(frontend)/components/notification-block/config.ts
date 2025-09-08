import { Field } from 'payload'

export const notificationBlockFields: Field[] = [
  {
    name: 'content',
    type: 'textarea',
    label: 'Notification Content',
    defaultValue:
      'Please note: This sleep assessment is not suitable for individuals under 18 years of age. This is intended as a self-assessment tool that may help you to identify if you have any of the common symptoms for sleep disorders like sleep apnoea or Insomnia. This is not a diagnostic tool and does not constitute medical advice. Your reliance on information obtained through the use of this is solely at your own risk. We recommend that you consult with a health care professional about the results of your Sleep Assessment or if you are concerned about your sleep.',
    required: true,
    admin: {
      description: 'Small print notification text content',
    },
  },
]
