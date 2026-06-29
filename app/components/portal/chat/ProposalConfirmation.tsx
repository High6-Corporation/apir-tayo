"use client";

import type { ProposalPayload } from "./types";

// ---------------------------------------------------------------------------
// Proposal confirmation bar — "✅ Confirm Change" button shown when a
// dry-run proposal is pending.
// ---------------------------------------------------------------------------

interface ProposalConfirmationProps {
  pendingProposal: ProposalPayload | null;
  loading: boolean;
  onConfirm: () => void;
}

export function ProposalConfirmation({
  pendingProposal,
  loading,
  onConfirm,
}: ProposalConfirmationProps) {
  if (!pendingProposal) return null;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto 12px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        onClick={onConfirm}
        disabled={loading}
        style={{
          padding: "12px 32px",
          fontSize: "0.9375rem",
          fontWeight: 600,
          fontFamily: "Inter, system-ui, sans-serif",
          border: "none",
          borderRadius: 12,
          background: loading
            ? "#A5F3FC"
            : "linear-gradient(135deg, #0891B2, #06B6D4)",
          color: loading ? "#0E7490" : "#FFFFFF",
          cursor: loading ? "default" : "pointer",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.opacity = "0.92";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        ✅ Confirm Change
      </button>
    </div>
  );
}
