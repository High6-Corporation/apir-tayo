'use client';

import Link from 'next/link';
import { Navigation } from '@/app/components/navigation/Navigation';
import { Footer } from '@/app/components/sections/homepage/Footer';

export default function ThankYouPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      {/* Main Content */}
      <main className="relative pt-[100px]">
        {/* Background Decorative Image */}
        <div className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none">
          <img 
            src="/assets/62829c3128504d8a41beac802c538dc7fd781b84.png" 
            alt="" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Thank You Content */}
        <div className="relative flex flex-col items-center justify-center min-h-[564px] px-4">
          <div className="flex flex-col items-center gap-[30px]">
            {/* Checkmark Icon */}
            <div className="size-[80px]">
              <img 
                src="/assets/checkmark-icon.svg" 
                alt="Success" 
                className="w-full h-full"
              />
            </div>

            {/* Title */}
            <h1 className="font-semibold text-[55px] leading-[77px] tracking-[-1.1px] text-[#333] text-center">
              Thank You!
            </h1>

            {/* Message */}
            <p className="font-normal text-[15px] leading-[27px] tracking-[-0.3px] text-[#333] text-center">
              We appreciate your interest.<br />
              Our team will be in contact with you soon.
            </p>

            {/* Back to Homepage Button */}
            <Link
              href="/"
              className="bg-[#5757ff] hover:bg-[#24247d] flex gap-[10px] items-center justify-center px-[24px] py-[14px] rounded-[100px] text-white font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-colors duration-300 mt-[10px]"
            >
              Back to Homepage
              <div className="grid place-items-center relative">
                <div className="bg-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.2)] rounded-full size-[30px]" />
                <svg
                  className="absolute size-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
