"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AwaitingFieldContext,
  AwaitingFieldsContext,
  AwaitingValueContext,
  Message,
  ProposalPayload,
  SelectionContext,
} from "../types";
import type { useImageUpload } from "./useImageUpload";
import { SUGGESTION_CHIPS } from "@/app/lib/portal/agentCapabilities";

// ---------------------------------------------------------------------------
// Error sanitization — never leak raw backend error strings to the client.
// ---------------------------------------------------------------------------

const CLIENT_ERROR_MESSAGE =
  "Something went wrong on my end — could you try rephrasing that, or let me know what you'd like to update?";

/**
 * Format an image-upload error for display.  Upload errors are user-actionable
 * (file too large, wrong format, etc.) and should NOT go through the generic
 * agent-error sanitizer — they come from Payload's validation layer, not from
 * the agent's natural-language parsing.
 */
function formatUploadError(raw: unknown): string {
  if (typeof raw === "string" && raw.length > 0) {
    return `⚠️ ${raw}`;
  }
  return "⚠️ The image could not be uploaded. Please try a smaller file or a different format.";
}

/**
 * If the raw error text looks like an internal/technical message (code-shaped
 * phrasing, field names, PATCH URLs), replace it with a generic friendly
 * fallback.  Otherwise pass it through as-is.
 */
function sanitizeErrorText(raw: unknown): string {
  if (typeof raw !== "string" || raw.length === 0) {
    return "Something went wrong. Please try again.";
  }

  // Patterns that indicate an internal error message that shouldn't be
  // shown to a non-technical client.
  if (
    raw.includes("Missing '") ||
    raw.includes('Missing "') ||
    raw.includes("for action") ||
    raw.includes("is not supported") ||
    raw.includes("PATCH ") ||
    raw.includes("HTTP ") ||
    raw.includes("Authentication failed") ||
    raw.includes("token refresh") ||
    raw.startsWith("{")
  ) {
    return CLIENT_ERROR_MESSAGE;
  }

  return raw;
}

// ---------------------------------------------------------------------------
// Hook: chat session state and send/confirm/cancel logic.
// ---------------------------------------------------------------------------

type ImageUpload = ReturnType<typeof useImageUpload>;

export function useChatSession(tenantId: string, imageUpload: ImageUpload) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingProposal, setPendingProposal] =
    useState<ProposalPayload | null>(null);
  const [pendingSelection, setPendingSelection] =
    useState<SelectionContext | null>(null);
  const [awaitingValue, setAwaitingValue] =
    useState<AwaitingValueContext | null>(null);
  const [awaitingField, setAwaitingField] =
    useState<AwaitingFieldContext | null>(null);
  const [awaitingFields, setAwaitingFields] =
    useState<AwaitingFieldsContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep a ref in sync with input so handleSend always reads the latest value,
  // avoiding stale-closure issues with the setTimeout confirm pattern.
  const inputRef = useRef(input);
  inputRef.current = input;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -----------------------------------------------------------------------
  // handleSend — verbatim logic from original ChatWindow.tsx, adapted only
  // to use imageUpload.* instead of direct file state.
  // -----------------------------------------------------------------------

  const handleSend = useCallback(async () => {
    const trimmed = inputRef.current.trim();
    if (!trimmed || loading) return;

    const hasFile = imageUpload.hasFile;

    // DEBUG: log state at entry
    console.log(
      "[DEBUG handleSend entry] trimmed:",
      trimmed,
      "hasFile:",
      hasFile,
      "awaitingValue:",
      !!awaitingValue,
      "pendingSelection:",
      !!pendingSelection,
      "pendingProposal:",
      !!pendingProposal,
    );

    // --- Awaiting-value resolution: user provided the value after we asked ---
    if (awaitingValue && !hasFile) {
      console.log("[DEBUG handleSend] → entering AWAITING-VALUE chain");
      const av = awaitingValue;
      const userMessage: Message = { role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setAwaitingValue(null);
      setLoading(true);

      try {
        const res = await fetch("/api/portal/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            awaitingValue: {
              action: av.action,
              id: av.id,
              slug: av.slug,
              collection: av.collection,
              field: av.field,
              nextAction: av.nextAction,
            },
          }),
        });

        const data = await res.json();

        // DEBUG: log raw response before processing (awaiting-value chain)
        console.log(
          "[DEBUG awaiting-value chain] res.ok:",
          res.ok,
          "res.status:",
          res.status,
        );
        console.log(
          "[DEBUG awaiting-value chain] raw data:",
          JSON.stringify(data),
        );
        console.log(
          "[DEBUG awaiting-value chain] data?.status:",
          data?.status,
          "typeof:",
          typeof data?.status,
        );
        console.log(
          "[DEBUG awaiting-value chain] data?.status === 'awaiting_value':",
          data?.status === "awaiting_value",
        );

        if (!res.ok) {
          console.log("[DEBUG awaiting-value chain] → branch: !res.ok (error)");
          const errorText = sanitizeErrorText(data?.error);
          setMessages((prev) => [...prev, { role: "agent", text: errorText }]);
        } else if (data?.status === "pending_confirmation" && data?.proposal) {
          console.log(
            "[DEBUG awaiting-value chain] → branch: pending_confirmation",
          );
          const p = data.proposal as ProposalPayload;
          setPendingProposal(p);

          setMessages((prev) => [
            ...prev,
            {
              role: "agent",
              text: p.newValue,
            },
          ]);
        } else if (data?.status === "awaiting_fields") {
          console.log("[DEBUG awaiting-value chain] → branch: awaiting_fields");
          setAwaitingFields({
            action: data.action as string,
            field: data.field as string,
            prompt: data.prompt as string,
            collected: data.collected as Record<string, string>,
            collection: data.collection as string,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else {
          console.log(
            "[DEBUG awaiting-value chain] → branch: FALLTHROUGH (raw JSON)",
          );
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: JSON.stringify(data, null, 2) },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- Awaiting-field resolution: user chose question / answer / both ---
    if (awaitingField && !hasFile) {
      console.log("[DEBUG handleSend] → entering AWAITING-FIELD chain");
      const af = awaitingField;
      const userMessage: Message = { role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setAwaitingField(null);
      setLoading(true);

      try {
        const res = await fetch("/api/portal/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            awaitingField: {
              action: af.action,
              id: af.id,
              collection: af.collection,
              nextAction: af.nextAction,
            },
          }),
        });

        const data = await res.json();

        console.log(
          "[DEBUG awaiting-field chain] raw data:",
          JSON.stringify(data),
        );

        if (!res.ok) {
          const errorText = sanitizeErrorText(data?.error);
          setMessages((prev) => [...prev, { role: "agent", text: errorText }]);
        } else if (data?.status === "awaiting_field") {
          // Re-ask — the agent didn't understand the field choice
          setAwaitingField({
            action: data.action as string,
            id: data.id as string | undefined,
            collection: data.collection as string,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else if (data?.status === "awaiting_value") {
          // Field resolved — now collect the value
          setAwaitingValue({
            action: data.action as string,
            id: data.id as string | undefined,
            slug: data.slug as string | undefined,
            collection: data.collection as string,
            field: data.field as string,
            nextAction: data.nextAction as string | undefined,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else if (data?.status === "awaiting_fields") {
          console.log("[DEBUG awaiting-field chain] → branch: awaiting_fields");
          setAwaitingFields({
            action: data.action as string,
            field: data.field as string,
            prompt: data.prompt as string,
            collected: data.collected as Record<string, string>,
            collection: data.collection as string,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: JSON.stringify(data, null, 2) },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- Awaiting-fields resolution: user provided the next field value ---
    if (awaitingFields) {
      // If a file is attached during multi-field collection, upload it
      // first and merge the mediaId into collected as the "image" field.
      // This allows users to attach an image at any point in the step-by-step
      // create flow (e.g. while typing a field value).
      let resolvedMediaId: string | null = null;
      let fieldStepImageName: string | undefined;

      if (hasFile && imageUpload.selectedFile) {
        // Capture the original filename before it's cleared
        fieldStepImageName =
          imageUpload.originalFileName ??
          imageUpload.selectedFile.name ??
          "Attached image";

        const result = await imageUpload.upload();

        if (!result) {
          return; // defensive — selectedFile is guaranteed non-null
        }

        if (!result.success) {
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: formatUploadError(result.error) },
          ]);
          return;
        }

        resolvedMediaId = result.mediaId;
        imageUpload.clearSelectedFile();
      }

      // Command-cancellation heuristic — only when no file is attached
      // (a file signals the user is providing a field value, not a new
      // command).
      let cancelled = false;

      if (!hasFile) {
        const cancelVerbs =
          /^(update|add|create|new|list|change|edit|delete)\b/i;
        const chipLabels = SUGGESTION_CHIPS as readonly string[];
        const isNewCommand =
          cancelVerbs.test(trimmed) ||
          chipLabels.some(
            (chip) => trimmed.toLowerCase() === chip.toLowerCase(),
          );

        if (isNewCommand) {
          console.log(
            "[DEBUG handleSend] → awaiting-fields command-cancellation — " +
              "clearing awaitingFields, falling through to normal send",
          );
          setAwaitingFields(null);
          cancelled = true;
          // Fall through to the cancel block (which also clears other pending
          // states and adds a "Previous request cancelled." notice) and then
          // to the normal-send chain below.
        }
      }

      // If the command-cancellation fired, skip the round-trip so we fall
      // through to cancel + normal-send.
      if (!cancelled) {
        console.log("[DEBUG handleSend] → entering AWAITING-FIELDS chain");
        const af = awaitingFields;
        const userMessage: Message = {
          role: "user",
          text: trimmed,
          attachedImageName: fieldStepImageName,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setAwaitingFields(null);
        setLoading(true);

        // If an image was uploaded during this step, merge its mediaId into
        // collected so it persists across round-trips.
        const collectedForRequest: Record<string, string> = { ...af.collected };
        if (resolvedMediaId) {
          collectedForRequest.image = resolvedMediaId;
        }

        try {
          const res = await fetch("/api/portal/agent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmed,
              awaitingFields: {
                action: af.action,
                field: af.field,
                collected: collectedForRequest,
              },
            }),
          });

          const data = await res.json();

          console.log(
            "[DEBUG awaiting-fields chain] raw data:",
            JSON.stringify(data),
          );

          if (!res.ok) {
            const errorText = sanitizeErrorText(data?.error);
            setMessages((prev) => [
              ...prev,
              { role: "agent", text: errorText },
            ]);
          } else if (data?.status === "awaiting_fields") {
            // Next field — store context and show prompt
            setAwaitingFields({
              action: data.action as string,
              field: data.field as string,
              prompt: data.prompt as string,
              collected: data.collected as Record<string, string>,
              collection: data.collection as string,
            });
            setMessages((prev) => [
              ...prev,
              { role: "agent", text: data.prompt as string },
            ]);
          } else if (
            data?.status === "pending_confirmation" &&
            data?.proposal
          ) {
            // All fields collected — show proposal
            const p = data.proposal as ProposalPayload;
            setPendingProposal(p);

            setMessages((prev) => [
              ...prev,
              {
                role: "agent",
                text: p.newValue,
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              { role: "agent", text: JSON.stringify(data, null, 2) },
            ]);
          }
        } catch {
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: "Something went wrong. Please try again." },
          ]);
        } finally {
          setLoading(false);
        }
        return;
      } // end if (awaitingFields) — round-trip executed, return
    }

    // --- Selection resolution: user is picking from a record list ---
    if (pendingSelection && !hasFile) {
      console.log("[DEBUG handleSend] → entering SELECTION-RESOLUTION chain");
      const sel = pendingSelection;
      const inputNum = Number(trimmed);
      let matchedRecord: { id: string; label: string; preview: string } | null =
        null;

      if (!isNaN(inputNum) && trimmed === String(inputNum)) {
        // 1-based index into the records array
        const idx = inputNum - 1;
        if (idx >= 0 && idx < sel.records.length) {
          matchedRecord = sel.records[idx];
        }
      } else {
        // Text match: find first record whose label contains the text (case-insensitive)
        const lower = trimmed.toLowerCase();
        matchedRecord =
          sel.records.find((r) => r.label.toLowerCase().includes(lower)) ??
          null;
      }

      if (!matchedRecord) {
        // No match — prompt again
        setMessages((prev) => [
          ...prev,
          { role: "user", text: trimmed },
          {
            role: "agent",
            text: "I didn't catch that. Please type a number from the list, or part of the record name.",
          },
        ]);
        setInput("");
        return;
      }

      // Match found — resolve and re-send
      const resolved = matchedRecord;
      setMessages((prev) => [
        ...prev,
        { role: "user", text: trimmed },
        {
          role: "agent",
          text: `Got it — '${resolved.label}'.`,
        },
      ]);
      setInput("");
      setPendingSelection(null);
      setLoading(true);

      try {
        const res = await fetch("/api/portal/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `${sel.originalMessage} [resolved id: ${resolved.id}] [collection: ${sel.collection}]`,
            mediaId: sel.mediaId,
          }),
        });

        const data = await res.json();

        // DEBUG: log raw response before processing (selection-resolution chain)
        console.log(
          "[DEBUG selection-resolution chain] res.ok:",
          res.ok,
          "res.status:",
          res.status,
        );
        console.log(
          "[DEBUG selection-resolution chain] raw data:",
          JSON.stringify(data),
        );
        console.log(
          "[DEBUG selection-resolution chain] data?.status:",
          data?.status,
          "typeof:",
          typeof data?.status,
        );
        console.log(
          "[DEBUG selection-resolution chain] data?.status === 'awaiting_value':",
          data?.status === "awaiting_value",
        );
        console.log(
          "[DEBUG selection-resolution chain] data?.status === 'pending_confirmation':",
          data?.status === "pending_confirmation",
        );

        if (!res.ok) {
          console.log(
            "[DEBUG selection-resolution chain] → branch: !res.ok (error)",
          );
          const errorText = sanitizeErrorText(data?.error);
          setMessages((prev) => [...prev, { role: "agent", text: errorText }]);
        } else if (data?.status === "pending_confirmation" && data?.proposal) {
          console.log(
            "[DEBUG selection-resolution chain] → branch: pending_confirmation",
          );
          // Proposal returned from the resolved-ID message
          const p = data.proposal as ProposalPayload;
          setPendingProposal(p);

          setMessages((prev) => [
            ...prev,
            {
              role: "agent",
              text: p.newValue,
            },
          ]);
        } else if (data?.status === "awaiting_value") {
          console.log(
            "[DEBUG selection-resolution chain] → branch: awaiting_value",
          );
          // Guard fired after selection: the agent needs a value
          setAwaitingValue({
            action: data.action as string,
            id: data.id as string | undefined,
            slug: data.slug as string | undefined,
            collection: data.collection as string,
            field: data.field as string,
            nextAction: data.nextAction as string | undefined,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else if (data?.status === "awaiting_field") {
          console.log(
            "[DEBUG selection-resolution chain] → branch: awaiting_field",
          );
          // FAQ selected but field not specified — ask which field
          setAwaitingField({
            action: data.action as string,
            id: data.id as string | undefined,
            collection: data.collection as string,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else if (data?.status === "awaiting_fields") {
          console.log(
            "[DEBUG selection-resolution chain] → branch: awaiting_fields",
          );
          setAwaitingFields({
            action: data.action as string,
            field: data.field as string,
            prompt: data.prompt as string,
            collected: data.collected as Record<string, string>,
            collection: data.collection as string,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else {
          console.log(
            "[DEBUG selection-resolution chain] → branch: FALLTHROUGH (raw JSON)",
          );
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: JSON.stringify(data, null, 2) },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- Confirmation handling: user typed "confirm" while proposal is pending ---
    if (pendingProposal && trimmed.toLowerCase() === "confirm" && !hasFile) {
      console.log("[DEBUG handleSend] → entering CONFIRMATION chain");
      const userMessage: Message = { role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      const proposal = pendingProposal;
      setPendingProposal(null);

      try {
        const res = await fetch("/api/portal/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            confirmed: true,
            proposal,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          const errorText = sanitizeErrorText(data?.error);
          setMessages((prev) => [...prev, { role: "agent", text: errorText }]);
        } else if (data?.status === "awaiting_value") {
          // "Both" continuation: after first field confirmed, agent asks for second
          setAwaitingValue({
            action: data.action as string,
            id: data.id as string | undefined,
            slug: data.slug as string | undefined,
            collection: data.collection as string,
            field: data.field as string,
            nextAction: data.nextAction as string | undefined,
          });
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: data.prompt as string },
          ]);
        } else if (data?.success) {
          // Create actions include a friendly "message" field
          if (data.message && typeof data.message === "string") {
            setMessages((prev) => [
              ...prev,
              { role: "agent", text: data.message },
            ]);
          } else {
            const updated = data.updated as Record<string, string>;
            const recordLabel = proposal.id ?? proposal.slug ?? "record";
            const fieldUpdated =
              proposal.action === "link_image"
                ? "image"
                : (Object.keys(updated).filter((k) => k !== "id")[0] ??
                  "field");

            setMessages((prev) => [
              ...prev,
              {
                role: "agent",
                text: `✅ Change applied! The ${proposal.collection.replace(/-/g, " ")} "${recordLabel}" ${fieldUpdated} has been updated.`,
              },
            ]);
          }
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "agent", text: JSON.stringify(data, null, 2) },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- If user sends something else while a proposal, selection, value, field, or fields is pending, cancel it ---
    if (
      pendingProposal ||
      pendingSelection ||
      awaitingValue ||
      awaitingField ||
      awaitingFields
    ) {
      console.log(
        "[DEBUG handleSend] → entering CANCEL block (user overrode pending state)",
      );
      setPendingProposal(null);
      setPendingSelection(null);
      setAwaitingValue(null);
      setAwaitingField(null);
      setAwaitingFields(null);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Got it, I've set that aside. What would you like to do?",
        },
      ]);
    }

    console.log("[DEBUG handleSend] → entering NORMAL-SEND chain");
    // --- Image upload flow ---
    let resolvedMediaId: string | null = null;

    if (hasFile && imageUpload.selectedFile) {
      const result = await imageUpload.upload();

      if (!result) {
        // Defensive — selectedFile is guaranteed non-null by the hasFile guard above
        return;
      }

      if (!result.success) {
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: formatUploadError(result.error) },
        ]);
        setLoading(false);
        return;
      }

      resolvedMediaId = result.mediaId;
    }

    // --- Build the user message (mediaId is passed separately, not in text) ---
    const messageText = trimmed;

    // Capture attachment info before clearing — after clearSelectedFile the
    // filename and preview are gone.  Store only the human-readable filename,
    // never a local object URL (which is revoked after upload and would render
    // as a broken image in message history).
    const attachedImageName = hasFile
      ? (imageUpload.originalFileName ??
        imageUpload.selectedFile?.name ??
        "Attached image")
      : undefined;

    const userMessage: Message = {
      role: "user",
      text: trimmed,
      attachedImageName,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    imageUpload.clearSelectedFile();
    setLoading(true);

    try {
      const res = await fetch("/api/portal/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          mediaId: resolvedMediaId,
        }),
      });

      const data = await res.json();

      // DEBUG: log raw response before processing (normal-send chain)
      console.log(
        "[DEBUG normal-send chain] res.ok:",
        res.ok,
        "res.status:",
        res.status,
      );
      console.log("[DEBUG normal-send chain] raw data:", JSON.stringify(data));
      console.log(
        "[DEBUG normal-send chain] data?.status:",
        data?.status,
        "typeof:",
        typeof data?.status,
      );
      console.log(
        "[DEBUG normal-send chain] data?.status === 'awaiting_value':",
        data?.status === "awaiting_value",
      );

      if (!res.ok) {
        console.log("[DEBUG normal-send chain] → branch: !res.ok (error)");
        const errorText =
          data?.error ?? "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { role: "agent", text: errorText }]);
      } else if (data?.status === "pending_confirmation" && data?.proposal) {
        console.log("[DEBUG normal-send chain] → branch: pending_confirmation");
        // Proposal returned — display it and set pending state
        const p = data.proposal as ProposalPayload;
        setPendingProposal(p);

        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: p.newValue,
          },
        ]);
      } else if (data?.status === "needs_selection" && data?.records) {
        console.log("[DEBUG normal-send chain] → branch: needs_selection");
        // Phase 6: record list returned — show numbered list, wait for client selection
        const records = data.records as Array<{
          id: string;
          label: string;
          preview: string;
        }>;
        const collection = (data.collection as string) ?? "records";

        setPendingSelection({
          collection,
          records,
          originalMessage: trimmed,
          mediaId: resolvedMediaId ?? undefined,
        });

        const listItems = records
          .map((r, i) => `${i + 1}. **${r.label}** — ${r.preview}`)
          .join("\n");

        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: `I found the following ${collection} records for your site. Which one would you like to update?\n\n${listItems}`,
          },
        ]);
      } else if (data?.status === "awaiting_value") {
        console.log("[DEBUG normal-send chain] → branch: awaiting_value");
        // Guard fired: the agent needs a value for the selected record
        setAwaitingValue({
          action: data.action as string,
          id: data.id as string | undefined,
          slug: data.slug as string | undefined,
          collection: data.collection as string,
          field: data.field as string,
          nextAction: data.nextAction as string | undefined,
        });
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: data.prompt as string },
        ]);
      } else if (data?.status === "awaiting_field") {
        console.log("[DEBUG normal-send chain] → branch: awaiting_field");
        // FAQ identified but field not specified — ask which field
        setAwaitingField({
          action: data.action as string,
          id: data.id as string | undefined,
          collection: data.collection as string,
        });
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: data.prompt as string },
        ]);
      } else if (data?.status === "awaiting_fields") {
        console.log("[DEBUG normal-send chain] → branch: awaiting_fields");
        // Create-record field collection initiated
        setAwaitingFields({
          action: data.action as string,
          field: data.field as string,
          prompt: data.prompt as string,
          collected: data.collected as Record<string, string>,
          collection: data.collection as string,
        });
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: data.prompt as string },
        ]);
      } else if (data?.status === "empty_collection") {
        console.log("[DEBUG normal-send chain] → branch: empty_collection");
        // Phase 6: no records in collection — display friendly message
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: data.message ?? "No records found." },
        ]);
      } else if (data?.text) {
        console.log("[DEBUG normal-send chain] → branch: data.text present");
        setMessages((prev) => [...prev, { role: "agent", text: data.text }]);
      } else {
        console.log(
          "[DEBUG normal-send chain] → branch: FALLTHROUGH (raw JSON)",
        );
        // Agent returned JSON — display as formatted string
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: JSON.stringify(data, null, 2) },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    pendingSelection,
    pendingProposal,
    awaitingValue,
    awaitingField,
    awaitingFields,
    imageUpload,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return {
    messages,
    input,
    setInput,
    loading,
    pendingProposal,
    pendingSelection,
    awaitingValue,
    awaitingField,
    awaitingFields,
    messagesEndRef,
    handleSend,
    handleKeyDown,
  } as const;
}
