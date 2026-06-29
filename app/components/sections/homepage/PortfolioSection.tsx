"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/components/hooks/useScrollAnimation";

const PAYLOAD_BASE = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "";

function resolveImageUrl(url: string): string {
  if (url.startsWith("/api/media/") && PAYLOAD_BASE) {
    return `${PAYLOAD_BASE}${url}`;
  }
  return url;
}

// const portfolioImageMap: Record<string, string> = {
//   "Soding Bros": "/assets/soding-bros.png",
//   "Tipping Point PH": "/assets/tipping-point-ph.png",
//   "Ad-Haven": "/assets/adhaven.png",
//   "Michael James Love": "/assets/mjl.png",
//   "City Tech": "/assets/69608c73f7374bc0cc7e836fb4d87a10f6e2c208.png",
//   Edgetech: "/assets/3f5a380ce7d9387320c7ce2309ba10a3a368ee9a.png",
// };

interface PortfolioSectionProps {
  projects: {
    title: string;
    category: string;
    url: string;
    image?: { id: string; url: string } | string | null;
  }[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const { elementRef: headerRef, isVisible: headerVisible } =
    useScrollAnimation();

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-white py-12 max-[980px]:py-8 max-[767px]:py-6"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center mb-4 scroll-animate ${headerVisible ? "scroll-animate-visible" : ""}`}
        >
          <div className="flex items-center gap-1 mb-2">
            <div className="h-0 w-14 border-t border-[#5757ff]" />
            <img
              src="/assets/our-works-icon.svg"
              alt=""
              className="h-[24px] w-[24px]"
            />
            <p className="font-bold text-[13px] tracking-[-0.26px] text-[#5757ff]">
              OUR WORKS
            </p>
            <div className="h-0 w-14 border-t border-[#5757ff]" />
          </div>
          <h3 className="font-semibold tracking-[-0.6px] text-[#333] max-w-[413px]">
            Recent One-Page Websites
          </h3>
        </div>

        <p
          className={`font-medium text-[15px] leading-[27px] text-[#59646b] text-center mb-12 scroll-animate ${headerVisible ? "scroll-animate-visible" : ""}`}
        >
          A selection of high-performing one-page sites we've designed for our
          clients.
        </p>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleProjects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-[#d7d7d7] rounded-[20px] overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500 ${
                index >= 6 ? "animate-fadeInUp" : ""
              }`}
              style={{
                animationDelay: index >= 6 ? `${(index - 6) * 100}ms` : "0ms",
              }}
            >
              <div className="bg-white h-[223px] overflow-hidden rounded-t-[16px] relative">
                <img
                  src={resolveImageUrl(
                    (typeof project.image === "object" && project.image?.url) ||
                    
                    "/assets/placeholder.png"
                  )}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto object-cover object-top absolute top-0 left-0 transition-transform duration-[3000ms] ease-linear group-hover:translate-y-[calc(-100%+223px)]"
                />
              </div>
              <div className="h-[64px] rounded-b-[16px] px-[18px] flex items-center">
                <div>
                  <h4 className="font-bold tracking-[-0.6px] text-[#5757ff]">
                    {project.title}
                  </h4>
                  <p className="font-medium text-[15px] tracking-[-0.45px] text-[#59646b]">
                    {project.category}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
