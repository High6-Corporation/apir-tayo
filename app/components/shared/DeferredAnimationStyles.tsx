'use client';

import { useEffect, useState } from 'react';

const animationCSS = `
@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-1297px); }
}
@keyframes scroll-down {
  0% { transform: translateY(-1297px); }
  100% { transform: translateY(0); }
}
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-up { animation: scroll-up 25s linear infinite; }
.animate-scroll-down { animation: scroll-down 25s linear infinite; }
.animate-scroll-left { animation: scroll-left 20s linear infinite; }

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }

@keyframes fadeInUpScroll {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeftScroll {
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRightScroll {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes scaleInScroll {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

.scroll-animate-visible { animation: fadeInUpScroll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.scroll-animate-left.scroll-animate-visible { animation: fadeInLeftScroll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.scroll-animate-right.scroll-animate-visible { animation: fadeInRightScroll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.scroll-animate-scale.scroll-animate-visible { animation: scaleInScroll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
.stagger-6 { animation-delay: 0.6s; }
`;

export default function DeferredAnimationStyles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const inject = () => {
      // Use rAF to batch style injection with next paint, reducing forced reflow
      requestAnimationFrame(() => setMounted(true));
    };
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(inject, { timeout: 1500 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(inject, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return <style dangerouslySetInnerHTML={{ __html: animationCSS }} />;
}
