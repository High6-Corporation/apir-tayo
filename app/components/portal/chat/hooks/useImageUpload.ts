"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Hook: image file selection, preview, and upload to /api/portal/upload.
// ---------------------------------------------------------------------------

export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track the current object URL in a ref so cleanup is always against the
  // latest URL regardless of stale closures in effects or callbacks.
  const objectUrlRef = useRef<string | null>(null);

  // Revoke the previous object URL and reset all state.
  const clearSelectedFile = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setOriginalFileName(null);
  }, []);

  // Clean up on unmount only — avoid revoking during re-renders (the
  // previous useEffect with [imagePreviewUrl] dependency could revoke the
  // URL before the browser had a chance to paint the <img> element).
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (!file) return;

      // Only accept images
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      // Revoke any previous object URL before creating a new one
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      setSelectedFile(file);
      setImagePreviewUrl(url);
      // Capture the original filename before any server-side sanitization occurs
      setOriginalFileName(file.name);

      // Reset the file input so the same file can be re-selected
      e.target.value = "";
    },
    [clearSelectedFile],
  );

  const upload = useCallback(async () => {
    if (!selectedFile) return null;

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      const uploadRes = await fetch("/api/portal/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        return {
          success: false as const,
          error:
            (uploadData?.error as string) ??
            "Image upload failed. Please try again.",
        };
      }

      return {
        success: true as const,
        mediaId: uploadData.mediaId as string,
      };
    } catch {
      return {
        success: false as const,
        error: "Image upload failed. Please try again.",
      };
    } finally {
      setUploading(false);
    }
  }, [selectedFile]);

  return {
    selectedFile,
    imagePreviewUrl,
    originalFileName,
    uploading,
    fileInputRef,
    hasFile: selectedFile !== null,
    clearSelectedFile,
    handleFileSelect,
    upload,
  } as const;
}
