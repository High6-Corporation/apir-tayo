import type { ConsentState, StoredConsent } from './consent-types'
import { consentConfig } from './consent-config'

const CONSENT_KEY = 'apirtayo_cookie_consent'

export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  embedded: false,
}

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as StoredConsent

    // Invalidate if config version changed
    if (parsed.version !== consentConfig.version) {
      return null
    }

    // Invalidate if consent has expired
    if (parsed.updatedAt) {
      const maxAgeMs = consentConfig.consentMaxAgeDays * 24 * 60 * 60 * 1000
      const elapsed = Date.now() - new Date(parsed.updatedAt).getTime()

      if (elapsed > maxAgeMs) {
        localStorage.removeItem(CONSENT_KEY)
        return null
      }
    }

    return parsed
  } catch {
    return null
  }
}

export function saveStoredConsent(consent: ConsentState): StoredConsent {
  const storedConsent: StoredConsent = {
    ...consent,
    necessary: true,
    version: consentConfig.version,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify(storedConsent))

  window.dispatchEvent(
    new CustomEvent('h6-consent-updated', {
      detail: storedConsent,
    })
  )

  return storedConsent
}

export function clearStoredConsent() {
  localStorage.removeItem(CONSENT_KEY)
}
