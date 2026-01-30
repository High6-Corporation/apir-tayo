"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { StarIcon } from "../shared/Icons";
import { MessageSquare } from "lucide-react";
interface Testimonial {
  image: string;
  quote: string;
  name: string;
  position: string;
}
const testimonials: Testimonial[] = [
  {
    image: "/assets/fe469b185e22c22c52d0ffd1f48cc2456391a87f.png",
    quote: "They delivered a beautiful one-page website that clearly explains our service and converts visitors into leads. Fast, professional, and easy to work with.",
    name: "Alex Young",
    position: "Founder, Mac Aire"
  },
  {
    image: "/assets/fe469b185e22c22c52d0ffd1f48cc2456391a87f.png",
    quote: "Working with them was seamless. Our new website perfectly captures our brand and has significantly improved our online presence.",
    name: "Sarah Chen",
    position: "CEO, Tech Solutions"
  },
  {
    image: "/assets/fe469b185e22c22c52d0ffd1f48cc2456391a87f.png",
    quote: "Exceptional quality and attention to detail. They understood our vision and brought it to life better than we imagined.",
    name: "Michael Rodriguez",
    position: "Director, Creative Agency"
  },
  {
    image: "/assets/fe469b185e22c22c52d0ffd1f48cc2456391a87f.png",
    quote: "The process was smooth and efficient. Our clients love the new website, and we've seen a noticeable increase in inquiries.",
    name: "Emily Watson",
    position: "Founder, Design Studio"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className={`flex flex-col items-center text-center mb-12 scroll-animate ${headerVisible ? 'scroll-animate-visible' : ''}`}>
          <div className="flex items-center gap-1 mb-2">
            <div className="h-0 w-14 border-t border-[#5757ff]" />
            <img src="/assets/testimonials-icon.svg" alt="" className="h-[24px] w-[24px]" />
            <p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">TESTIMONIALS</p>
            <div className="h-0 w-14 border-t border-[#5757ff]" />
          </div>
          <h3 className="font-semibold tracking-[-0.6px] text-[#333] max-w-[413px]">
            What Our Clients Say
          </h3>
        </div>

        {/* Testimonial Carousel Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] overflow-hidden max-w-[1104px] mx-auto p-8 lg:p-16">
                  <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="flex justify-center items-center">
                      <div className="border border-[#d7d7d7] rounded-[20px] overflow-hidden w-full max-w-[420px]">
                        <div className="bg-white h-[280px] overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt="Website Preview" 
                            className="w-full h-auto object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>

                      <p className="font-medium text-[15px] leading-[27px] text-[#59646b] mb-10">
                        {testimonial.quote}
                      </p>

                      <div>
                        <h4 className="font-bold text-[#5757ff] mb-1">{testimonial.name}</h4>
                        <p className="font-medium text-[15px] leading-[27px] text-[#59646b]">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-[#5757ff]' : 'bg-[#E6E6E6] hover:bg-[#c4c4c4]'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
