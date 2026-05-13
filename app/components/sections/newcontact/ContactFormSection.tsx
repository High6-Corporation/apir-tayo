import { getDynamicFormFields } from '@/app/lib/gravity-forms/contactform';
import ContactForm from "./ContactForm";

export default async function ContactFormSection() {
  // Fetch form fields from WordPress Gravity Forms (Form ID 1 - default contact form)
  const fields = await getDynamicFormFields(process.env.WP_GRAVITY_FORM_CONTACT_ID);

  return (
    <ContactForm fields={fields} formId={process.env.WP_GRAVITY_FORM_CONTACT_ID} />
  );
}
