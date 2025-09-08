import type { Page } from '@/payload-types'

type NotificationBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'notificationBlock' }
>

export function NotificationBlock({ content }: NotificationBlockProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-ds-pastille-green leading-relaxed">
          {content ||
            'Please note: This sleep assessment is not suitable for individuals under 18 years of age. This is intended as a self-assessment tool that may help you to identify if you have any of the common symptoms for sleep disorders like sleep apnoea or Insomnia. This is not a diagnostic tool and does not constitute medical advice. Your reliance on information obtained through the use of this is solely at your own risk. We recommend that you consult with a health care professional about the results of your Sleep Assessment or if you are concerned about your sleep.'}
        </p>
      </div>
    </div>
  )
}
