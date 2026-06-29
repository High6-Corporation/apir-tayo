// ---------------------------------------------------------------------------
// Shared types for the portal chat UI.
// Extracted from ChatWindow.tsx — used by components and hooks.
// ---------------------------------------------------------------------------

export interface Message {
  role: "user" | "agent";
  text: string;
  /** When set, the user attached an image with this filename.
   *  Object URLs are intentionally NOT stored — they are revoked after
   *  upload and unreliable in message history.  MessageList renders a
   *  static attachment indicator instead of an <img>. */
  attachedImageName?: string;
}

export interface ProposalPayload {
  action: string;
  /** Slug for post/page actions (backward compatible) */
  slug?: string;
  /** ID for FAQ/testimonial/portfolio actions */
  id?: string;
  currentValue: string;
  newValue: string;
  collection: string;
  documentId: string;
  /** When set, chains into awaiting_value after confirmation (FAQ "both"). */
  nextAction?: string;
}

export interface SelectionContext {
  collection: string;
  records: Array<{ id: string; label: string; preview: string }>;
  originalMessage: string; // the client's original message, to resume after selection
  mediaId?: string; // carry through selection round-trip for link_image
}

/**
 * Carries the action/id/collection/field context across an awaiting_value
 * round-trip.  When the user provides the new value, it is sent alongside
 * this context so the agent can construct a synthetic ParsedAction.
 */
export interface AwaitingValueContext {
  action: string;
  /** Record ID for post-selection actions (FAQs, testimonials, portfolio) */
  id?: string;
  /** Slug for post/page title actions */
  slug?: string;
  collection: string;
  field: string;
  /** When set, chains into a second awaiting_value after the first is confirmed.
   *  Used for FAQ "both" (question → answer). */
  nextAction?: string;
}

/**
 * Carries the action/id/collection context across an awaiting_field
 * round-trip.  When the user chooses question / answer / both, it is sent
 * alongside this context so the agent can determine the field.
 */
export interface AwaitingFieldContext {
  action: string;
  /** Record ID for the FAQ being edited */
  id?: string;
  collection: string;
  /** When set, chains into a second awaiting_value after the first is confirmed. */
  nextAction?: string;
}

/**
 * Carries the multi-field collection context across awaiting_fields
 * round-trips.  When the agent asks for the next field value during a
 * create-record sequence, this stores the accumulated state.
 */
export interface AwaitingFieldsContext {
  action: string;
  /** The field the agent is currently asking about. */
  field: string;
  /** Human-readable prompt to show the client. */
  prompt: string;
  /** All field values collected so far. */
  collected: Record<string, string>;
  /** Collection slug — informational. */
  collection: string;
}
