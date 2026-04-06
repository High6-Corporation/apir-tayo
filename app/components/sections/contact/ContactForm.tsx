"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Simple GraphQL client
async function graphql(query: string, variables?: any) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

export function ContactForm({ formFields }: { formFields: any[] }) {
  const router = useRouter();
  const [fields, setFields] = useState<any[]>(formFields);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Init form data
  useEffect(() => {
    const empty: Record<string, string> = {};
    formFields.forEach((f: any) => (empty[f.id] = ""));
    setFormData(empty);
  }, [formFields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const result = await graphql(
      `mutation($input: FormInput!) { submitForm(input: $input) { success message } }`,
      { input: formData }
    );

    if (result.data?.submitForm?.success) {
      // Redirect to thank you page
      router.push("/thank-you");
    } else {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <div className="text-center py-10 text-[#5757ff]">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full max-w-[570px]">
      {fields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.id}
            placeholder={`${field.label}${field.required ? "*" : ""}`}
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.id]: e.target.value })
            }
            rows={6}
            className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] h-[201px] w-full px-[14px] py-[14px] text-[15px] tracking-[-0.45px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#5757ff] transition-colors resize-none"
          />
        ) : (
          <input
            key={field.id}
            type={field.type === "email" ? "email" : "text"}
            placeholder={`${field.label}${field.required ? "*" : ""}`}
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) => {
              // Phone field specific logic
              if (field.type === "phone" || field.type === "tel") {
                let value = e.target.value;

                if ((value.match(/\+/g) || []).length > 1) {
                  return;
                }

                value = value.replace(/[^\d\s\+\-\(\)]/g, "");

                setFormData({ ...formData, [field.id]: value });
                return;
              }

              // Default behavior for other fields
              setFormData({ ...formData, [field.id]: e.target.value });
            }}
            className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] h-[48px] w-full px-[14px] text-[15px] tracking-[-0.45px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#5757ff] transition-colors"
          />
        )
      )}

      {/* Status message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-[5px] text-[15px] ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#5757ff] hover:bg-[#24247d] flex gap-[10px] items-center justify-center px-[24px] py-[14px] rounded-[100px] text-white font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-colors duration-300 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
          <div className="grid place-items-center relative">
            <div className="bg-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.2)] rounded-full size-[30px]" />
            <svg
              className="absolute size-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
}
