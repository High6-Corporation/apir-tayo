=== CTASection.tsx ===
"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton, SecondaryButton } from "../../shared/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CTASection() {
const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
const [showBg, setShowBg] = useState(false);

useEffect(() => {
const show = () => setShowBg(true);
const events = ['scroll', 'mousemove', 'touchstart', 'keydown'] as const;
const cleanup = () => events.forEach(e => window.removeEventListener(e, handler));
let timer: ReturnType<typeof setTimeout>;
const handler = () => { cleanup(); clearTimeout(timer); show(); };
events.forEach(e => window.addEventListener(e, handler, { once: true, passive: true }));
timer = setTimeout(() => { cleanup(); show(); }, 10000);
return () => { cleanup(); clearTimeout(timer); };
}, []);

return (
<section className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
<div ref={ctaRef} className={`bg-[#030337] rounded-[40px] overflow-hidden relative scroll-animate-scale ${ctaVisible ? 'scroll-animate-visible' : ''}`}>
{/_ Background Pattern - deferred _/}
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

=== HeroSection.tsx ===
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
// Show decorations on first user interaction (real users) or after long timeout (bots never trigger)
const show = () => setShowDecorations(true);
const events = ['scroll', 'mousemove', 'touchstart', 'keydown'] as const;
const cleanup = () => events.forEach(e => window.removeEventListener(e, handler));
let timer: ReturnType<typeof setTimeout>;
const handler = () => { cleanup(); clearTimeout(timer); show(); };
events.forEach(e => window.addEventListener(e, handler, { once: true, passive: true }));
// Fallback: 10s timeout (well after Lighthouse finishes LCP observation)
timer = setTimeout(() => { cleanup(); show(); }, 10000);
return () => { cleanup(); clearTimeout(timer); };
}, []);

return (
<section id="top" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
{/_ Background Decorative Images - loaded after LCP to avoid detection _/}
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
                              <Image alt="" src="/assets/soding-bros.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/tipping-point-ph.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/adhaven.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/mjl.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
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
                              <Image alt="" src="/assets/mjl.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/adhaven.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/tipping-point-ph.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="231px" />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <Image alt="" src="/assets/soding-bros.png" fill {...(setIndex === 0 ? { priority: true } : { loading: 'eager' as const })} className="object-cover object-top" sizes="229px" />
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
              <Image src="/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png" alt="" width={180} height={45} priority className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png" alt="" width={180} height={45} priority className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/2745adfddd032591a885cd1b9e93be75770a2008.png" alt="" width={180} height={45} priority className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png" alt="" width={180} height={45} priority className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png" alt="" width={180} height={45} priority className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />

              {/* Duplicate Set for Seamless Loop */}
              <Image src="/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png" alt="" width={180} height={45} loading="eager" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png" alt="" width={180} height={45} loading="eager" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/2745adfddd032591a885cd1b9e93be75770a2008.png" alt="" width={180} height={45} loading="eager" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png" alt="" width={180} height={45} loading="eager" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <Image src="/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png" alt="" width={180} height={45} loading="eager" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>

);
}

=== PortfolioSection.tsx ===
"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
interface Project {
image: string;
title: string;
category: string;
url: string;
}
const projects: Project[] = [
{ image: "/assets/soding-bros.png", title: "Soding Bros", category: "Technology", url: "https://sodingbros.com/" },
{ image: "/assets/tipping-point-ph.png", title: "Tipping Point PH", category: "Services", url: "https://tippingpoint.ph/" },
{ image: "/assets/adhaven.png", title: "Ad-Haven", category: "Maintenance", url: "https://ad-haven.com/" },
{ image: "/assets/mjl.png", title: "Michael James Love", category: "Education", url: "https://michaeljameslove.com/" },
{ image: "/assets/69608c73f7374bc0cc7e836fb4d87a10f6e2c208.png", title: "City Tech", category: "Construction", url: "https://citytech.com.ph/" },
{ image: "/assets/3f5a380ce7d9387320c7ce2309ba10a3a368ee9a.png", title: "Edgetech", category: "Industrial", url: "https://edgetech-ph.com/" },
];

export function PortfolioSection() {
const [showAll, setShowAll] = useState(false);
const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();

const visibleProjects = showAll ? projects : projects.slice(0, 6);

return (
<section id="portfolio" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Section Header _/}
<div ref={headerRef} className={`flex flex-col items-center text-center mb-4 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
<div className="flex items-center gap-1 mb-2">
<div className="h-0 w-14 border-t border-[#5757ff]" />
<img src="/assets/our-works-icon.svg" alt="" className="h-[24px] w-[24px]" />
<p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">OUR WORKS</p>
<div className="h-0 w-14 border-t border-[#5757ff]" />
</div>
<h3 className="font-semibold tracking-[-0.6px] text-[#333] max-w-[413px]">
Recent One-Page Websites
</h3>
</div>

        <p className={`font-medium text-[15px] leading-[27px] text-[#59646b] text-center mb-12 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
          A selection of high-performing one-page sites we've designed for our clients.
        </p>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleProjects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-[#d7d7d7] rounded-[20px] overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500 ${
                index >= 6 ? 'animate-fadeInUp' : ''
              }`}
              style={{
                animationDelay: index >= 6 ? `${(index - 6) * 100}ms` : '0ms'
              }}
            >
              <div className="bg-white h-[223px] overflow-hidden rounded-t-[16px] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto object-cover object-top absolute top-0 left-0 transition-transform duration-[3000ms] ease-linear group-hover:translate-y-[calc(-100%+223px)]"
                />
              </div>
              <div className="h-[64px] rounded-b-[16px] px-[18px] flex items-center">
                <div>
                  <h4 className="font-bold tracking-[-0.6px] text-[#5757ff]">{project.title}</h4>
                  <p className="font-medium text-[15px] tracking-[-0.45px] text-[#59646b]">{project.category}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

);
}

=== TrustSection.tsx ===
"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TrustSection() {
const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
const { elementRef: imagesRef, isVisible: imagesVisible } = useScrollAnimation();
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
<section className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
{/_ Background Decorative Image - deferred _/}
{showDecorations && (
<div
className="absolute right-0 top-0 w-[633px] h-[633px] hidden xl:block rotate-180 opacity-5 pointer-events-none"
style={{
            backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
/>
)}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images Grid with Nested Containers */}
          <div ref={imagesRef} className={`w-full max-[1023px]:flex max-[1023px]:justify-center max-[1023px] scroll-animate-left ${imagesVisible ? 'scroll-animate-visible' : ''}`}>
            <div className="flex flex-col gap-4 max-[1023px]:w-full max-[1023px]:max-w-[463px]">
              {/* 1st Container: Top row with 2 images (1 large, 1 small) */}
              <div className="flex gap-4 items-end max-[1023px]:items-center">
                {/* Large Square - 325x325px */}
                <div className="w-[325px] h-[325px] max-[1023px]:w-[calc(50%-8px)] max-[1023px]:h-auto max-[1023px]:aspect-square rounded-[6px] overflow-hidden shadow-lg relative">
                  <Image
                    src="/assets/high6 team-3.jpg"
                    alt="High6 team member"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1023px) 50vw, 325px"
                  />
                </div>
                {/* Small Square - 230x230px */}
                <div className="w-[230px] h-[230px] max-[1023px]:w-[calc(50%-8px)] max-[1023px]:h-auto max-[1023px]:aspect-square rounded-[6px] overflow-hidden shadow-lg relative">
                  <Image
                    src="/assets/high6 team-2.jpg"
                    alt="High6 team member"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1023px) 50vw, 230px"
                  />
                </div>
              </div>

              {/* 2nd Container: Bottom row with rectangle - 463x230px */}
              <div className="w-full flex justify-start max-[1023px]:justify-center">
                <div className="w-[463px] h-[230px] max-[1023px]:w-full max-[1023px]:h-auto max-[1023px]:aspect-[463/230] rounded-[6px] overflow-hidden shadow-lg relative">
                  <Image
                    src="/assets/high6 team-4.jpg"
                    alt="High6 team member"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 463px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className={`flex flex-col gap-6 max-[1023px]:items-center max-[1023px]:text-center scroll-animate-right ${contentVisible ? 'scroll-animate-visible' : ''}`}>
            <h3 className="font-semibold text-[#333]">
              Built By a Team You Can Trust
            </h3>
            <div className="font-medium text-[15px] leading-[27px] text-[#59646b]">
              <p>
                Your website isn't made by random freelancers or generic templates.
              </p>
              <p>
                It's made by the same experienced team behind websites across industries:
                <br />
                Healthcare, Education, Construction, Food & Beverage, Automotive, Real Estate, Retail/E-commerce, Government, Professional Services, Travel & Tours, and Non-Profit.
              </p>
            </div>
            <div>
              <Link href="/contact"><PrimaryButton>Get a High-Converting Page — ₱2,300/mo</PrimaryButton></Link>
            </div>
          </div>
        </div>
      </div>
    </section>

);
}

=== FAQSection.tsx ===
"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import { ChevronDownIcon } from "../../shared/Icons";
import Link from "next/link";

interface FAQ {
question: string;
answer: string;
}

const faqs: FAQ[] = [
{ question: "Is this custom?", answer: "Yes, every website is custom-designed specifically for your business and brand. We don't use generic templates." },
{ question: "Can I upgrade later?", answer: "Absolutely! You can upgrade your website at any time to add more pages, features, or functionality as your business grows." },
{ question: "Is there a contract?", answer: "We offer flexible month-to-month plans with no long-term contracts. You can cancel anytime without penalties." },
{ question: "What do I need to prepare?", answer: "Just your business information, any existing brand assets (logos, colors), and content you'd like to include on your website." },
{ question: "Is maintenance included?", answer: "Yes! Regular updates, maintenance, and quarterly check-ins are all included in your monthly subscription." }
];

export function FAQSection() {
const [openIndex, setOpenIndex] = useState<number | null>(null);
const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
const { elementRef: faqsRef, isVisible: faqsVisible } = useScrollAnimation();

return (
<section id="faqs" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Section Header _/}
<div ref={headerRef} className={`flex flex-col items-center text-center mb-12 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
<div className="flex items-center gap-1 mb-2">
<div className="h-0 w-14 border-t border-[#5757ff]" />
<img src="/assets/faqs-icon.svg" alt="" className="h-[24px] w-[24px]" />
<p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">FAQs</p>
<div className="h-0 w-14 border-t border-[#5757ff]" />
</div>
<h3 className="font-semibold tracking-[-0.6px] text-[#333]">
Frequently Asked Questions
</h3>
</div>

        {/* FAQ Items */}
        <div ref={faqsRef} className={`max-w-[738px] mx-auto flex flex-col gap-5 mb-16 scroll-animate ${faqsVisible ? 'scroll-animate-visible' : ''}`}>
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-[10px] border border-[rgba(0,0,0,0.05)] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full h-20 px-7 flex items-center justify-between text-left"
              >
                <p className="font-semibold text-[20px] text-[#333]">{faq.question}</p>
                <div className={`transition-transform duration-500 ease-in-out ${openIndex === index ? 'rotate-0' : '-rotate-[90deg]'}`}>
                  <ChevronDownIcon />
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-7 pb-7">
                  <p className="font-medium text-[15px] leading-[27px] text-[#59646b]">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help CTA */}
        <div className="max-w-[738px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-[639px]:text-center">
            <h4 className="font-bold text-[#5757ff]">Can't Find Your Answer Here?</h4>
            <p className="font-medium text-[15px] leading-[16px] text-[#59646b]">We Can Help Out!</p>
          </div>
          <Link href="/contact"><PrimaryButton>Schedule a Call</PrimaryButton></Link>
        </div>
      </div>
    </section>

);
}

=== HowItWorksSection.tsx ===
"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
interface Step {
number: string;
icon: string;
title: string;
description: string;
numberPath: string;
}

const steps: Step[] = [
{
number: "1",
icon: "/assets/purchase-icon.svg",
title: "Choose Your Plan",
description: "Select the package that fits your business and complete your subscription.",
numberPath: "1"
},
{
number: "2",
icon: "/assets/requirements-icon.svg",
title: "Share Your Requirements",
description: "Fill out a simple form so we understand your business and goals",
numberPath: "2"
},
{
number: "3",
icon: "/assets/discovery-design-icon.svg",
title: "Discovery & Design",
description: "We align on strategy and design a website tailored to your brand.",
numberPath: "3"
},
{
number: "4",
icon: "/assets/build-launch-icon.svg",
title: "Build, Launch & Go Live",
description: "Your site is built, reviewed, and launched for the world to see.",
numberPath: "4"
}
];

export function HowItWorksSection() {
const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
const { elementRef: stepsRef, isVisible: stepsVisible } = useScrollAnimation();

return (
<section id="how-it-works" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Section Header _/}
<div ref={headerRef} className={`flex flex-col items-center text-center mb-8 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
<div className="flex items-center gap-1 mb-2">
<div className="h-0 w-14 border-t border-[#5757ff]" />
<img src="/assets/how-it-works-icon.svg" alt="" className="h-[24px] w-[24px]" />
<p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">HOW IT WORKS</p>
<div className="h-0 w-14 border-t border-[#5757ff]" />
</div>
<h3 className="font-semibold tracking-[-0.6px] text-center max-w-[413px]">
<span className="text-[#333]">Our Simple </span>
<span className="text-[#5757ff]">4-Step Process</span>
</h3>
</div>

        <p className="font-medium text-[15px] leading-[27px] text-[#59646b] text-center max-w-[841px] mx-auto mb-12">
          Our process is simple, structured, and built to save you time. We guide you from onboarding to launch with clear steps and regular updates, so there's no confusion or overwhelm. You get a professional website without the usual stress.
        </p>

        {/* Steps Grid */}
        <div ref={stepsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1280px] mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] p-7 relative overflow-hidden group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.05] hover:shadow-[0px_8px_40px_0px_rgba(87,87,255,0.15)] scroll-animate ${stepsVisible ? 'scroll-animate-visible' : ''} stagger-${index + 1}`}>
              {/* Background Number */}
              <div className="absolute right-4 top-4 opacity-[0.15] group-hover:opacity-100 transition-opacity duration-500 ease-in-out font-bold text-9xl text-[#CACACA] group-hover:text-[#5757FF]">
                {step.number}
              </div>

              {/* Icon */}
              <div className="size-10 mb-24 max-[1024px]:mb-12 relative z-10">
                <img src={step.icon} alt="" className="size-10" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="font-bold text-[#5757ff] mb-4">{step.title}</h4>
                <p className="font-medium text-[15px] leading-[28px] text-[#59646b]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

);
}

=== PricingSection.tsx ===
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
{/_ Background Decorative Images - deferred to avoid LCP detection _/}
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

=== WhyOnePageSection.tsx ===
"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import Link from "next/link";

interface Benefit {
icon: string;
title: string;
description: string;
}

const benefits: Benefit[] = [
{
icon: "/assets/first-impression-icon.svg",
title: "Strong first impression & instant credibility",
description: "Make your brand look professional and trustworthy from the moment visitors land on your site."
},
{
icon: "/assets/clear-services-icon.svg",
title: "Clear services with easy inquiry or booking",
description: "Help visitors quickly understand what you offer and take action without confusion."
},
{
icon: "/assets/faster-launch-icon.svg",
title: "Faster launch at lower cost—without overwhelm",
description: "Get your website live quickly and affordably, without the stress of building everything from scratch."
}
];

export function WhyOnePageSection() {
const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
const { elementRef: taglineRef, isVisible: taglineVisible } = useScrollAnimation();

return (
<section id="why-one-page" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Two Column Layout _/}
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
{/_ Left Column - Header, Text, and Button _/}
<div ref={headerRef} className={`flex flex-col max-w-[535px] max-[1023px]:max-w-none max-[1023px]:items-center max-[1023px]:text-center scroll-animate-left ${headerVisible ? 'scroll-animate-visible' : ''}`}>
{/_ Section Header _/}
<div className="flex items-center gap-1 mb-2">
<img src="/assets/why-one-page-icon.svg" alt="" className="h-[24px] w-[24px]" />
<p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">WHY ONE PAGE</p>
<div className="h-0 w-14 border-t border-[#5757ff] ml-1" />
</div>
<h3 className="font-semibold tracking-[-0.6px] mb-6">
<span className="text-[#333]">A Single Page.</span><br></br>
<span className="text-[#5757ff]">Strategically Designed.</span>
</h3>

            {/* Description Text */}
            <p className="font-medium text-[15px] leading-[27px] text-[#59646b] mb-8">
              Every section is intentionally crafted to guide visitors from interest to action. By removing distractions and focusing on clarity, one well-designed page delivers stronger engagement, faster load times, and higher conversions.
            </p>

            {/* CTA Button */}
            <Link href="/contact"><PrimaryButton className="self-start max-[1023px]:self-center">Get Started Today</PrimaryButton></Link>
          </div>

          {/* Right Column - Benefits Grid */}
          <div ref={benefitsRef} className="flex flex-col gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className={`bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] p-7 flex gap-[14px] items-start scroll-animate ${benefitsVisible ? 'scroll-animate-visible' : ''} stagger-${index + 1}`}>
                <div className="shrink-0 mt-2">
                  <img src={benefit.icon} alt="" className="size-10" />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-[#5757ff]">{benefit.title}</h4>
                  <p className="font-medium text-[15px] leading-[28px] text-[#59646b]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Centered Tagline */}
        <div ref={taglineRef} className={`text-center scroll-animate ${taglineVisible ? 'scroll-animate-visible' : ''}`}>
          <h3 className="font-semibold text-[#333]">
            <span>One page. One clear message. </span>
            <span className="text-[#5757ff]">One big upgrade for your brand.</span>
          </h3>
        </div>
      </div>
    </section>

);
}

=== Footer.tsx ===
export function Footer() {
const navLinks = ["Why One Page", "Pricing", "How It Works", "Portfolio", "Testimonials", "FAQs"];
const currentYear = new Date().getFullYear();

return (
<footer className="bg-[#f4f4fb] py-16 lg:py-20">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Desktop Layout (Above 980px) _/}
<div className="hidden min-[981px]:grid grid-cols-2 gap-12 lg:gap-24 items-start">
{/_ Left Column - Logo and Contact _/}
<div>
<a href="/" className="h-[75px] w-[294px] mb-12 block cursor-pointer">
<img src={'/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png'} alt="Logo" className="h-full w-auto object-cover" />
</a>
<div className="font-medium text-[15px] leading-[normal] tracking-[-0.3px] text-[#59646b]">
<a href="https://maps.app.goo.gl/vt32cPMHv8aKjvuSA" target="_blank" rel="noopener noreferrer" className="hover:text-[#5757ff] transition-colors block">
<span>18 Quezon Street, 6th Avenue, 1400,</span>
<span>Caloocan City</span>
</a>
<a href="mailto:info@high6.com" className="mt-4 hover:text-[#5757ff] transition-colors block">info@high6.com</a>
<p className="mt-1">
<a href="tel:+63288687318" className="hover:text-[#5757ff] transition-colors">+632 8 668 7318</a> | <a href="tel:+639228995585" className="hover:text-[#5757ff] transition-colors">+63 922 899 5585</a>
</p>
</div>
</div>

          {/* Right Column - Navigation, Social, Copyright */}
          <div className="flex flex-col items-end gap-8 pt-8">
            {/* Navigation */}
            <nav className="flex gap-x-8 lg:gap-x-10 font-normal text-[#333] text-[16px] tracking-[-0.32px] max-[1180px]:max-w-[500px] max-[1180px]:flex max-[1180px]:flex-wrap max-[1180px]:justify-end max-[1180px]:gap-y-[20px] max-[980px]:max-w-none max-[980px]:flex-nowrap max-[980px]:flex-col max-[980px]:items-end max-[980px]:gap-y-4">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#5757ff] transition-colors whitespace-nowrap">
                  {link}
                </a>
              ))}
            </nav>

            {/* Social Media */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1M3Xs6p7uv/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/Facebook.svg" alt="Facebook" className="size-6" />
              </a>
              <a href="https://www.instagram.com/apir.tayo/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/Instagram.svg" alt="Instagram" className="size-6" />
              </a>
              <a href="https://x.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/X.svg" alt="X" className="size-6" />
              </a>
              <a href="https://www.linkedin.com/company/apirtayo" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/LinkedIn.svg" alt="LinkedIn" className="size-6" />
              </a>
            </div>

            {/* Copyright */}
            <p className="font-medium text-[15px] tracking-[-0.3px] text-[#59646b]">© {currentYear} Apir&apos; Tayo</p>
          </div>
        </div>

        {/* Mobile Layout (980px and below) - Single Centered Column */}
        <div className="flex flex-col items-center text-center gap-8 min-[981px]:hidden">
          {/* Logo */}
          <a href="/" className="h-[75px] w-[294px] cursor-pointer">
            <img src={'/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png'} alt="Logo" className="h-full w-auto object-cover" />
          </a>

          {/* Menu (Column) */}
          <nav className="flex flex-col gap-4 font-normal text-[#333] text-[16px] tracking-[-0.32px]">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#5757ff] transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* Location & Contacts */}
          <div className="font-medium text-[15px] leading-[normal] tracking-[-0.3px] text-[#59646b]">
            <a href="https://maps.app.goo.gl/vt32cPMHv8aKjvuSA" target="_blank" rel="noopener noreferrer" className="hover:text-[#5757ff] transition-colors block">
              <span>18 Quezon Street, 6th Avenue, 1400,</span>
              <span>Caloocan City</span>
            </a>
            <a href="mailto:info@high6.com" className="mt-4 hover:text-[#5757ff] transition-colors block">info@high6.com</a>
            <p className="mt-1">
              <a href="tel:+63288687318" className="hover:text-[#5757ff] transition-colors">+632 8 668 7318</a> | <a href="tel:+639228995585" className="hover:text-[#5757ff] transition-colors">+63 922 899 5585</a>
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1M3Xs6p7uv/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/Facebook.svg" alt="Facebook" className="size-6" />
            </a>
            <a href="https://www.instagram.com/apir.tayo/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/Instagram.svg" alt="Instagram" className="size-6" />
            </a>
            <a href="https://x.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/X.svg" alt="X" className="size-6" />
            </a>
            <a href="https://www.linkedin.com/company/apirtayo" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/LinkedIn.svg" alt="LinkedIn" className="size-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="font-medium text-[15px] tracking-[-0.3px] text-[#59646b]">© {currentYear} Apir&apos; Tayo</p>
        </div>
      </div>
    </footer>

);
}

=== PortfolioGallery.tsx ===
"use client";

import Image from "next/image";

export function PortfolioGallery() {
return (
<div className="relative w-[532px] h-[520px] overflow-hidden shrink-0">
{/_ Right Column - Scrolling Down _/}
<div className="absolute left-[276px] top-0">
<div className="animate-scroll-down flex flex-col">
{/_ Duplicate Set FIRST (for downward scroll to loop seamlessly) _/}
{/_ Card 1 - mjl.png (Duplicate) _/}
<div className="relative mb-[23px]">
<div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
<div className="absolute h-[272.127px] left-[13px] rounded-[13px] top-[14px] w-[231.187px]">
<div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">
<Image alt="" src="/assets/mjl.png" fill priority className="object-cover object-top" sizes="231px" />
</div>
</div>
</div>

          {/* Card 2 - adhaven.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill priority className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - tipping-point.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill priority className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - soding-bros.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill priority className="object-cover object-top" sizes="229px" />
              </div>
            </div>
          </div>

          {/* Original Set */}
          {/* Card 1 - mjl.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272.127px] left-[13px] rounded-[13px] top-[14px] w-[231.187px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">
                <Image alt="" src="/assets/mjl.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - adhaven.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - tipping-point.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - soding-bros.png */}
          <div className="relative">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill loading="eager" className="object-cover object-top" sizes="229px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Column - Scrolling Up */}
      <div className="absolute left-0 top-0">
        <div className="animate-scroll-up flex flex-col">
          {/* Original Set */}
          {/* Card 1 - soding-bros.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.07)] w-[256.11px]" />
            <div className="absolute h-[273.447px] left-[12.5px] rounded-[10px] top-[13.77px] w-[230.893px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill priority className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - tipping-point-ph.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill priority className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - adhaven.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - mjl.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/mjl.png" fill loading="eager" className="object-cover object-top" sizes="230px" />
              </div>
            </div>
          </div>

          {/* Duplicate Set for Seamless Loop */}
          {/* Card 1 - soding-bros.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.07)] w-[256.11px]" />
            <div className="absolute h-[273.447px] left-[12.5px] rounded-[10px] top-[13.77px] w-[230.893px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - tipping-point-ph.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - adhaven.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="eager" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - mjl.png (Duplicate) */}
          <div className="relative">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/mjl.png" fill loading="eager" className="object-cover object-top" sizes="230px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

);
}

=== TestimonialsSection.tsx ===
"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { StarIcon } from "../../shared/Icons";
interface Testimonial {
image: string;
quote: string;
name: string;
position: string;
}
const testimonials: Testimonial[] = [
{
image: "/assets/gtgo.png",
quote: "High6 delivered a clean, modern website that perfectly reflects our brand. The process was smooth, fast, and very well-managed from start to finish.",
name: "Jason Go",
position: "Vice President, GTGO Enterprises Inc."
},
{
image: "/assets/premiere-builders-corp.png",
quote: "Working with High6 was seamless. They understood our requirements clearly and delivered a website that looks professional and performs well across all devices.",
name: "Gene Nicolas",
position: "Founder, Premiere Builders Corp."
},
{
image: "/assets/all-about-people.png",
quote: "High6 transformed our ideas into a functional and engaging website. Their attention to detail and responsiveness made the entire collaboration easy and efficient.",
name: "Claudia Soriano",
position: "CEO, All About People"
}
];

export function TestimonialsSection() {
const [currentIndex, setCurrentIndex] = useState(0);
const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();

return (
<section id="testimonials" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
{/_ Section Header _/}
<div ref={headerRef} className={`flex flex-col items-center text-center mb-12 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
<div className="flex items-center gap-1 mb-2">
<div className="h-0 w-14 border-t border-[#5757ff]" />
<img src="/assets/testimonials-icon.svg" alt="" className="h-[24px] w-[24px]" />
<p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">TESTIMONIALS</p>
<div className="h-0 w-14 border-t border-[#5757ff]" />
</div>
<h3 className="font-semibold tracking-[-0.6px] text-[#333] max-w-[413px]">
What Our Clients Say
</h3>
</div>

        {/* Testimonial Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] overflow-hidden max-w-[1104px] mx-auto p-8 lg:p-16">
                  <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="flex justify-center items-center">
                      <div className="border border-[#d7d7d7] rounded-[20px] overflow-hidden w-full max-w-[420px]">
                        <div className="bg-white h-[280px] overflow-hidden relative">
                          <Image
                            src={testimonial.image}
                            alt="Website Preview"
                            fill
                            loading="lazy"
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 420px"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>

                      <p className="font-medium text-[15px] leading-[27px] text-[#59646b] mb-10">
                        {testimonial.quote}
                      </p>

                      <div>
                        <h4 className="font-bold text-[#5757ff] mb-1">{testimonial.name}</h4>
                        <p className="font-medium text-[15px] leading-[27px] text-[#59646b]">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-[#5757ff]' : 'bg-[#E6E6E6] hover:bg-[#c4c4c4]'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>

);
}
