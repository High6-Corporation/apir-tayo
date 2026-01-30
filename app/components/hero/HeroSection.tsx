"use client";

import { PortfolioGallery } from "../PortfolioGallery";
import { PrimaryButton } from "../shared/Buttons";
import { Timer } from "lucide-react";
export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      {/* Background Decorative Images */}
      <div className="absolute left-0 top-0 w-[633px] h-[633px] scale-y-[-100%] opacity-[0.04] pointer-events-none max-[1180px]:hidden">
        <img src={'/assets/62829c3128504d8a41beac802c538dc7fd781b84.png'} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none">
        <img src={'/assets/62829c3128504d8a41beac802c538dc7fd781b84.png'} alt="" className="w-full h-full object-cover" />
      </div>

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
                  <span>Limited Slots This Month — One-Page Websites from </span>
                  <span className="font-bold text-[#5757ff]">₱2,300/mo</span>
                </p>
              </div>

              {/* Heading */}
              <h1 className="max-[981px]:max-w-[550px] font-semibold tracking-[-1.1px] mb-6">
                <span className="text-[#333]">High-Converting Websites </span>
                <span className="text-[#5757ff]">Designed to Launch Fast.</span>
              </h1>

              {/* Description */}
              <p className="font-medium text-[15px] leading-[30px] tracking-[-0.3px] text-[#333] mb-8">
                We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.
              </p>

              {/* CTA Button */}
              <PrimaryButton className="z-10">Get a High-Converting Page — ₱2,300/mo</PrimaryButton>
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
                    <span>Limited Slots This Month — One-Page Websites from </span>
                    <span className="font-bold text-[#5757ff]">₱2,300/mo</span>
                  </p>
                </div>

                {/* Heading */}
                <h1 className="font-semibold tracking-[-1.1px] mb-6 text-[#333]">
                  <span className="text-[#333]">High-Converting Websites </span>
                  <span className="text-[#5757ff]">Designed to Launch Fast.</span>
                </h1>

                {/* Description */}
                <p className="font-medium text-[15px] leading-[30px] tracking-[-0.3px] text-[#333] mb-8">
                  We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.
                </p>

              {/* CTA Button */}
              <PrimaryButton>Get a High-Converting Page — ₱2,300/mo</PrimaryButton>
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
                              <img alt="" className="absolute h-[232.59%] left-0 max-w-none top-[-0.16%] w-full" src={'/assets/0cef748d57db4ca3d4a1caf58d6d0d6883e42935.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[292.17%] left-[-12.79%] max-w-none top-0 w-[125.58%]" src={'/assets/150aee7dc711fbee45988b7415fae64a38abea02.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[263.83%] left-0 max-w-none top-[-0.18%] w-full" src={'/assets/c09bce6ed0251c17ec6cc173331395d91b242d4a.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
                          <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[284.93%] left-[-0.02%] max-w-none top-0 w-[100.03%]" src={'/assets/700c98198e7af7cb1dd20e06205d51fc88aed9dd.png'} />
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
                              <img alt="" className="absolute h-[224.27%] left-[-0.07%] max-w-none top-[-0.03%] w-full" src={'/assets/937ee292ad98d410120c4a2ffce3528aec7fe5c5.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[207.83%] left-[-0.1%] max-w-none top-0 w-[100.19%]" src={'/assets/3f5a380ce7d9387320c7ce2309ba10a3a368ee9a.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[228.7%] left-[-0.06%] max-w-none top-0 w-[100.13%]" src={'/assets/1b9fc4abfa19b607bd7ecbd8cdaf9def5b7c2a8c.png'} />
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-[23px]">
                          <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
                          <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                              <img alt="" className="absolute h-[102.57%] left-[-0.07%] max-w-none top-0 w-[100.15%]" src={'/assets/dadb5498f0e11be6e776b80311e2c82a3e141381.png'} />
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
              <img src={'/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/2745adfddd032591a885cd1b9e93be75770a2008.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              
              {/* Duplicate Set for Seamless Loop */}
              <img src={'/assets/2a5273e5aed69ad3d4df4c829002d030fb6dd0f9.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/9082ff0bf260fb00c1181da0dee181c62313fe63.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/2745adfddd032591a885cd1b9e93be75770a2008.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/8acca7c83c2f4babcf44ec6af2dd1d14daf913ca.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
              <img src={'/assets/7b411cb32f491fb308a26e8a3230d10a43f4a8a0.png'} alt="" className="h-[45px] w-auto inline-block saturate-0 hover:saturate-100 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
