/**
 * Portal Upload Proxy — POST /api/portal/upload
 *
 * Phase 5 — Proxies image uploads from the portal chat client to Payload's
 * agent-upload endpoint. Reads auth cookies (portal_token, portal_tenant_id)
 * and forwards them as bearer token + tenantId in the multipart form.
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL;

export async function POST(request: Request): Promise<Response> {
  // --- Read auth cookies ---
  const cookieStore = await cookies();
  const token = cookieStore.get("portal_token")?.value;
  const tenantId = cookieStore.get("portal_tenant_id")?.value;

  if (!token || !tenantId || tenantId === "undefined") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Parse multipart body ---
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Request must be multipart/form-data" },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'Missing or invalid "file" field' },
      { status: 400 },
    );
  }

  // --- Forward to Payload agent-upload ---
  if (!PAYLOAD_API_URL) {
    return NextResponse.json(
      { error: "PAYLOAD_API_URL not configured" },
      { status: 500 },
    );
  }

  const payloadFormData = new FormData();
  payloadFormData.append("file", file);
  payloadFormData.append("tenantId", tenantId);

  try {
    const uploadRes = await fetch(`${PAYLOAD_API_URL}/api/agent-upload`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: payloadFormData,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: data?.error ?? "Upload failed" },
        { status: uploadRes.status === 403 ? 403 : 502 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Upload service unavailable" },
      { status: 502 },
    );
  }
}
