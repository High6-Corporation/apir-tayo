"use client";

import Image from "next/image";
import { ComponentProps } from "react";

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, "src"> {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * OptimizedImage - A wrapper around Next.js Image component with sensible defaults
 * for performance optimization.
 *
 * Features:
 * - Automatic WebP/AVIF format selection
 * - Responsive sizing
 * - Lazy loading by default (unless priority is true)
 * - Proper aspect ratio handling
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  className = "",
  fill = false,
  sizes,
  width,
  height,
  style,
  ...props
}: OptimizedImageProps) {
  // Determine if this is an external image (WordPress or other domain)
  const isExternal = src.startsWith("http://") || src.startsWith("https://");

  // Default sizes for responsive images if not provided
  const defaultSizes =
    sizes ||
    (fill
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      : undefined);

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={defaultSizes}
      className={className}
      style={{
        objectFit: "cover",
        ...style,
      }}
      unoptimized={isExternal ? false : undefined}
      {...props}
    />
  );
}

/**
 * PortfolioImage - Specialized component for portfolio gallery images
 * with specific dimensions and lazy loading
 */
export function PortfolioImage({
  src,
  alt,
  className = "",
  ...props
}: Omit<OptimizedImageProps, "priority" | "fill"> & {
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        objectFit: "cover",
        objectPosition: "top",
      }}
      sizes="(max-width: 768px) 256px, 231px"
    />
  );
}

/**
 * HeroImage - Specialized component for hero section images
 * with priority loading for LCP optimization
 */
export function HeroImage({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority
      loading="eager"
      decoding="sync"
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={{
        objectFit: "cover",
        ...props.style,
      }}
      sizes={fill ? "100vw" : undefined}
    />
  );
}

/**
 * LogoImage - Specialized component for logo/trust badge images
 * with small size optimization
 */
export function LogoImage({
  src,
  alt,
  className = "",
  width = 180,
  height = 45,
}: Omit<OptimizedImageProps, "priority" | "fill" | "width" | "height"> & {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        objectFit: "contain",
        height: `${height}px`,
        width: "auto",
      }}
      sizes="180px"
    />
  );
}
