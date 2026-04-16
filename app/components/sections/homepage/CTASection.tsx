"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton, SecondaryButton } from "../../shared/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CTASection() {
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShowBg(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShowBg(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        <div ref={ctaRef} className={`bg-[#030337] rounded-[40px] overflow-hidden relative scroll-animate-scale ${ctaVisible ? 'scroll-animate-visible' : ''}`}>
          {/* Background Pattern - deferred */}
          {showBg && (
            <div
              className="absolute inset-0 opacity-[0.16] pointer-events-none rotate-[15deg] scale-150"
              style={{
                backgroundImage: 'url(/assets/06bf200c49a8c78bfba577730d4b6f2d05411e1b.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 py-16 lg:py-24 px-8 max-[500px]:py-8 max-[500px]:px-4 text-center text-white">
            <div className="max-w-[871px] mx-auto flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">Start with one page.</h2>
                <p className="font-medium text-[15px] leading-[27px]">
                  Grow steadily, upgrade when you're ready.**
                  <br />
                  The easiest way to look professional online — without overspending.
                </p>
              </div>

              <div className="flex flex-col min-[661px]:flex-row gap-4 items-center shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)]">
                <Link href="/contact"><PrimaryButton>Get a Professional Web Page - ₱2,300/mo</PrimaryButton></Link>
                <Link href="/contact"><SecondaryButton>Schedule a Call</SecondaryButton></Link>
              </div>

              <p className="font-normal text-[14px]">No large upfront fees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
