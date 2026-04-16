"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";
import { StarIcon } from "../../shared/Icons";
interface Testimonial {
  image: string;
  quote: string;
  name: string;
  position: string;
}
const testimonials: Testimonial[] = [
  {
    image: "/assets/gtgo.png",
    quote: "High6 delivered a clean, modern website that perfectly reflects our brand. The process was smooth, fast, and very well-managed from start to finish.",
    name: "Jason Go",
    position: "Vice President, GTGO Enterprises Inc."
  },
  {
    image: "/assets/premiere-builders-corp.png",
    quote: "Working with High6 was seamless. They understood our requirements clearly and delivered a website that looks professional and performs well across all devices.",
    name: "Gene Nicolas",
    position: "Founder, Premiere Builders Corp."
  },
  {
    image: "/assets/all-about-people.png",
    quote: "High6 transformed our ideas into a functional and engaging website. Their attention to detail and responsiveness made the entire collaboration easy and efficient.",
    name: "Claudia Soriano",
    position: "CEO, All About People"
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
                        <div className="bg-white h-[280px] overflow-hidden relative">
                          <Image
                            src={testimonial.image}
                            alt="Website Preview"
                            fill
                            loading="lazy"
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 420px"
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
