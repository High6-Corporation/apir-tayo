"use client";

import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-16">
        <h1 className="font-semibold text-[32px] md:text-[40px] lg:text-[55px] leading-[1.2] text-center mb-8 lg:mb-16">Contact Us</h1>
        
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Left - Info */}
          <div className="w-full lg:w-[562px] text-center lg:text-left">
            <h2 className="font-semibold text-[24px] md:text-[30px] mb-4">Get in Touch!</h2>
            <p className="font-medium text-[15px] mb-8 text-[#333]">
              Whether you have a product inquiry, need customer support, or want to explore partnership opportunities.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#"><img src="/assets/Facebook.svg" className="size-6" /></a>
              <a href="#"><img src="/assets/Instagram.svg" className="size-6" /></a>
              <a href="#"><img src="/assets/X.svg" className="size-6" /></a>
              <a href="#"><img src="/assets/LinkedIn.svg" className="size-6" /></a>
            </div>
          </div>

          {/* Right - GraphQL Form */}
          <div className="w-full lg:w-[630px] max-w-[630px] m-auto bg-white rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] p-[20px] md:p-[30px] overflow-hidden">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
