// ============================================================
// SHARED CONSENT UI THEME
// Edit this single file to update colors, text, and layout
// for both the Cookie Banner and the Cookie Settings Modal.
// ============================================================

export const COLORS = {
  primary: '#5757ff',          // Main brand color (buttons, links, icon, toggles)
  primaryHover: '#4646dd',     // Button hover state
  textDark: '#1e1e1e',         // Headings & dark text
  textBody: 'text-gray-600',   // Body text (Tailwind class)
  textMuted: 'text-gray-500',  // Muted/subtitle text (Tailwind class)
  bannerBg: 'bg-white',        // Banner/modal background (Tailwind class)
}

export const TEXT = {
  // Banner
  bannerTitle: 'We value your privacy',
  bannerDescription:
    'We use cookies to enhance your experience, analyze traffic, and serve relevant content. You can customize your preferences or accept all.',
  acceptButton: 'Accept All',
  rejectButton: 'Reject All',
  customizeButton: 'Customize',
  privacyLinkLabel: 'Privacy Policy',
  cookieLinkLabel: 'Cookie Policy',

  // Modal
  modalTitle: 'Cookie Settings',
  modalSubtitle: 'Choose which cookies you allow.',
  modalDescription:
    'We use cookies to enhance your experience, analyze traffic, and serve relevant content. Toggle each category below to control what you allow.',
  saveButton: 'Save Preferences',
}

export const LAYOUT = {
  // Banner
  bannerMaxWidth: 'max-w-lg',         // 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'
  bannerPosition: 'bottom-left',      // 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center'
  bannerPadding: 'p-4 sm:p-6',
  bannerBorderRadius: 'rounded-2xl',

  // Modal
  modalMaxWidth: 'max-w-xl',
  modalBorderRadius: 'rounded-2xl',
}

// Map banner position to Tailwind classes
export const POSITION_CLASSES: Record<string, string> = {
  'bottom-left': 'fixed bottom-0 left-0 z-[9999]',
  'bottom-right': 'fixed bottom-0 right-0 z-[9999]',
  'bottom-center': 'fixed inset-x-0 bottom-0 z-[9999] flex justify-center',
  'top-left': 'fixed top-0 left-0 z-[9999]',
  'top-right': 'fixed top-0 right-0 z-[9999]',
  'top-center': 'fixed inset-x-0 top-0 z-[9999] flex justify-center',
}
