import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, user } = body;

    if (!token || !user?.tenant) {
      return NextResponse.json(
        { error: "Missing token or tenant ID" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    // user.tenant may be a populated object (from Payload login) or a bare ID string
    const tenantId =
      typeof user.tenant === "object" ? user.tenant.id : user.tenant;

    cookieStore.set("portal_token", token, COOKIE_OPTIONS);
    cookieStore.set("portal_tenant_id", tenantId, COOKIE_OPTIONS);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.set("portal_token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
  cookieStore.set("portal_tenant_id", "", { ...COOKIE_OPTIONS, maxAge: 0 });

  return NextResponse.json({ success: true });
}
