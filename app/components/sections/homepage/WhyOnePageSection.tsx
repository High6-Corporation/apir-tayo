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
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left Column - Header, Text, and Button */}
          <div ref={headerRef} className={`flex flex-col max-w-[535px] max-[1023px]:max-w-none max-[1023px]:items-center max-[1023px]:text-center scroll-animate-left ${headerVisible ? 'scroll-animate-visible' : ''}`}>
            {/* Section Header */}
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
