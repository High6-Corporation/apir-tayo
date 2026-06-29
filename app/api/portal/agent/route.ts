import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL;

/** Generic fallback shown to clients when the upstream agent returns an error. */
const CLIENT_ERROR_MESSAGE =
  "Something went wrong on my end — could you try rephrasing that, or let me know what you'd like to update?";

export async function POST(request: Request) {
  // --- Read auth cookies ---
  const cookieStore = await cookies();
  const token = cookieStore.get("portal_token")?.value;
  const tenantId = cookieStore.get("portal_tenant_id")?.value;

  if (!token || !tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Parse client body (pass through confirmed, proposal, mediaId, awaitingValue, awaitingField) ---
  let body: {
    message?: string;
    confirmed?: boolean;
    proposal?: Record<string, unknown>;
    mediaId?: string;
    awaitingValue?: Record<string, unknown>;
    awaitingField?: Record<string, unknown>;
    awaitingFields?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.message || typeof body.message !== "string") {
    return NextResponse.json(
      { error: 'Missing or invalid "message" field' },
      { status: 400 },
    );
  }

  // --- Forward to Payload agent ---
  if (!PAYLOAD_API_URL) {
    return NextResponse.json(
      { error: "PAYLOAD_API_URL not configured" },
      { status: 500 },
    );
  }

  try {
    const agentRes = await fetch(`${PAYLOAD_API_URL}/api/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        message: body.message,
        tenantId,
        confirmed: body.confirmed,
        proposal: body.proposal,
        mediaId: body.mediaId,
        awaitingValue: body.awaitingValue,
        awaitingField: body.awaitingField,
        awaitingFields: body.awaitingFields,
      }),
    });

    const data = await agentRes.json();

    // --- Error guard: never leak raw upstream error text to clients ---
    if (!agentRes.ok) {
      console.error(
        "[portal agent proxy] upstream error:",
        JSON.stringify({ status: agentRes.status, body: data }),
      );
      return NextResponse.json(
        { error: CLIENT_ERROR_MESSAGE },
        { status: agentRes.status },
      );
    }

    return NextResponse.json(data, { status: agentRes.status });
  } catch {
    return NextResponse.json(
      { error: "Agent service unavailable" },
      { status: 502 },
    );
  }
}
