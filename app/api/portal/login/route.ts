import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL;

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST(request: Request) {
  // --- Parse client body ---
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (!PAYLOAD_API_URL) {
    return NextResponse.json(
      { error: "Login service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  // --- Forward login to Payload CMS server-side ---
  let loginRes: Response;
  try {
    loginRes = await fetch(`${PAYLOAD_API_URL}/api/portal-clients/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the login service. Please try again later." },
      { status: 502 },
    );
  }

  // --- Parse Payload response ---
  let data: { token?: string; user?: Record<string, unknown>; errors?: Array<{ message: string }>; message?: string };
  try {
    data = await loginRes.json();
  } catch {
    return NextResponse.json(
      { error: "Login service returned an invalid response. Please try again." },
      { status: 502 },
    );
  }

  if (!loginRes.ok) {
    // Do not leak Payload's raw error to the client — return a generic message
    console.error(
      "[portal login proxy] upstream error:",
      JSON.stringify({ status: loginRes.status, body: data }),
    );
    return NextResponse.json(
      { error: "Login failed. Please check your credentials." },
      { status: loginRes.status },
    );
  }

  const { token, user } = data;

  if (!token || !user?.tenant) {
    return NextResponse.json(
      { error: "Login service returned an incomplete session. Please try again." },
      { status: 502 },
    );
  }

  // --- Resolve tenantId (same logic as app/api/portal/session/route.ts) ---
  // user.tenant may be a populated object (from Payload login) or a bare ID string
  const userTenant = user.tenant as { id?: string } | string;
  const tenantId: string =
    typeof userTenant === "object" ? (userTenant.id ?? String(userTenant)) : userTenant;

  // --- Set httpOnly cookies ---
  const cookieStore = await cookies();
  cookieStore.set("portal_token", token, COOKIE_OPTIONS);
  cookieStore.set("portal_tenant_id", tenantId, COOKIE_OPTIONS);

  return NextResponse.json({ success: true });
}
