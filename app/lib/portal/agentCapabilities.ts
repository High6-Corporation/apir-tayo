// ---------------------------------------------------------------------------
// Single source of truth for agent capabilities.
//
// The "What can I do?" panel AND the empty-state capability summary both
// render from these definitions.  Update here and both surfaces stay in sync.
//
// When "create new records" ships, add new entries to AGENT_CAPABILITIES,
// update HELP_ITEMS, and optionally add a SUGGESTION_CHIP — it's a one-line
// change per action.
// ---------------------------------------------------------------------------

export interface AgentCapability {
  collection: string;
  /** Human-readable action labels (e.g. "Update question"). */
  actions: readonly string[];
}

/**
 * Structured capability definitions.
 *
 * Used to generate the natural-language empty-state summary
 * ("I can help you update FAQs, testimonials, portfolio items…").
 */
export const AGENT_CAPABILITIES: readonly AgentCapability[] = [
  {
    collection: "FAQs",
    actions: ["Update question", "Update answer"],
  },
  {
    collection: "Testimonials",
    actions: ["Update quote", "Update name", "Update position"],
  },
  {
    collection: "Portfolio Items",
    actions: ["Update title", "Update category", "Update URL"],
  },
  {
    collection: "Posts / Pages",
    actions: ["Update title"],
  },
  {
    collection: "Media",
    actions: ["Upload and attach images"],
  },
  {
    collection: "FAQs",
    actions: ["Create new FAQ"],
  },
  {
    collection: "Testimonials",
    actions: ["Create new testimonial"],
  },
  {
    collection: "Portfolio Items",
    actions: ["Create new portfolio item"],
  },
  {
    collection: "Pricing Plans",
    actions: ["Create new pricing plan"],
  },
] as const;

// ---------------------------------------------------------------------------
// Human-readable flat list — displayed in the capabilities modal.
// Co-authored with AGENT_CAPABILITIES so the two never drift apart.
// ---------------------------------------------------------------------------

export const HELP_ITEMS = [
  "Update FAQ questions and answers",
  "Update testimonial quotes, names, and positions",
  "Update portfolio item titles, categories, and URLs",
  "Update post and page titles",
  "Upload and attach images to testimonials and portfolio items",
  "Create new FAQs, testimonials, portfolio items, and pricing plans",
] as const;

export const CANNOT_ITEMS = [
  "Delete content or records",
  "Change site structure or layouts",
  "Modify frontend code",
  "Reassign content between tenants",
] as const;

// ---------------------------------------------------------------------------
// Quick-action chips shown in the empty state.
// Clicking a chip populates the input (doesn't auto-send).
// ---------------------------------------------------------------------------

export const SUGGESTION_CHIPS = [
  "Update a FAQ",
  "Edit a testimonial",
  "Update portfolio item",
  "Add a new FAQ",
  "Add a testimonial",
  "Add a pricing plan",
  "Add a portfolio item",
  "What can I do?",
] as const;
