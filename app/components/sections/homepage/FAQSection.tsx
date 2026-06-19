"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { PrimaryButton } from "../../shared/Buttons";
import { ChevronDownIcon } from "../../shared/Icons";
import Link from "next/link";

interface FAQSectionProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: faqsRef, isVisible: faqsVisible } = useScrollAnimation();

  return (
    <section id="faqs" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
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
