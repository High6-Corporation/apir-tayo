"use client";

import { CANNOT_ITEMS, HELP_ITEMS } from "@/app/lib/portal/agentCapabilities";
import { CheckIcon, CloseIcon, ProhibitedIcon } from "./icons";

// ---------------------------------------------------------------------------
// "What can I do?" modal overlay — capabilities and limitations.
// ---------------------------------------------------------------------------

interface CapabilitiesModalProps {
  open: boolean;
  onClose: () => void;
}

export function CapabilitiesModal({ open, onClose }: CapabilitiesModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Agent capabilities"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.35)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          maxWidth: 480,
          width: "calc(100% - 48px)",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid #CFFAFE",
          boxShadow:
            "0 20px 50px rgba(8, 145, 178, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)",
          padding: "28px 28px 24px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close capabilities panel"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: 8,
            background: "transparent",
            color: "#0E7490",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F0FDFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <CloseIcon />
        </button>

        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#164E63",
            margin: "0 0 24px",
          }}
        >
          What can this assistant do?
        </h2>

        {/* Can-do section */}
        <div style={{ marginBottom: 24 }}>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#0891B2",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 12px",
              display: "flex",
              alignItems: "center",
              rowGap: "6px",
              columnGap: "6px",
            }}
          >
            <CheckIcon />
            What I can help you with
          </h3>
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 22px",
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              columnGap: "8px",
            }}
          >
            {HELP_ITEMS.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: "0.875rem",
                  color: "#164E63",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cannot-do section */}
        <div>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#C2410C",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 12px",
              display: "flex",
              alignItems: "center",
              rowGap: "6px",
              columnGap: "6px",
            }}
          >
            <ProhibitedIcon />
            What I cannot do
          </h3>
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 22px",
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              columnGap: "8px",
            }}
          >
            {CANNOT_ITEMS.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: "0.875rem",
                  color: "#78350F",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer note */}
        <p
          style={{
            margin: "24px 0 0",
            fontSize: "0.75rem",
            color: "#0E7490",
            lineHeight: 1.5,
            textAlign: "center",
            borderTop: "1px solid #CFFAFE",
            paddingTop: 16,
          }}
        >
          All changes require your confirmation before being applied.
        </p>
      </div>
    </div>
  );
}
