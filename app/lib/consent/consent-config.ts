export const consentConfig = {
  version: '1.0',

  // Re-ask consent after this many days (GDPR recommends 6-12 months)
  consentMaxAgeDays: 365,

  companyName: 'ApirTayo',

  privacyPolicyUrl: '/privacy-policy',
  cookiePolicyUrl: '/cookie-policy',

  scripts: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },

  categories: {
    necessary: {
      title: 'Necessary',
      description:
        'Required for the website to work properly. These cannot be disabled.',
      examples: 'Session cookies, authentication tokens, CSRF protection',
    },
    analytics: {
      title: 'Analytics',
      description:
        'Helps us understand website traffic, page performance, and user behavior so we can improve the website.',
      examples: 'Google Analytics, page view tracking, scroll depth',
    },
    marketing: {
      title: 'Marketing',
      description:
        'Used for ads, remarketing, conversion tracking, and measuring campaign performance.',
      examples: 'Meta Pixel, Google Ads, remarketing tags',
    },
    preferences: {
      title: 'Preferences',
      description:
        'Saves user preferences such as language, display settings, or other personalization choices.',
      examples: 'Language selection, theme settings, layout preferences',
    },
    embedded: {
      title: 'Embedded Content',
      description:
        'Allows third-party content such as YouTube videos, Google Maps, external forms, and widgets.',
      examples: 'YouTube videos, Google Maps, Gravity Forms',
    },
  },
}
