"use client";

export function Footer() {
  const navLinks = ["Why One Page", "Pricing", "How It Works", "Portfolio", "Testimonials", "FAQs"];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f4f4fb] py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Desktop Layout (Above 980px) */}
        <div className="hidden min-[981px]:grid grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column - Logo and Contact */}
          <div>
            <a href="#top" className="h-[75px] w-[294px] mb-12 block cursor-pointer">
              <img src={'/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png'} alt="Logo" className="h-full w-auto object-cover" />
            </a>
            <div className="font-medium text-[15px] leading-[normal] tracking-[-0.3px] text-[#59646b]">
              <a href="https://maps.app.goo.gl/vt32cPMHv8aKjvuSA" target="_blank" rel="noopener noreferrer" className="hover:text-[#5757ff] transition-colors block">
                <p>18 Quezon Street, 6th Avenue, 1400,</p>
                <p>Caloocan City</p>
              </a>
              <a href="mailto:info@high6.com" className="mt-4 hover:text-[#5757ff] transition-colors block">info@high6.com</a>
              <p className="mt-1">
                <a href="tel:+63288687318" className="hover:text-[#5757ff] transition-colors">+632 8 668 7318</a> | <a href="tel:+639228995585" className="hover:text-[#5757ff] transition-colors">+63 922 899 5585</a>
              </p>
            </div>
          </div>

          {/* Right Column - Navigation, Social, Copyright */}
          <div className="flex flex-col items-end gap-8 pt-8">
            {/* Navigation */}
            <nav className="flex gap-x-8 lg:gap-x-10 font-normal text-[#333] text-[16px] tracking-[-0.32px] max-[1180px]:max-w-[500px] max-[1180px]:flex max-[1180px]:flex-wrap max-[1180px]:justify-end max-[1180px]:gap-y-[20px] max-[980px]:max-w-none max-[980px]:flex-nowrap max-[980px]:flex-col max-[980px]:items-end max-[980px]:gap-y-4">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#5757ff] transition-colors whitespace-nowrap">
                  {link}
                </a>
              ))}
            </nav>

            {/* Social Media */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/Facebook.svg" alt="Facebook" className="size-6" />
              </a>
              <a href="https://www.instagram.com/high6creatives/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/Instagram.svg" alt="Instagram" className="size-6" />
              </a>
              <a href="https://x.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/X.svg" alt="X" className="size-6" />
              </a>
              <a href="https://www.linkedin.com/company/high6/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/assets/LinkedIn.svg" alt="LinkedIn" className="size-6" />
              </a>
            </div>

            {/* Copyright */}
            <p className="font-medium text-[15px] tracking-[-0.3px] text-[#59646b]">© {currentYear} Apir Tayo</p>
          </div>
        </div>

        {/* Mobile Layout (980px and below) - Single Centered Column */}
        <div className="flex flex-col items-center text-center gap-8 min-[981px]:hidden">
          {/* Logo */}
          <a href="#top" className="h-[75px] w-[294px] cursor-pointer">
            <img src={'/assets/21d4ce298801e0be4817d2f654476dd5b3cbcb08.png'} alt="Logo" className="h-full w-auto object-cover" />
          </a>

          {/* Menu (Column) */}
          <nav className="flex flex-col gap-4 font-normal text-[#333] text-[16px] tracking-[-0.32px]">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#5757ff] transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* Location & Contacts */}
          <div className="font-medium text-[15px] leading-[normal] tracking-[-0.3px] text-[#59646b]">
            <a href="https://maps.app.goo.gl/vt32cPMHv8aKjvuSA" target="_blank" rel="noopener noreferrer" className="hover:text-[#5757ff] transition-colors block">
              <p>18 Quezon Street, 6th Avenue, 1400,</p>
              <p>Caloocan City</p>
            </a>
            <a href="mailto:info@high6.com" className="mt-4 hover:text-[#5757ff] transition-colors block">info@high6.com</a>
            <p className="mt-1">
              <a href="tel:+63288687318" className="hover:text-[#5757ff] transition-colors">+632 8 668 7318</a> | <a href="tel:+639228995585" className="hover:text-[#5757ff] transition-colors">+63 922 899 5585</a>
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/Facebook.svg" alt="Facebook" className="size-6" />
            </a>
            <a href="https://www.instagram.com/high6creatives/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/Instagram.svg" alt="Instagram" className="size-6" />
            </a>
            <a href="https://x.com/high6creatives" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/X.svg" alt="X" className="size-6" />
            </a>
            <a href="https://www.linkedin.com/company/high6/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              <img src="/assets/LinkedIn.svg" alt="LinkedIn" className="size-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="font-medium text-[15px] tracking-[-0.3px] text-[#59646b]">© {currentYear} Apir Tayo</p>
        </div>
      </div>
    </footer>
  );
}
