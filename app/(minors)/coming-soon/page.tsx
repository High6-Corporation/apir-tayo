'use client';

import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Background Decorative Images */}
      <div
        className="absolute right-0 top-0 w-[633px] h-[633px] rotate-180 opacity-[0.04] pointer-events-none max-[1180px]:hidden"
        style={{
          backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute left-0 top-0 w-[633px] h-[633px] scale-y-[-1] opacity-[0.04] pointer-events-none max-[1180px]:hidden"
        style={{
          backgroundImage: 'url(/assets/62829c3128504d8a41beac802c538dc7fd781b84.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content - Centered */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-[60px] w-full max-w-[643px]">
          <div className="flex flex-col items-center gap-[30px] w-full">
            {/* Logo */}
            <div className="w-[200px] md:w-[300px] lg:w-[393px]">
              <img 
                src="/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png" 
                alt="Apir Tayo" 
                className="w-full h-auto"
              />
            </div>

            {/* Title */}
            <h1 className="font-semibold text-[40px] md:text-[55px] leading-[77px] tracking-[-1.1px] text-[#333] text-center">
              Coming Soon
            </h1>

            {/* Message */}
            <p className="font-medium text-[15px] leading-[27px] text-[#59646b] text-center max-w-[541px]">
              Coming soon. A smarter, faster, and more focused web experience—designed for clarity and results.
            </p>

            {/* Back to Homepage Button */}
            <Link
              href="/"
              className="bg-[#5757ff] hover:bg-[#24247d] flex gap-[10px] items-center justify-center px-[24px] py-[14px] rounded-[100px] text-white font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-colors duration-300"
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

          {/* Copyright */}
          <p className="font-medium text-[15px] text-[#59646b] tracking-[-0.3px]">
            © 2025 Apir Tayo
          </p>
        </div>
      </div>
    </div>
  );
}
