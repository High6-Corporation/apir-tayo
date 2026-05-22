'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ConsentState } from '@/app/lib/consent/consent-types'
import {
  defaultConsent,
  getStoredConsent,
  saveStoredConsent,
} from '@/app/lib/consent/consent-storage'

type ConsentContextValue = {
  consent: ConsentState
  hasChosen: boolean
  isReady: boolean
  isSettingsOpen: boolean
  acceptAll: () => void
  rejectAll: () => void
  saveConsent: (consent: ConsentState) => void
  openSettings: () => void
  closeSettings: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent)
  const [hasChosen, setHasChosen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()

    if (stored) {
      setConsent({
        necessary: true,
        analytics: stored.analytics,
        marketing: stored.marketing,
        preferences: stored.preferences,
        embedded: stored.embedded,
      })

      setHasChosen(true)
    }

    setIsReady(true)

    const openSettings = () => setIsSettingsOpen(true)

    window.addEventListener('open-cookie-settings', openSettings)

    return () => {
      window.removeEventListener('open-cookie-settings', openSettings)
    }
  }, [])

  const saveConsent = (newConsent: ConsentState) => {
    const saved = saveStoredConsent(newConsent)

    setConsent({
      necessary: true,
      analytics: saved.analytics,
      marketing: saved.marketing,
      preferences: saved.preferences,
      embedded: saved.embedded,
    })

    setHasChosen(true)
    setIsSettingsOpen(false)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      embedded: true,
    })
  }

  const rejectAll = () => {
    saveConsent(defaultConsent)
  }

  const value = useMemo(
    () => ({
      consent,
      hasChosen,
      isReady,
      isSettingsOpen,
      acceptAll,
      rejectAll,
      saveConsent,
      openSettings: () => setIsSettingsOpen(true),
      closeSettings: () => setIsSettingsOpen(false),
    }),
    [consent, hasChosen, isReady, isSettingsOpen]
  )

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)

  if (!context) {
    throw new Error('useConsent must be used inside ConsentProvider')
  }

  return context
}
