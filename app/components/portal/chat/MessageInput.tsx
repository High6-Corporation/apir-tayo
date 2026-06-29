"use client";

import { PaperclipIcon, CloseIcon } from "./icons";

// ---------------------------------------------------------------------------
// Message input area — text field, attach button, send button, image preview.
// ---------------------------------------------------------------------------

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  loading: boolean;
  pendingProposal: unknown; // truthy check only
  pendingSelection: unknown; // truthy check only
  awaitingValue?: unknown; // truthy check only
  awaitingField?: unknown; // truthy check only
  awaitingFields?: unknown; // truthy check only
  selectedFile: File | null;
  imagePreviewUrl: string | null;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function MessageInput({
  input,
  onInputChange,
  loading,
  pendingProposal,
  pendingSelection,
  awaitingValue,
  awaitingField,
  awaitingFields,
  selectedFile,
  imagePreviewUrl,
  onSend,
  onKeyDown,
  onClearFile,
  onFileSelect,
  fileInputRef,
}: MessageInputProps) {
  const placeholder = pendingSelection
    ? "Type a number or name to select a record…"
    : awaitingField
      ? "Type 'question', 'answer', or 'both'…"
      : awaitingFields
        ? "Type the value for this field…"
      : awaitingValue
        ? "Type the new value to update the record…"
        : pendingProposal
          ? 'Type "confirm" to apply, or type a new message to cancel…'
          : selectedFile
            ? "Add a message to send with your image…"
            : "Type a message…";

  return (
    <>
      {/* Image preview above input */}
      {selectedFile && imagePreviewUrl && (
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            rowGap: "10px",
            columnGap: "10px",
            padding: "10px 14px",
            background: "#F0FDFF",
            border: "1px solid #A5F3FC",
            borderRadius: 10,
          }}
        >
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{
              width: 44,
              height: 44,
              borderRadius: 6,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              flex: 1,
              fontSize: "0.8125rem",
              color: "#164E63",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {selectedFile.name}
          </span>
          <button
            onClick={onClearFile}
            aria-label="Remove attached image"
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: 6,
              background: "transparent",
              color: "#0E7490",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#CFFAFE";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          rowGap: "10px",
          columnGap: "10px",
          maxWidth: 720,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <label
          htmlFor="chat-input"
          style={{
            position: "absolute",
            left: -9999,
          }}
        >
          Type a message
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
          placeholder={placeholder}
          aria-label="Type a message"
          style={{
            flex: 1,
            padding: "14px 18px",
            fontSize: "0.9375rem",
            fontFamily: "Inter, system-ui, sans-serif",
            border: "1px solid #CFFAFE",
            borderRadius: 12,
            background: "#F0FDFF",
            color: "#164E63",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#0891B2";
            e.target.style.boxShadow = "0 0 0 3px rgba(8, 145, 178, 0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#CFFAFE";
            e.target.style.boxShadow = "none";
          }}
        />

        {/* Paperclip / attach button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          aria-label="Attach image"
          style={{
            width: 48,
            minWidth: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #CFFAFE",
            borderRadius: 12,
            background: selectedFile ? "#F0FDFF" : "#FFFFFF",
            color: selectedFile ? "#0891B2" : "#0E7490",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
            transition: "border-color 0.2s, background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = "#0891B2";
              e.currentTarget.style.background = "#F0FDFF";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = "#CFFAFE";
              e.currentTarget.style.background = selectedFile
                ? "#F0FDFF"
                : "#FFFFFF";
            }
          }}
        >
          <PaperclipIcon />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <button
          onClick={onSend}
          disabled={loading || (input.trim().length === 0 && !selectedFile)}
          style={{
            padding: "14px 24px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
            border: "none",
            borderRadius: 12,
            background:
              loading || (input.trim().length === 0 && !selectedFile)
                ? "#A5F3FC"
                : "linear-gradient(135deg, #0891B2, #06B6D4)",
            color:
              loading || (input.trim().length === 0 && !selectedFile)
                ? "#0E7490"
                : "#FFFFFF",
            cursor:
              loading || (input.trim().length === 0 && !selectedFile)
                ? "default"
                : "pointer",
            minWidth: 80,
            minHeight: 48,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!loading && (input.trim().length > 0 || selectedFile)) {
              e.currentTarget.style.opacity = "0.92";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          {loading ? "Sending…" : selectedFile ? "Send with Image" : "Send"}
        </button>
      </div>
    </>
  );
}
