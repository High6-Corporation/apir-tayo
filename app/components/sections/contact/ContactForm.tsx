"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DynamicFormField,
  submitDynamicFormAction,
} from "@/app/lib/gravity-forms/contactform";
import { useCleanTalkBotDetector } from "@/app/lib/cleantalk/cleantalkscript";

interface ContactFormProps {
  fields: DynamicFormField[];
  formId?: string;
}

// Input field styles
const inputClassName =
  "bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] h-[48px] w-full px-[14px] text-[15px] tracking-[-0.45px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#5757ff] transition-colors";

const selectClassName =
  "bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] h-[48px] w-full px-[14px] text-[15px] tracking-[-0.45px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#5757ff] transition-colors";

const textareaClassName =
  "bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] h-[201px] w-full px-[14px] py-[14px] text-[15px] tracking-[-0.45px] placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#5757ff] transition-colors resize-none";

export default function ContactForm({ fields, formId }: ContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    if (ctScriptFailed) {
      setSubmitStatus({
        type: "error",
        message:
          "Security verification failed. Please refresh the page and try again.",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(event.currentTarget);

    try {
      const ctToken =
        formData.get("ct_bot_detector_event_token")?.toString() || "";

      formData.delete("ct_bot_detector_event_token");

      const result = await submitDynamicFormAction(
        formData,
        fields,
        formId,
        ctToken,
      );

      if (result.success) {
        router.push("/thank-you");
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Render field based on type
  function renderField(field: DynamicFormField) {
    const fieldName = `input_${field.id}`;

    // Show label based on labelPlacement setting from WordPress
    // const showLabel = field.labelPlacement !== "hidden_label";
    const showLabel = false;

    // const placeholder = field.isRequired
    //   ? `${field.placeholder}*`
    //   : field.placeholder;

    const placeholder = field.placeholder;

    switch (field.type) {
      case "email":
        return (
          <div key={field.id} className="space-y-2">
            {showLabel && (
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {field.label}{" "}
                {field.isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <div>
              <input
                id={fieldName}
                name={fieldName}
                type="email"
                placeholder={placeholder}
                required={field.isRequired}
                maxLength={field.maxLength}
                className={inputClassName}
                aria-label={field.label || undefined}
              />
            </div>
          </div>
        );

      case "phone":
        return (
          <div key={field.id} className="space-y-2">
            {showLabel && (
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {field.label}{" "}
                {field.isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <div>
              <input
                id={fieldName}
                name={fieldName}
                type="tel"
                placeholder={placeholder}
                required={field.isRequired}
                maxLength={field.maxLength}
                className={inputClassName}
                aria-label={field.label || undefined}
                onInput={(e) => {
                  // Only allow numbers and dashes
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^\d-]/g, "");
                }}
              />
            </div>
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            {showLabel && (
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {field.label}{" "}
                {field.isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <div>
              <select
                id={fieldName}
                name={fieldName}
                required={field.isRequired}
                defaultValue=""
                onChange={(e) => {
                  setSelectValues((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }));
                }}
                className={`${selectClassName} ${
                  selectValues[field.name]
                    ? "text-[#585858]"
                    : "text-[rgba(88,88,88,0.5)]"
                }`}
                aria-label={field.label || undefined}
              >
                <option value="" disabled>
                  {placeholder}
                </option>
                {field.choices?.map((choice) => (
                  <option
                    key={choice.value}
                    value={choice.value}
                    className="text-[#585858]"
                  >
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            {showLabel && (
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {field.label}{" "}
                {field.isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <div>
              <textarea
                id={fieldName}
                name={fieldName}
                placeholder={placeholder}
                rows={6}
                required={field.isRequired}
                maxLength={field.maxLength}
                className={textareaClassName}
                aria-label={field.label || undefined}
              />
            </div>
          </div>
        );

      case "text":
      default:
        return (
          <div key={field.id} className="space-y-2">
            {showLabel && (
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {field.label}{" "}
                {field.isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <div>
              <input
                id={fieldName}
                name={fieldName}
                type="text"
                placeholder={placeholder}
                required={field.isRequired}
                maxLength={field.maxLength}
                className={inputClassName}
                aria-label={field.label || undefined}
              />
            </div>
          </div>
        );
    }
  }

  const { scriptFailed: ctScriptFailed } = useCleanTalkBotDetector();

  return (
    <section className="relative overflow-hidden bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-16">
        <h1 className="font-semibold text-[32px] md:text-[40px] lg:text-[55px] leading-[1.2] text-center mb-8 lg:mb-16">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Left - Info */}
          <div className="w-full lg:w-[562px] text-center lg:text-left">
            <h2 className="font-semibold text-[24px] md:text-[30px] mb-4">
              Get in Touch!
            </h2>
            <p className="font-medium text-[15px] mb-8 text-[#333]">
              Whether you have a product inquiry, need customer support, or want
              to explore partnership opportunities.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://www.facebook.com/share/1M3Xs6p7uv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/Facebook.svg" className="size-6" />
              </a>
              <a
                href="https://www.instagram.com/apir.tayo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/Instagram.svg" className="size-6" />
              </a>
              <a
                href="https://x.com/high6creatives"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/X.svg" className="size-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/apirtayo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/LinkedIn.svg" className="size-6" />
              </a>
            </div>
          </div>

          {/* Right - GraphQL Form */}
          <div className="w-full lg:w-[630px] max-w-[630px] m-auto bg-white rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] p-[20px] md:p-[30px] overflow-hidden">
            {ctScriptFailed && (
              <div
                role="alert"
                aria-live="assertive"
                className="bg-amber-50 border border-amber-300 p-4 mb-6 rounded"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      Security Check Unavailable
                    </p>
                    <p className="text-sm text-amber-700">
                      Please refresh the page to load the security verification.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded transition-colors cursor-pointer"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </div>
            )}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-[20px]"
            >
              {/* Honeypot field - hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Dynamic Fields */}
              {fields.map((field) => renderField(field))}

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`p-[14px] rounded-[10px] dmsans text-[14px] ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || ctScriptFailed}
                  className={`bg-[#5757ff] hover:bg-[#24247d] flex gap-[10px] items-center justify-center px-[24px] py-[14px] rounded-[100px] text-white font-semibold text-[15px] tracking-[-0.3px] leading-[23px] transition-colors duration-300 ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
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
          </div>
        </div>
      </div>
    </section>
  );
}
