import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState } from "lexical";

/**
 * Convert a Payload Lexical richText JSON value to an HTML string.
 *
 * Returns an empty string for any invalid, empty, or null-ish input — callers
 * can treat empty-string as "nothing to render" and fall back to hardcoded
 * defaults.
 *
 * No sanitization layer is applied here because `convertLexicalToHTML`
 * produces HTML from a fixed set of Lexical node types (paragraph, text,
 * bold, italic, underline, link, linebreak) — the output is inherently
 * tag-safe.  DOMPurify was evaluated and removed because isomorphic-dompurify
 * does not consistently initialise its JSDOM shim in Next.js 16's SSR
 * runtime, causing hydration mismatches (server "" vs client full HTML).
 */
export function serializeLexical(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const state = data as SerializedEditorState;
  if (!state.root) return "";
  const html = convertLexicalToHTML({ data: state });
  if (typeof html !== "string") return "";
  return html;
}
