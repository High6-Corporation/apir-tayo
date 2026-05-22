export type ConsentCategory =
  | 'necessary'
  | 'analytics'
  | 'marketing'
  | 'preferences'
  | 'embedded'

export type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  preferences: boolean
  embedded: boolean
}

export type StoredConsent = ConsentState & {
  version: string
  updatedAt: string
}
