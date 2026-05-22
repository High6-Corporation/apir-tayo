'use client'

import { useConsent } from './ConsentProvider'
import type { ConsentCategory } from '@/app/lib/consent/consent-types'

type ConsentGateProps = {
  category?: ConsentCategory
  children: React.ReactNode
  fallbackTitle?: string
  fallbackDescription?: string
}

export function ConsentGate({
  category = 'embedded',
  children,
  fallbackTitle = 'Content blocked',
  fallbackDescription = 'This content uses third-party services. Please allow embedded content to view it.',
}: ConsentGateProps) {
  const { consent, openSettings } = useConsent()

  if (consent[category]) {
    return <>{children}</>
  }

  return (
    <div className="rounded-md border bg-gray-50 p-6 text-center">
      <h3 className="font-medium">{fallbackTitle}</h3>

      <p className="mt-2 text-sm text-gray-600">{fallbackDescription}</p>

      <button
        type="button"
        onClick={openSettings}
        className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
      >
        Manage cookie settings
      </button>
    </div>
  )
}
