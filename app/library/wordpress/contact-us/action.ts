"use server";
import { fetchGraphQL } from "../graphql";

export async function getGForms(): Promise<any> {
  const QUERY_ID =
    "1a2ecfee56fac2b7be522b15ae4982bb44f25c562714bd52c49bd9803592ce32";
  const raw = await fetchGraphQL(QUERY_ID, {search: process.env.WP_GRAVITY_FORM_CONTACT_ID});
  return raw;
}
