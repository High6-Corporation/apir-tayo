"use client";

import { useState, useEffect } from "react";
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = ["Why One Page", "Pricing", "How It Works", "Portfolio", "Testimonials", "FAQs"];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="h-11 w-[174px] shrink-0 cursor-pointer">
            <img src={'/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png'} alt="Logo" className="h-full w-full object-cover" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden min-[1180px]:flex items-center gap-10 px-8 py-4 rounded-full font-semibold text-[#333] text-[16px] tracking-[-0.32px]">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#5757ff] transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a href="/contact" className="hidden min-[1180px]:flex bg-[#5757ff] items-center justify-center px-[18px] py-3.5 rounded-full text-white font-semibold text-[14px] tracking-[-0.28px] hover:bg-[#24247d] transition-colors duration-300">
            Contact Us
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="max-[1179px]:block min-[1180px]:hidden p-2 text-[#333] relative w-10 h-10 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 flex flex-col gap-[6px]">
              <span 
                className={`block h-[2.5px] w-full bg-[#333] rounded-sm transition-all duration-300 ease-in-out origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[8.5px]' : 'rotate-0 translate-y-0'
                }`}
              />
              <span 
                className={`block h-[2.5px] w-full bg-[#333] rounded-sm transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span 
                className={`block h-[2.5px] w-full bg-[#333] rounded-sm transition-all duration-300 ease-in-out origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[8.5px]' : 'rotate-0 translate-y-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`min-[1180px]:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <nav className="pb-4 pt-4 px-6 flex flex-col gap-4 font-semibold text-[#333] bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.08)]">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-[#5757ff] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a href="/contact" className="bg-[#5757ff] hover:bg-[#24247d] mt-2 w-full flex items-center justify-center px-[18px] py-3.5 rounded-full text-white font-semibold text-[14px] tracking-[-0.28px] transition-colors duration-300">
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
