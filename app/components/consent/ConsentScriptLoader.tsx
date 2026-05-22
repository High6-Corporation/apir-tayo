'use client'

import Script from 'next/script'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { useConsent } from './ConsentProvider'
import { consentConfig } from '@/app/lib/consent/consent-config'

export function ConsentScriptLoader() {
  const { consent } = useConsent()

  const gaId = consentConfig.scripts.gaId
  const gtmId = consentConfig.scripts.gtmId
  const metaPixelId = consentConfig.scripts.metaPixelId

  return (
    <>
      {consent.analytics && gaId && <GoogleAnalytics gaId={gaId} />}

      {consent.analytics && gtmId && <GoogleTagManager gtmId={gtmId} />}

      {consent.marketing && metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}
