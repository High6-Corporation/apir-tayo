'use client';

import Link from 'next/link';
import { Navigation } from '@/app/components/navigation/Navigation';
import { Footer } from '@/app/components/sections/homepage/Footer';

export default function NotFoundPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      <main className="relative pt-[100px]">
        {/* Background Decorative Image */}
        <div
          className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none max-[1180px]:hidden"
          style={{
            backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content - Two Column Layout */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-[60px] lg:gap-[200px] min-h-[564px] px-4 max-w-[1440px] mx-auto">
          {/* Left Column - Text */}
          <div className="flex flex-col gap-[30px] w-full lg:w-[432px] text-center lg:text-left">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <h1 className="font-semibold text-[40px] lg:text-[55px] leading-[77px] tracking-[-1.1px] text-[#333]">
                  Ooops...
                </h1>
                <h2 className="font-semibold text-[24px] lg:text-[30px] text-[#333]">
                  Page not found
                </h2>
              </div>
              <p className="font-normal text-[15px] leading-[27px] tracking-[-0.15px] text-[#333]">
                The page you are looking for doesn&apos;t exist or an other error occurred, go back to home page.
              </p>
            </div>

            {/* Back to Homepage Button */}
            <Link
              href="/"
              className="bg-[#5757ff] hover:bg-[#24247d] flex gap-[10px] items-center justify-center lg:justify-start px-[24px] py-[14px] rounded-[100px] text-white font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-colors duration-300 w-fit mx-auto lg:mx-0"
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

          {/* Right Column - 404 Number */}
          <div className="flex items-center justify-center">
            <span className="font-bold text-[150px] md:text-[200px] lg:text-[250px] leading-none text-[#333] tracking-[12.5px]">
              404
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
