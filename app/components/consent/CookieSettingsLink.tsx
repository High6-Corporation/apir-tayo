'use client'

import { useConsent } from './ConsentProvider'

export function CookieSettingsLink() {
  const { hasChosen, isReady } = useConsent()

  // Hide when banner is visible to avoid overlap; show after user makes a choice
  if (!isReady || !hasChosen) return null

  return (
    <button
      type="button"
      aria-label="Cookie Settings"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className="fixed bottom-5 left-5 z-[9998] w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1e1e1e] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 2a10 10 0 1 0 10 10 1 1 0 0 0-1-1h-.5a2.5 2.5 0 0 1-2.5-2.5V8a1 1 0 0 0-1-1h-1a2 2 0 0 1-2-2V3.5A1.5 1.5 0 0 0 12.5 2H12Zm-1.5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </button>
  )
}
