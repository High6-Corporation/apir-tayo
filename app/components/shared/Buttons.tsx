import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
import { ArrowRightIcon } from "./Icons";

export function PrimaryButton({ children, className = "", ...props }: ButtonProps) {
  return (
    <button 
      className={`group bg-[#5757ff] hover:bg-[#24247d] flex gap-2.5 items-center justify-center px-6 py-3.5 rounded-full text-white font-semibold text-[15px] z-20 tracking-[-0.3px] leading-[23px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] transition-colors duration-300 cursor-pointer ${className}`} 
      {...props}
    >
      {children}
      <div className="grid place-items-center relative">
        <div className="bg-[rgba(255,255,255,0.3)] group-hover:bg-[#5757ff] border border-[rgba(255,255,255,0.2)] rounded-full size-[30px] transition-colors duration-300" />
        <div className="absolute">
          <ArrowRightIcon />
        </div>
      </div>
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }: ButtonProps) {
  return (
    <button 
      className={`bg-white hover:bg-transparent hover:text-white border border-[rgba(215,215,215,0.5)] h-[58px] items-center justify-center px-6 py-3.5 rounded-full text-black font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-all duration-300 cursor-pointer ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
