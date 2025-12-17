'use client'

import { useEffect, useState } from 'react'
import { Share2, Copy, Check, Facebook, Linkedin } from 'lucide-react'

type IconProps = {
  className?: string
}

function XMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <path
        fill="currentColor"
        d="M996.178 0h193.833l-424.41 483.637L1200 1226.91H876.79L602.022 802.353 294.911 1226.91H101.078L561.64 703.61 0 0h336.833l249.842 356.32L996.178 0z"
      />
    </svg>
  )
}

interface ShareButtonsProps {
  title: string
  url: string
  excerpt?: string
}

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareData = {
    title,
    text: excerpt || '',
    url,
  }

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const handleNativeShare = async () => {
    if (!canNativeShare) return

    try {
      await navigator.share(shareData)
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Share this article:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Native share button (mobile) */}
          {canNativeShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-3 py-2 text-sm text-ds-pastille-green hover:text-ds-dark-blue transition-colors duration-200"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 text-sm text-ds-pastille-green hover:text-ds-dark-blue transition-colors duration-200"
            aria-label="Copy link"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* Social media share buttons */}
          <a
            href={shareLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-ds-pastille-green hover:text-ds-dark-blue transition-colors duration-200"
            aria-label="Share on X"
          >
            <XMark className="h-4 w-4" />
            <span className="hidden sm:inline">Share on X</span>
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-ds-pastille-green hover:text-ds-dark-blue transition-colors duration-200"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-ds-pastille-green hover:text-ds-dark-blue transition-colors duration-200"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
