"use client";

import { HelpIcon } from "./icons";

// ---------------------------------------------------------------------------
// Chat header — site name (primary), tenant name (secondary), action buttons.
// ---------------------------------------------------------------------------

interface ChatHeaderProps {
  siteName: string;
  tenantName: string;
  hydrated: boolean;
  showCapabilities: boolean;
  onToggleCapabilities: () => void;
  logoutLoading: boolean;
  onLogout: () => void;
}

export function ChatHeader({
  siteName,
  tenantName,
  hydrated,
  showCapabilities: _showCapabilities,
  onToggleCapabilities,
  logoutLoading,
  onLogout,
}: ChatHeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "#FFFFFF",
        borderBottom: "1px solid #CFFAFE",
        boxShadow: "0 1px 3px rgba(8, 145, 178, 0.06)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          rowGap: "12px",
          columnGap: "12px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #0891B2, #22D3EE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          A
        </div>
        <div>
          <h1
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#164E63",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {hydrated ? siteName : "Portal Chat"}
          </h1>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#0E7490",
              margin: 0,
            }}
          >
            {hydrated
              ? `${tenantName} — AI-powered content management`
              : "AI-powered content management"}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          rowGap: "12px",
          columnGap: "12px",
        }}
      >
        <button
          onClick={onToggleCapabilities}
          style={{
            padding: "8px 16px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            fontFamily: "Inter, system-ui, sans-serif",
            border: "1px solid #A5F3FC",
            borderRadius: 8,
            background: "#FFFFFF",
            color: "#0E7490",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            rowGap: "6px",
            columnGap: "6px",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#0891B2";
            e.currentTarget.style.background = "#F0FDFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#A5F3FC";
            e.currentTarget.style.background = "#FFFFFF";
          }}
          aria-label="What can I do?"
        >
          <HelpIcon />
          What can I do?
        </button>

        <button
          onClick={onLogout}
          disabled={logoutLoading}
          style={{
            padding: "8px 18px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            fontFamily: "Inter, system-ui, sans-serif",
            border: "1px solid #A5F3FC",
            borderRadius: 8,
            background: "#FFFFFF",
            color: "#0E7490",
            cursor: logoutLoading ? "default" : "pointer",
            opacity: logoutLoading ? 0.5 : 1,
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!logoutLoading) {
              e.currentTarget.style.borderColor = "#0891B2";
              e.currentTarget.style.background = "#F0FDFF";
            }
          }}
          onMouseLeave={(e) => {
            if (!logoutLoading) {
              e.currentTarget.style.borderColor = "#A5F3FC";
              e.currentTarget.style.background = "#FFFFFF";
            }
          }}
        >
          {logoutLoading ? "Logging out…" : "Logout"}
        </button>
      </div>
    </header>
  );
}
