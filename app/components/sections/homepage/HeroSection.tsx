"use client";

import Link from "next/link";
import Image from "next/image";
import { PortfolioGallery } from "@/app/components/sections/homepage/PortfolioGallery";
import { PrimaryButton } from "@/app/components/shared/Buttons";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    // Load decorative images well after LCP measurement
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShowDecorations(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShowDecorations(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      {/* Background Decorative Images - loaded after LCP to avoid detection */}
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
            className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-16 lg:pt-16">
        {/* Hero Container - Desktop 2 Column, Below 1181px Stacked with Side Galleries */}
        <div className="mb-12 lg:mb-24">
          {/* Desktop Layout (1181px+): 2 Columns Side by Side */}
          <div className="hidden min-[1181px]:grid lg:grid-cols-2 gap-8 lg:gap-8">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center items-start w-[110%] max-[1280px]:max-w-[450px] max-[1180px]:max-w-none">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-[10px] py-[8px] rounded-full border border-[rgba(0,0,0,0.05)] mb-6">
                <Timer className="size-6 text-[#5757FF] shrink-0" />
                <p className="font-normal text-[12px] tracking-[-0.24px] text-[#333]">
                  <span>Professional Website — Starting at </span>
                  <span className="font-bold text-[#5757ff]">₱2,300/mo</span>
                </p>
              </div>

              {/* Heading */}
              <h1 className="max-[981px]:max-w-[550px] font-semibold tracking-[-1.1px] mb-6">
                <span className="text-[#333]">Professional Website. </span>
                <span className="text-[#5757ff]">Launched Fast. <br/>Done For You.</span>
              </h1>

              {/* Description */}
              <p className="font-medium text-[15px] leading-[30px] tracking-[-0.3px] text-[#333] mb-8">
                We build professional one-page websites that clearly present your business and make it easy for customers to contact you. Fast, affordable, and done for you.
              </p>

              {/* CTA Button */}
              <Link href="/contact">
                <PrimaryButton className="z-10">Get a High-Converting Page — ₱2,300/mo</PrimaryButton>
              </Link>
            </div>

            {/* Right Column - Portfolio Preview Gallery */}
            <div className="flex justify-center items-center justify-self-end">
              <PortfolioGallery />
            </div>
          </div>

          {/* Tablet/Mobile Layout (below 1181px): Content First, Gallery Below */}
          <div className="min-[1181px]:hidden">
            {/* Content Section */}
            <div className="flex flex-col items-center text-center py-12 max-[1180px]:pb-2">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-[10px] py-[8px] rounded-full border border-[rgba(0,0,0,0.05)] bg-white shadow-lg mb-6">
                  <Timer className="size-6 text-[#5757FF] shrink-0" />
                  <p className="font-normal text-[12px] tracking-[-0.24px] text-[#333]">
                    <span>Professional Website — Starting at </span>
                    <span className="font-bold text-[#5757ff]">₱2,300/mo</span>
                  </p>
                </div>

                {/* Heading */}
                <h1 className="font-semibold tracking-[-1.1px] mb-6 text-[#333]">
                  <span className="text-[#333]">Professional Website.</span><br/>
                  <span className="text-[#5757ff]">Launched Fast.<br/></span>
                  <span className="text-[#5757ff]">Done For You.</span>
                </h1>

                {/* Description */}
                <p className="font-medium text-[15px] leading-[30px] tracking-[-0.3px] text-[#333] mb-8">
                  We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.
                </p>

              {/* CTA Button */}
              <Link href="/contact">
                <PrimaryButton>Get a High-Converting Page — ₱2,300/mo</PrimaryButton>
              </Link>
            </div>

            {/* Portfolio Gallery Below Content */}
            <div className="relative h-[500px] overflow-hidden mt-8">
              {/* Columns Wrapper - Flexbox with gap */}
              <div className="flex justify-center gap-5 max-[767px]:gap-4">
                {/* Left Column - Scrolling Up */}
                <div className="w-[256px] shrink-0">
                  <div className="animate-scroll-up flex flex-col">
                    {/* Cards duplicated for seamless scrolling */}
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex}>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.07)] w-[256.11px]" />
                          <div className="absolute h-[273.447px] left-[12.5px] rounded-[10px] top-[13.77px] w-[230.893px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Scrolling Down */}
                <div className="w-[256px] shrink-0">
                  <div className="animate-scroll-down flex flex-col">
                    {/* Cards duplicated for seamless scrolling */}
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex}>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[272.127px] left-[13px] rounded-[13px] top-[14px] w-[231.187px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">
                              <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="229px" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Brands */}
        <div className="bg-[#f5f5f5] rounded-[20px] py-7 px-4 sm:px-14 overflow-hidden">
          <p className="font-medium text-[12px] tracking-[-0.24px] text-[rgba(0,0,0,0.5)] mb-4">Trusted by Leading Brands</p>
          <div className="relative w-full overflow-hidden">
            <div className="animate-scroll-left flex items-center gap-8 sm:gap-13 whitespace-nowrap">
              {/* Original Set */}
              <Image src="/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/2745adfddd032591a885cd1b9e93be75770a2008.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />

              {/* Duplicate Set for Seamless Loop */}
              <Image src="/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/2745adfddd032591a885cd1b9e93be75770a2008.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png" alt="" width={180} height={45} loading="lazy" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
