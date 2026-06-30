import type { DynamicFormField } from "@/app/lib/gravity-forms/contactform";
import ContactForm from "./ContactForm";

interface ContactFormSectionProps {
  fields: DynamicFormField[];
  formId?: string;
}

export default async function ContactFormSection({
  fields,
  formId,
}: ContactFormSectionProps) {
  return <ContactForm fields={fields} formId={formId} />;
}
