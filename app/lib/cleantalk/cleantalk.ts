'use client';

import { useEffect, useState } from 'react';

const CLEANTALK_SCRIPT_URL = 'https://fd.cleantalk.org/ct-bot-detector-wrapper.js';
const SCRIPT_ID = 'cleantalk-bot-detector';

export interface UseCleanTalkBotDetectorOptions {
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

export function useCleanTalkBotDetector(options?: UseCleanTalkBotDetectorOptions) {
  const [scriptFailed, setScriptFailed] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Prevent duplicate scripts (handles React Strict Mode)
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      // Script already exists, check if it loaded successfully
      const isLoaded = (existingScript as HTMLScriptElement).dataset.loaded === 'true';
      setScriptLoaded(isLoaded);
      setScriptFailed(!isLoaded && (existingScript as HTMLScriptElement).dataset.error === 'true');
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = CLEANTALK_SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      script.dataset.loaded = 'true';
      setScriptLoaded(true);
      options?.onLoad?.();
    };

    script.onerror = () => {
      script.dataset.error = 'true';
      setScriptFailed(true);
      options?.onError?.(new Error('Failed to load CleanTalk bot detector script'));
    };

    document.body.appendChild(script);

    // Cleanup on unmount (optional, script can stay for SPA navigation)
    return () => {
      // Keep script loaded for performance; remove only if you need strict cleanup
      // script.remove();
    };
  }, [options]);

  return {
    scriptFailed,
    scriptLoaded,
    setScriptFailed, // Expose setter if parent needs to reset state
  };
}