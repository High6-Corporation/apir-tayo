"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PricingSection() {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardRef, isVisible: cardVisible } = useScrollAnimation();
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShowDecorations(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShowDecorations(true), 2500);
      return () => clearTimeout(timer);
    }
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
            {/* Website Essentials */}
            <div className="max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/website-essentials-icon.svg" alt="" className="size-6" />
                  <h4 className="font-bold text-[#5757ff]">Website Essentials</h4>
                </div>
                <ul className="font-medium text-[15px] leading-[16px] text-[#59646b] space-y-4">
                  <li>Company overview</li>
                  <li>Products or services</li>
                  <li>Testimonials</li>
                  <li>Contact form</li>
                </ul>
              </div>
            </div>

            {/* Technical Setup */}
            <div className="max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/technical-setup-icon.svg" alt="" className="size-6" />
                  <h4 className="font-bold text-[#5757ff]">Technical Setup</h4>
                </div>
                <ul className="font-medium text-[15px] leading-[16px] text-[#59646b] space-y-4">
                  <li>Mobile-responsive layout</li>
                  <li>Hosting</li>
                  <li>Basic security</li>
                </ul>
              </div>
            </div>

            {/* Ongoing Support */}
            <div className="max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/ongoing-support-icon.svg" alt="" className="size-6" />
                  <h4 className="font-bold text-[#5757ff]">Ongoing Support</h4>
                </div>
                <ul className="font-medium text-[15px] leading-[16px] text-[#59646b] space-y-4">
                  <li>Support & updates</li>
                  <li>Quarterly check</li>
                </ul>
              </div>
            </div>

            {/* Flexible & Transparent */}
            <div className="max-[640px]:flex max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/flexible-transparent-icon.svg" alt="" className="size-6" />
                  <h4 className="font-bold text-[#5757ff]">Flexible & Transparent</h4>
                </div>
                <ul className="font-medium text-[15px] leading-[16px] text-[#59646b] space-y-4">
                  <li>Company overview</li>
                  <li>No hidden fees</li>
                  <li>Cancel anytime</li>
                  <li>Testimonials</li>
                  <li>Contact form</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/contact"><PrimaryButton>Get Started Today</PrimaryButton></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
