"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data: { error?: string };
      try {
        data = await res.json();
      } catch {
        setError("Received an invalid response from the server. Please try again.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data?.error ?? "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      router.push("/portal/chat");
    } catch (err) {
      // Distinguish network errors from other failures
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Cannot connect to the server. This may be a network or configuration issue. Please try again later.",
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 50%, #E0F2FE 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "40px 32px",
          boxShadow: "0 4px 24px rgba(8, 145, 178, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #0891B2, #22D3EE)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#164E63",
              margin: "0 0 4px",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Apirtayo Portal
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#0E7490",
              margin: 0,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Sign in to manage your content
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#164E63",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.9375rem",
                fontFamily: "Inter, system-ui, sans-serif",
                border: "1px solid #A5F3FC",
                borderRadius: 10,
                background: "#F0FDFF",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0891B2";
                e.target.style.boxShadow = "0 0 0 3px rgba(8, 145, 178, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#A5F3FC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#164E63",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "0.9375rem",
                fontFamily: "Inter, system-ui, sans-serif",
                border: "1px solid #A5F3FC",
                borderRadius: 10,
                background: "#F0FDFF",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0891B2";
                e.target.style.boxShadow = "0 0 0 3px rgba(8, 145, 178, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#A5F3FC";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div
              role="alert"
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                marginBottom: 20,
                fontSize: "0.875rem",
                color: "#991B1B",
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 0",
              fontSize: "0.9375rem",
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
              border: "none",
              borderRadius: 10,
              background: loading
                ? "#A5F3FC"
                : "linear-gradient(135deg, #0891B2, #06B6D4)",
              color: loading ? "#0E7490" : "#FFFFFF",
              cursor: loading ? "default" : "pointer",
              transition: "opacity 0.2s, transform 0.15s",
              minHeight: 48,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.opacity = "0.92";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.opacity = "1";
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
