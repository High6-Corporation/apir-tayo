"use client";

import {
  AGENT_CAPABILITIES,
  SUGGESTION_CHIPS,
} from "@/app/lib/portal/agentCapabilities";

// ---------------------------------------------------------------------------
// Empty-state center panel — site-aware heading, capability summary, and
// quick-action chips that populate the input without auto-sending.
// ---------------------------------------------------------------------------

interface ChatEmptyStateProps {
  siteName: string;
  hydrated: boolean;
  onPopulateInput: (text: string) => void;
  onShowCapabilities: () => void;
}

export function ChatEmptyState({
  siteName,
  hydrated,
  onPopulateInput,
  onShowCapabilities,
}: ChatEmptyStateProps) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "14px",
        columnGap: "14px",
        color: "#0E7490",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: "linear-gradient(135deg, #0891B2, #22D3EE)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4,
          opacity: 0.8,
        }}
      >
        A
      </div>

      {/* Site-aware heading */}
      {hydrated && siteName !== "Your Site" ? (
        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            margin: 0,
            textAlign: "center",
            color: "#164E63",
          }}
        >
          You&apos;re managing{" "}
          <strong style={{ color: "#0891B2" }}>{siteName}</strong>
        </p>
      ) : (
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            margin: 0,
            textAlign: "center",
          }}
        >
          Start a conversation
        </p>
      )}

      {/* Capability summary — derived from AGENT_CAPABILITIES */}
      <p
        style={{
          fontSize: "0.8125rem",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 420,
        }}
      >
        {hydrated
          ? `I can help you update ${AGENT_CAPABILITIES.map((c) =>
              c.collection.toLowerCase(),
            ).join(
              ", ",
            )} for this site — just tell me what you'd like to change.`
          : "Tell the agent what you'd like to do — update content, check pages, or manage your site."}
      </p>

      {/* Quick-action chips — populate input without auto-sending */}
      {hydrated && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                if (chip === "What can I do?") {
                  onShowCapabilities();
                } else {
                  onPopulateInput(chip);
                }
              }}
              style={{
                padding: "8px 16px",
                fontSize: "0.8125rem",
                fontWeight: 500,
                fontFamily: "Inter, system-ui, sans-serif",
                border: "1px solid #A5F3FC",
                borderRadius: 20,
                background: "#FFFFFF",
                color: "#0E7490",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0891B2";
                e.currentTarget.style.background = "#F0FDFF";
                e.currentTarget.style.color = "#0891B2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#A5F3FC";
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#0E7490";
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
