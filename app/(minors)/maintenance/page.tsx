'use client';

export default function MaintenancePage() {
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
              Under Maintenance
            </h1>

            {/* Message */}
            <p className="font-medium text-[15px] leading-[27px] text-[#59646b] text-center max-w-[541px]">
              We&apos;re currently performing scheduled maintenance to improve your experience.<br />
              Please check back shortly.
            </p>
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
