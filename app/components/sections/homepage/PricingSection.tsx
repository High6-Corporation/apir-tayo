"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";

const pricingIconMap: Record<string, string> = {
  "Website Essentials": "/assets/website-essentials-icon.svg",
  "Technical Setup": "/assets/technical-setup-icon.svg",
  "Ongoing Support": "/assets/ongoing-support-icon.svg",
  "Flexible & Transparent": "/assets/flexible-transparent-icon.svg",
};

interface PricingSectionProps {
  plans: { id?: string; label: string; items?: { item: string; id?: string | null }[] | null }[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardRef, isVisible: cardVisible } = useScrollAnimation();
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    const show = () => setShowDecorations(true);
    const events = ['scroll', 'mousemove', 'touchstart', 'keydown'] as const;
    const cleanup = () => events.forEach(e => window.removeEventListener(e, handler));
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => { cleanup(); clearTimeout(timer); show(); };
    events.forEach(e => window.addEventListener(e, handler, { once: true, passive: true }));
    timer = setTimeout(() => { cleanup(); show(); }, 10000);
    return () => { cleanup(); clearTimeout(timer); };
  }, []);

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      {/* Background Decorative Images - deferred to avoid LCP detection */}
      {showDecorations && (
        <>
          <div
            className="absolute left-0 top-0 w-[633px] h-[633px] scale-y-[-100%] opacity-[0.04] pointer-events-none max-[1180px]:hidden"
            style={{
              backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none max-[1180px]:hidden"
            style={{
              backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 relative">
        {/* Section Header */}
        <div ref={headerRef} className={`flex flex-col items-center text-center mb-12 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
          <div className="flex items-center gap-1 mb-2">
            <div className="h-0 w-14 border-t border-[#5757ff]" />
            <img src="/assets/pricing-icon.svg" alt="" className="h-[24px] w-[24px]" />
            <p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">PRICING</p>
            <div className="h-0 w-14 border-t border-[#5757ff]" />
          </div>
          <h3 className="font-semibold tracking-[-0.6px] text-[#333]">
            Simple, Transparent Pricing
          </h3>
        </div>

        {/* Pricing Card */}
        <div ref={cardRef} className={`bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] p-8 lg:p-12 max-[767px]:p-6 max-w-[1280px] mx-auto scroll-animate-scale ${cardVisible ? 'scroll-animate-visible' : ''}`}>
          <h4 className="font-semibold text-[#333] text-center mb-12 text-[25px] leading-[38px] max-[980px]:text-[20px] max-[980px]:leading-[28px] max-[767px]:text-[18px] max-[767px]:leading-[24px]">
            What's Included (₱2,300/month)
          </h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {plans.map((plan) => (
              <div key={plan.id || plan.label} className="max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={pricingIconMap[plan.label] || "/assets/pricing-icon.svg"} alt="" className="size-6" />
                    <h4 className="font-bold text-[#5757ff]">{plan.label}</h4>
                  </div>
                  <ul className="font-medium text-[15px] leading-[16px] text-[#59646b] space-y-4">
                    {plan.items?.map((it) => (
                      <li key={it.id || it.item}>{it.item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/contact"><PrimaryButton>Get Started Today</PrimaryButton></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
