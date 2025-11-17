'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import type { Page } from '@/payload-types'

type ScoreAppWidgetProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'scoreAppWidget' }
>

export function ScoreAppWidget({
  scorecardUrl,
  displayMode = 'chat',
  buttonText = 'Take Quiz',
  buttonColor = '#ffffff',
  icon = '',
  autoOpen = false,
  size = 'medium',
  position = 'bottom-right',
  preload = false,
  autoHeight = true,
}: ScoreAppWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetInstanceRef = useRef<any>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    // Initialize ScoreApp widget after script loads
    const initializeWidget = () => {
      // Only initialize if component is still mounted
      if (
        !isMountedRef.current ||
        typeof window === 'undefined' ||
        !(window as any).ScoreAppWidget ||
        !widgetRef.current
      ) {
        return
      }

      // IMPORTANT: Remove any existing ScoreApp widgets before initializing new one
      // This prevents multiple widgets from appearing on different pages
      const existingWidgets = document.querySelectorAll(
        '.sa--chat, .sa--chat-button, .sa--slider, .sa--slider-button, .sa--popup',
      )
      existingWidgets.forEach((widget) => {
        widget.remove()
      })

      // Clear any existing widget data
      const element = widgetRef.current
      element.setAttribute('data-sa-url', scorecardUrl || '')
      element.setAttribute('data-sa-view', displayMode || 'chat')

      // Set display mode specific attributes
      switch (displayMode) {
        case 'chat':
          if (buttonText) element.setAttribute('data-sa-button-text', buttonText)
          element.setAttribute('data-sa-button-bg-color', '#faa636')
          if (buttonColor) element.setAttribute('data-sa-button-color', buttonColor)
          // Don't set icon attribute to remove icon completely
          if (autoOpen) element.setAttribute('data-sa-auto-open', '1')
          break
        case 'popup':
          if (size) element.setAttribute('data-sa-size', size)
          if (preload) element.setAttribute('data-sa-preload', '1')
          break
        case 'slider':
          if (size) element.setAttribute('data-sa-size', size)
          if (position) element.setAttribute('data-sa-position', position)
          break
        case 'inline':
          if (autoHeight) element.setAttribute('data-sa-auto-height', '1')
          break
      }

      // Initialize the widget and store the instance
      widgetInstanceRef.current = (window as any).ScoreAppWidget.createFromElement(element)

      // Fix mobile close button after widget loads
      setTimeout(() => {
        const closeButtons = document.querySelectorAll(
          '.sa--popup-close, .sa--chat-close, .sa--slider-close',
        )
        closeButtons.forEach((button) => {
          // Ensure proper touch handling on mobile
          button.addEventListener(
            'touchstart',
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            },
            { passive: false },
          )

          button.addEventListener(
            'touchend',
            (e) => {
              e.preventDefault()
              e.stopPropagation()
              // Trigger click event
              ;(button as HTMLElement).click()
            },
            { passive: false },
          )
        })
      }, 500)
    }

    // Small delay to ensure script is loaded
    const timer = setTimeout(initializeWidget, 100)

    // Cleanup function to remove the widget when component unmounts
    return () => {
      isMountedRef.current = false
      clearTimeout(timer)

      // Remove all ScoreApp elements from the DOM
      const removeScoreAppElements = () => {
        // Remove chat widgets
        const chatElements = document.querySelectorAll('.sa--chat, .sa--chat-button')
        chatElements.forEach((el) => el.remove())

        // Remove slider widgets
        const sliderElements = document.querySelectorAll('.sa--slider, .sa--slider-button')
        sliderElements.forEach((el) => el.remove())

        // Remove popup widgets
        const popupElements = document.querySelectorAll('.sa--popup, .sa--popup-overlay')
        popupElements.forEach((el) => el.remove())

        // Remove any backdrop/overlay elements
        const overlays = document.querySelectorAll('.sa--overlay, .sa--backdrop')
        overlays.forEach((el) => el.remove())

        // Restore body scroll if it was disabled
        document.body.style.overflow = ''
      }

      removeScoreAppElements()

      // Clear the widget instance reference
      widgetInstanceRef.current = null
    }
  }, [
    scorecardUrl,
    displayMode,
    buttonText,
    buttonColor,
    icon,
    autoOpen,
    size,
    position,
    preload,
    autoHeight,
  ])

  if (!scorecardUrl || scorecardUrl.trim() === '') {
    return null
  }

  return (
    <>
      {/* Load ScoreApp embedding script */}
      <Script
        src="https://static.scoreapp.com/js/integration/v1/embedding.js?v=MSoTQW"
        strategy="lazyOnload"
      />

      {/* Custom styles for mobile compatibility */}
      <style jsx global>{`
        /* Ensure close button is visible and clickable on mobile */
        .sa--popup-close,
        .sa--chat-close,
        .sa--slider-close {
          position: absolute !important;
          top: -40px !important;
          right: 0 !important;
          width: 40px !important;
          height: 40px !important;
          font-size: 24px !important;
          line-height: 40px !important;
          text-align: center !important;
          color: #ffffff !important;
          background: rgba(0, 0, 0, 0.5) !important;
          border: none !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          z-index: 99999999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .sa--popup-close,
          .sa--chat-close,
          .sa--slider-close {
            top: 10px !important;
            right: 10px !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 30px !important;
            line-height: 50px !important;
            background: rgba(250, 166, 54, 0.9) !important; /* #faa636 with opacity */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
            border: 2px solid white !important;
          }

          /* Ensure chat modal is properly sized on mobile */
          .sa--chat {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }

          .sa--chat-iframe-wrap {
            height: calc(100vh - 80px) !important;
            max-height: calc(100vh - 80px) !important;
            border-radius: 0 !important;
          }

          /* Popup adjustments for mobile */
          .sa--popup-iframe-wrap {
            width: 95% !important;
            max-width: 95% !important;
            height: 90% !important;
            max-height: 90% !important;
            border-radius: 8px !important;
          }
        }

        /* Ensure close button stays on top */
        .sa--popup-close:hover,
        .sa--chat-close:hover,
        .sa--slider-close:hover {
          background: rgba(250, 166, 54, 1) !important; /* #faa636 solid on hover */
          transform: scale(1.1) !important;
        }

        /* Fix for touch targets on mobile */
        @media (pointer: coarse) {
          .sa--popup-close,
          .sa--chat-close,
          .sa--slider-close {
            min-width: 44px !important;
            min-height: 44px !important;
            touch-action: manipulation !important;
          }
        }
      `}</style>

      {/* Widget container */}
      <div
        ref={widgetRef}
        className={`scoreapp-widget ${displayMode === 'inline' ? 'min-h-[500px] w-full' : ''}`}
        data-sa-url={scorecardUrl || ''}
        data-sa-view={displayMode || 'chat'}
        // Chat mode attributes
        {...(displayMode === 'chat' && {
          'data-sa-button-text': buttonText || 'Take Quiz',
          'data-sa-button-bg-color': '#faa636',
          'data-sa-button-color': buttonColor || '#ffffff',
          // Icon removed - no data-sa-icon attribute
          ...(autoOpen && { 'data-sa-auto-open': '1' }),
        })}
        // Popup mode attributes
        {...(displayMode === 'popup' && {
          'data-sa-size': size || 'medium',
          ...(preload && { 'data-sa-preload': '1' }),
        })}
        // Slider mode attributes
        {...(displayMode === 'slider' && {
          'data-sa-size': size || 'medium',
          'data-sa-position': position || 'bottom-right',
        })}
        // Inline mode attributes
        {...(displayMode === 'inline' && {
          ...(autoHeight && { 'data-sa-auto-height': '1' }),
        })}
      >
        {displayMode === 'popup' && (
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ds-dark-blue hover:bg-ds-pastille-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ds-dark-blue transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
        {displayMode === 'slider' && (
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ds-dark-blue hover:bg-ds-pastille-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ds-dark-blue transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
      </div>
    </>
  )
}
