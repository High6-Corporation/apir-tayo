'use client'

import { useConsent } from './ConsentProvider'
import { consentConfig } from '@/app/lib/consent/consent-config'
import { COLORS, TEXT, LAYOUT, POSITION_CLASSES } from '@/app/lib/consent/consent-theme'

export function CookieConsentBanner() {
  const { hasChosen, isReady, isSettingsOpen, acceptAll, rejectAll, openSettings } = useConsent()

  // Don't render until localStorage has been checked, after user chose, or when modal is open
  if (!isReady || hasChosen || isSettingsOpen) return null

  return (
    <div className={`${POSITION_CLASSES[LAYOUT.bannerPosition] || POSITION_CLASSES['bottom-center']} ${LAYOUT.bannerPadding}`}>
      <div className={`${LAYOUT.bannerPosition.includes('center') ? 'mx-auto' : ''} ${LAYOUT.bannerMaxWidth} w-full overflow-hidden ${LAYOUT.bannerBorderRadius} ${COLORS.bannerBg} shadow-2xl ring-1 ring-black/5`}>
        {/* Header accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: COLORS.primary }} />

        <div className="p-5 sm:p-6">
          {/* Icon + title */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${COLORS.primary}1a` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: COLORS.primary }}>
                <path d="M12 2a10 10 0 1 0 10 10 1 1 0 0 0-1-1h-.5a2.5 2.5 0 0 1-2.5-2.5V8a1 1 0 0 0-1-1h-1a2 2 0 0 1-2-2V3.5A1.5 1.5 0 0 0 12.5 2H12Zm-1.5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </div>
            <h2 className="font-heading text-lg font-semibold" style={{ color: COLORS.textDark }}>
              {TEXT.bannerTitle}
            </h2>
          </div>

          {/* Description */}
          <p className={`mt-3 text-sm leading-relaxed ${COLORS.textBody} font-body`}>
            {TEXT.bannerDescription}
          </p>

          {/* Policy links */}
          <div className="mt-3 flex gap-4 text-xs font-body">
            <a href={consentConfig.privacyPolicyUrl} className="hover:underline" style={{ color: COLORS.primary }}>
              {TEXT.privacyLinkLabel}
            </a>
            <a href={consentConfig.cookiePolicyUrl} className="hover:underline" style={{ color: COLORS.primary }}>
              {TEXT.cookieLinkLabel}
            </a>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors font-body cursor-pointer"
              style={{ backgroundColor: COLORS.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
            >
              {TEXT.acceptButton}
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50 font-body cursor-pointer"
              style={{ color: COLORS.textDark }}
            >
              {TEXT.rejectButton}
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors font-body cursor-pointer"
              style={{ color: COLORS.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${COLORS.primary}0d`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              {TEXT.customizeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
