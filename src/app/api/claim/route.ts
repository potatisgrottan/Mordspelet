import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isRoleSlug } from "@/lib/roles-public";
import {
  COOKIE_NAME, MAX_AGE_SECONDS, isSessionConfigured,
  roleCodeIsValid, signRole, verifyRole,
} from "@/lib/session.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSessionConfigured()) {
    return NextResponse.json(
      { error: "SESSION_SECRET saknas. Be spelledaren kontrollera Vercels miljövariabler." },
      { status: 503 }
    );
  }

  // Same-origin only. This limits off-site form/CSRF attempts.
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) {
    return NextResponse.json({ error: "Ogiltigt ursprung." }, { status: 403 });
  }

  const store = await cookies();
  const existing = verifyRole(store.get(COOKIE_NAME)?.value);
  let raw: unknown;
  try { raw = await request.json(); } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }
  const { slug, code } = raw as { slug?: unknown; code?: unknown };
  if (typeof slug !== "string" || !isRoleSlug(slug)) {
    return NextResponse.json({ error: "Okänd roll." }, { status: 400 });
  }
  if (existing && existing !== slug) {
    return NextResponse.json({ error: "Den här mobilen har redan låsts till en annan roll." }, { status: 409 });
  }
  if (!existing && !roleCodeIsValid(slug, code)) {
    return NextResponse.json({ error: "Fel rollkod. Be spelledaren om rätt kod." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true, slug });
  if (!existing) response.cookies.set(COOKIE_NAME, signRole(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
