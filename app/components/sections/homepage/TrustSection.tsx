"use client";

import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import Link from "next/link";

export function TrustSection() {
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: imagesRef, isVisible: imagesVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      {/* Background Decorative Image */}
      <div className="absolute right-0 top-0 w-[633px] h-[633px] hidden xl:block rotate-180 opacity-5 pointer-events-none">
        <img src={'/assets/62829c3128504d8a41beac802c538dc7fd781b84.png'} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images Grid with Nested Containers */}
          <div ref={imagesRef} className={`w-full max-[1023px]:flex max-[1023px]:justify-center max-[1023px] scroll-animate-left ${imagesVisible ? 'scroll-animate-visible' : ''}`}>
            <div className="flex flex-col gap-4 max-[1023px]:w-full max-[1023px]:max-w-[463px]">
              {/* 1st Container: Top row with 2 images (1 large, 1 small) */}
              <div className="flex gap-4 items-end max-[1023px]:items-center">
                {/* Large Square - 325x325px */}
                <div className="w-[325px] h-[325px] max-[1023px]:w-[calc(50%-8px)] max-[1023px]:h-auto max-[1023px]:aspect-square rounded-[6px] overflow-hidden shadow-lg">
                  <img src={'/assets/team-image1.png'} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Small Square - 230x230px */}
                <div className="w-[230px] h-[230px] max-[1023px]:w-[calc(50%-8px)] max-[1023px]:h-auto max-[1023px]:aspect-square rounded-[6px] overflow-hidden shadow-lg">
                  <img src={'/assets/team-image2.png'} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              
              {/* 2nd Container: Bottom row with rectangle - 463x230px */}
              <div className="w-full flex justify-start max-[1023px]:justify-center">
                <div className="w-[463px] h-[230px] max-[1023px]:w-full max-[1023px]:h-auto max-[1023px]:aspect-[463/230] rounded-[6px] overflow-hidden shadow-lg">
                  <img src={'/assets/team-image3.png'} alt="" className="w-full h-full object-cover" />
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
