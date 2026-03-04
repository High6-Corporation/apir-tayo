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
    title: "Purchase the Plan",
    description: "Choose your plan and get instant access to start the process.",
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
        {/* Section Header */}
        <div ref={headerRef} className={`flex flex-col items-center text-center mb-8 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
          <div className="flex items-center gap-1 mb-2">
            <div className="h-0 w-14 border-t border-[#5757ff]" />
            {/* <Settings className="size-6 text-[#5757ff]" /> */}
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
