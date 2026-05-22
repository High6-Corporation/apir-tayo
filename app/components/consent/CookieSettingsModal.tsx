'use client'

import { useEffect, useState } from 'react'
import { useConsent } from './ConsentProvider'
import { consentConfig } from '@/app/lib/consent/consent-config'
import { COLORS, TEXT, LAYOUT } from '@/app/lib/consent/consent-theme'
import type { ConsentState } from '@/app/lib/consent/consent-types'

export function CookieSettingsModal() {
  const {
    consent,
    isSettingsOpen,
    closeSettings,
    saveConsent,
    acceptAll,
    rejectAll,
  } = useConsent()

  const [draft, setDraft] = useState<ConsentState>(consent)

  useEffect(() => {
    if (isSettingsOpen) {
      setDraft(consent)
    }
  }, [isSettingsOpen, consent])

  if (!isSettingsOpen) return null

  const updateDraft = (key: keyof ConsentState, value: boolean) => {
    if (key === 'necessary') return

    setDraft((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const rows: Array<{
    key: keyof ConsentState
    title: string
    description: string
    examples: string
    disabled?: boolean
  }> = [
    {
      key: 'necessary',
      title: consentConfig.categories.necessary.title,
      description: consentConfig.categories.necessary.description,
      examples: consentConfig.categories.necessary.examples,
      disabled: true,
    },
    {
      key: 'analytics',
      title: consentConfig.categories.analytics.title,
      description: consentConfig.categories.analytics.description,
      examples: consentConfig.categories.analytics.examples,
    },
    {
      key: 'marketing',
      title: consentConfig.categories.marketing.title,
      description: consentConfig.categories.marketing.description,
      examples: consentConfig.categories.marketing.examples,
    },
    {
      key: 'preferences',
      title: consentConfig.categories.preferences.title,
      description: consentConfig.categories.preferences.description,
      examples: consentConfig.categories.preferences.examples,
    },
    {
      key: 'embedded',
      title: consentConfig.categories.embedded.title,
      description: consentConfig.categories.embedded.description,
      examples: consentConfig.categories.embedded.examples,
    },
  ]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className={`max-h-[90vh] w-full ${LAYOUT.modalMaxWidth} overflow-y-auto ${LAYOUT.modalBorderRadius} ${COLORS.bannerBg} shadow-2xl ring-1 ring-black/5`}>
        {/* Header accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: COLORS.primary }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${COLORS.primary}1a` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: COLORS.primary }}>
                  <path d="M12 2a10 10 0 1 0 10 10 1 1 0 0 0-1-1h-.5a2.5 2.5 0 0 1-2.5-2.5V8a1 1 0 0 0-1-1h-1a2 2 0 0 1-2-2V3.5A1.5 1.5 0 0 0 12.5 2H12Zm-1.5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold" style={{ color: COLORS.textDark }}>
                  {TEXT.modalTitle}
                </h2>
                <p className={`text-sm ${COLORS.textMuted} font-body`}>{TEXT.modalSubtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeSettings}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className={`mt-3 text-sm leading-relaxed ${COLORS.textBody} font-body`}>
            {TEXT.modalDescription}
          </p>

          {/* Policy links */}
          <div className="mt-2 flex gap-4 text-xs font-body">
            <a href={consentConfig.privacyPolicyUrl} className="hover:underline" style={{ color: COLORS.primary }}>
              {TEXT.privacyLinkLabel}
            </a>
            <a href={consentConfig.cookiePolicyUrl} className="hover:underline" style={{ color: COLORS.primary }}>
              {TEXT.cookieLinkLabel}
            </a>
          </div>

          {/* Category toggles */}
          <div className="mt-6 space-y-3">
            {rows.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold font-body" style={{ color: COLORS.textDark }}>{row.title}</h3>
                  <p className={`mt-0.5 text-xs leading-relaxed ${COLORS.textMuted} font-body`}>
                    {row.description}
                  </p>
                  <p className="mt-1 text-[11px] italic text-gray-400 font-body">
                    e.g. {row.examples}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft[row.key]}
                  disabled={row.disabled}
                  onClick={() => updateDraft(row.key, !draft[row.key])}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    row.disabled
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                  style={{
                    backgroundColor: draft[row.key] ? COLORS.primary : '#d1d5db',
                    ...(row.disabled && draft[row.key] ? { backgroundColor: COLORS.primary } : {}),
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      draft[row.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Footer buttons */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50 font-body cursor-pointer"
              style={{ color: COLORS.textDark }}
            >
              {TEXT.rejectButton}
            </button>
            <button
              type="button"
              onClick={() =>
                saveConsent({
                  ...draft,
                  necessary: true,
                })
              }
              className="rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors font-body cursor-pointer"
              style={{ color: COLORS.primary, borderColor: COLORS.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${COLORS.primary}0d`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {TEXT.saveButton}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors font-body cursor-pointer"
              style={{ backgroundColor: COLORS.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
            >
              {TEXT.acceptButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
