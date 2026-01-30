import type { LucideIcon } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  numberPath: string;
}

export interface Project {
  image: string;
  title: string;
  category: string;
  url: string;
}

export interface Testimonial {
  image: string;
  quote: string;
  name: string;
  position: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
