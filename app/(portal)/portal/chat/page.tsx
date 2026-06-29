import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChatWindow } from "./ChatWindow";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL;
const PAYLOAD_SITE_ID = process.env.PAYLOAD_SITE_ID;

async function fetchTenantName(
  tenantId: string,
  token: string,
): Promise<string | null> {
  if (!PAYLOAD_API_URL) return null;

  try {
    const res = await fetch(
      `${PAYLOAD_API_URL}/api/tenants/${tenantId}`,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
        // Don't cache indefinitely — tenant name could change
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.name ?? null;
  } catch {
    return null;
  }
}

async function fetchSiteName(
  siteId: string,
  token: string,
): Promise<{ name: string; slug: string } | null> {
  if (!PAYLOAD_API_URL) return null;

  try {
    const res = await fetch(
      `${PAYLOAD_API_URL}/api/sites/${siteId}`,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.name) return null;

    return { name: data.name as string, slug: (data.slug as string) ?? "" };
  } catch {
    return null;
  }
}

export default async function PortalChatPage() {
  const cookieStore = await cookies();
  const tenantId = cookieStore.get("portal_tenant_id")?.value;
  const portalToken = cookieStore.get("portal_token")?.value;

  if (!tenantId) {
    redirect("/portal/login");
  }

  // Resolve tenant name for the header
  let tenantName = "Your Portal";
  if (portalToken) {
    const fetched = await fetchTenantName(tenantId, portalToken);
    if (fetched) tenantName = fetched;
  }

  // Resolve site name / slug (site-aware empty state + header)
  let siteName = "";
  let siteSlug = "";
  if (portalToken && PAYLOAD_SITE_ID) {
    const site = await fetchSiteName(PAYLOAD_SITE_ID, portalToken);
    if (site) {
      siteName = site.name;
      siteSlug = site.slug;
    }
  }

  return (
    <ChatWindow
      tenantId={tenantId}
      tenantName={tenantName}
      siteName={siteName}
      siteSlug={siteSlug}
    />
  );
}
