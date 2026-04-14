"use client";

import Image from "next/image";

export function PortfolioGallery() {
  return (
    <div className="relative w-[532px] h-[520px] overflow-hidden shrink-0">
      {/* Right Column - Scrolling Down */}
      <div className="absolute left-[276px] top-0">
        <div className="animate-scroll-down flex flex-col">
          {/* Duplicate Set FIRST (for downward scroll to loop seamlessly) */}
          {/* Card 1 - mjl.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272.127px] left-[13px] rounded-[13px] top-[14px] w-[231.187px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">
                <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - adhaven.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - tipping-point.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - soding-bros.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="229px" />
              </div>
            </div>
          </div>

          {/* Original Set */}
          {/* Card 1 - mjl.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272.127px] left-[13px] rounded-[13px] top-[14px] w-[231.187px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">
                <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - adhaven.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.18px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - tipping-point.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[271.868px] left-[12.5px] rounded-[10px] top-[14.19px] w-[230.891px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - soding-bros.png */}
          <div className="relative">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.025px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.108px]" />
            <div className="absolute h-[272px] left-[13.5px] rounded-[10px] top-[14px] w-[229px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="229px" />
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
                <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - tipping-point-ph.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - adhaven.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - mjl.png */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="230px" />
              </div>
            </div>
          </div>

          {/* Duplicate Set for Seamless Loop */}
          {/* Card 1 - soding-bros.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.07)] w-[256.11px]" />
            <div className="absolute h-[273.447px] left-[12.5px] rounded-[10px] top-[13.77px] w-[230.893px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/soding-bros.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 2 - tipping-point-ph.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[269.078px] left-[13px] rounded-[10px] top-[16.21px] w-[230.175px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/tipping-point-ph.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 3 - adhaven.png (Duplicate) */}
          <div className="relative mb-[23px]">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[271.871px] left-[12.25px] rounded-[10px] top-[14.18px] w-[231.681px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/adhaven.png" fill loading="lazy" className="object-cover object-top" sizes="231px" />
              </div>
            </div>
          </div>

          {/* Card 4 - mjl.png (Duplicate) */}
          <div className="relative">
            <div className="bg-[rgba(255,255,255,0.17)] h-[301.028px] rounded-[20px] shadow-[0px_4px_45px_0px_rgba(0,0,0,0.17)] w-[256.11px]" />
            <div className="absolute h-[272px] left-[13px] rounded-[10px] top-[14px] w-[230px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                <Image alt="" src="/assets/mjl.png" fill loading="lazy" className="object-cover object-top" sizes="230px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}