"use client";

import type { Message } from "./types";
import { PaperclipIcon } from "./icons";

// ---------------------------------------------------------------------------
// Scrollable message history — renders message bubbles + loading indicator.
// ---------------------------------------------------------------------------

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  uploading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({
  messages,
  loading,
  uploading,
  messagesEndRef,
}: MessageListProps) {
  return (
    <>
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            padding: "14px 18px",
            borderRadius: 14,
            background: msg.role === "user" ? "#FFFFFF" : "#F0FDFF",
            border:
              msg.role === "user" ? "1px solid #CFFAFE" : "1px solid #A5F3FC",
            maxWidth: "85%",
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            boxShadow:
              msg.role === "user"
                ? "0 1px 3px rgba(0, 0, 0, 0.04)"
                : "0 2px 8px rgba(8, 145, 178, 0.06)",
          }}
        >
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: msg.role === "user" ? "#0E7490" : "#0891B2",
              marginBottom: 6,
            }}
          >
            {msg.role === "user" ? "You" : "Agent"}
          </div>
          {/* Attachment indicator — static pill with paperclip icon + filename.
               Object URLs (blob:) are never stored on messages because they are
               revoked after upload and unreliable in message history. */}
          {msg.attachedImageName && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                rowGap: "6px",
                columnGap: "6px",
                marginBottom: 8,
                padding: "6px 12px",
                borderRadius: 8,
                background: "#FFFFFF",
                border: "1px solid #CFFAFE",
                fontSize: "0.8125rem",
                color: "#0E7490",
              }}
            >
              <PaperclipIcon />
              <span>{msg.attachedImageName}</span>
            </div>
          )}
          <div
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "#164E63",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {loading && (
        <div
          style={{
            padding: "14px 18px",
            borderRadius: 14,
            background: "#F0FDFF",
            border: "1px solid #A5F3FC",
            maxWidth: "85%",
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            rowGap: "10px",
            columnGap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              rowGap: "4px",
              columnGap: "4px",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#0891B2",
                  animation: `pulse 1.4s ${i * 0.2}s infinite`,
                  opacity: 0.4,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: "0.8125rem",
              color: "#0E7490",
            }}
          >
            {uploading ? "Uploading image…" : "Agent is thinking…"}
          </span>
          {/* Inline keyframes via style tag — rendered once per loading state */}
          <style>{`
            @keyframes pulse {
              0%, 80%, 100% { opacity: 0.4; transform: scale(0.8); }
              40% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}

      <div ref={messagesEndRef} />
    </>
  );
}
