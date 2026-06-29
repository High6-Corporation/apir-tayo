"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatHeader } from "@/app/components/portal/chat/ChatHeader";
import { ChatEmptyState } from "@/app/components/portal/chat/ChatEmptyState";
import { CapabilitiesModal } from "@/app/components/portal/chat/CapabilitiesModal";
import { MessageList } from "@/app/components/portal/chat/MessageList";
import { MessageInput } from "@/app/components/portal/chat/MessageInput";
import { ProposalConfirmation } from "@/app/components/portal/chat/ProposalConfirmation";
import { useChatSession } from "@/app/components/portal/chat/hooks/useChatSession";
import { useImageUpload } from "@/app/components/portal/chat/hooks/useImageUpload";

// ---------------------------------------------------------------------------
// Portal chat page — thin orchestrator. Owns top-level UI state (hydrated,
// showCapabilities, logoutLoading) and composes hooks + presentational
// components. All chat logic lives in useChatSession / useImageUpload.
// ---------------------------------------------------------------------------

export function ChatWindow({
  tenantId,
  tenantName,
  siteName,
  siteSlug: _siteSlug,
}: {
  tenantId: string;
  tenantName: string;
  siteName?: string;
  siteSlug?: string;
}) {
  const displaySiteName = siteName || "Your Site";
  const router = useRouter();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Mark as hydrated after first client-side render
  useEffect(() => {
    setHydrated(true);
  }, []);

  const imageUpload = useImageUpload();
  const chat = useChatSession(tenantId, imageUpload);

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await fetch("/api/portal/session", { method: "DELETE" });
    } catch {
      // Proceed with redirect even if the call fails
    } finally {
      router.push("/portal/login");
    }
  }

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #ECFEFF 0%, #F0FDFF 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <ChatHeader
        siteName={displaySiteName}
        tenantName={tenantName}
        hydrated={hydrated}
        showCapabilities={showCapabilities}
        onToggleCapabilities={() => setShowCapabilities((prev) => !prev)}
        logoutLoading={logoutLoading}
        onLogout={handleLogout}
      />

      {/* Messages */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          rowGap: "16px",
          columnGap: "16px",
          maxWidth: 720,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
        role="log"
        aria-label="Chat messages"
      >
        {chat.messages.length === 0 ? (
          <ChatEmptyState
            siteName={displaySiteName}
            hydrated={hydrated}
            onPopulateInput={chat.setInput}
            onShowCapabilities={() => setShowCapabilities(true)}
          />
        ) : (
          <MessageList
            messages={chat.messages}
            loading={chat.loading}
            uploading={imageUpload.uploading}
            messagesEndRef={chat.messagesEndRef}
          />
        )}
      </main>

      {/* Input */}
      <footer
        style={{
          padding: "16px 24px 20px",
          background: "#FFFFFF",
          borderTop: "1px solid #CFFAFE",
          boxShadow: "0 -1px 3px rgba(8, 145, 178, 0.04)",
          flexShrink: 0,
        }}
      >
        <ProposalConfirmation
          pendingProposal={chat.pendingProposal}
          loading={chat.loading}
          onConfirm={() => {
            chat.setInput("confirm");
            setTimeout(() => chat.handleSend(), 0);
          }}
        />

        <MessageInput
          input={chat.input}
          onInputChange={chat.setInput}
          loading={chat.loading}
          pendingProposal={chat.pendingProposal}
          pendingSelection={chat.pendingSelection}
          awaitingValue={chat.awaitingValue}
          awaitingField={chat.awaitingField}
          awaitingFields={chat.awaitingFields}
          selectedFile={imageUpload.selectedFile}
          imagePreviewUrl={imageUpload.imagePreviewUrl}
          onSend={chat.handleSend}
          onKeyDown={chat.handleKeyDown}
          onClearFile={imageUpload.clearSelectedFile}
          onFileSelect={imageUpload.handleFileSelect}
          fileInputRef={imageUpload.fileInputRef}
        />
      </footer>

      {/* Capabilities Modal */}
      <CapabilitiesModal
        open={showCapabilities}
        onClose={() => setShowCapabilities(false)}
      />
    </div>
  );
}
