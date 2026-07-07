import React from "react";

type Props = {
  /** A sanitized HTML string (already converted from Lexical JSON server-side). */
  data: string | null | undefined;
  /** HTML element to render as. Default: "div". */
  as?: React.ElementType;
  className?: string;
};

/**
 * Renders a pre-sanitized HTML string via `dangerouslySetInnerHTML`.
 *
 * The Lexical→HTML conversion happens server-side in `fetchSiteSettings` —
 * this component only receives the finished HTML string and does no
 * client-side Lexical processing.
 *
 * When `data` is null, undefined, or empty, the component renders nothing
 * (null) — callers should provide fallback content outside this component.
 */
export function RichTextRenderer({ data, as: Tag = "div", className }: Props) {
  if (!data) return null;
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: data }} />
  );
}
