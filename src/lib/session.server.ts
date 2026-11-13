import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isRoleSlug, type RoleSlug } from "./roles-public";

export const COOKIE_NAME = "graddnos_role";
export const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function signingSecret(): string | null {
  const value = process.env.SESSION_SECRET?.trim();
  return value && value.length >= 32 ? value : null;
}

export function isSessionConfigured() {
  return signingSecret() !== null;
}

export function signRole(slug: RoleSlug): string {
  const secret = signingSecret();
  if (!secret) throw new Error("SESSION_SECRET saknas eller är för kort.");
  const payload = Buffer.from(JSON.stringify({ slug, iat: Math.floor(Date.now() / 1000) }), "utf8").toString("base64url");
  const mac = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

export function verifyRole(token: string | undefined): RoleSlug | null {
  const secret = signingSecret();
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = createHmac("sha256", secret).update(payload).digest();
  let actual: Buffer;
  try { actual = Buffer.from(signature, "base64url"); } catch { return null; }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const data: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data || typeof data !== "object") return null;
    const item = data as { slug?: unknown; iat?: unknown };
    if (typeof item.slug !== "string" || !isRoleSlug(item.slug)) return null;
    if (typeof item.iat !== "number" || !Number.isFinite(item.iat)) return null;
    const elapsed = Math.floor(Date.now() / 1000) - item.iat;
    if (elapsed < -300 || elapsed > MAX_AGE_SECONDS) return null;
    return item.slug;
  } catch { return null; }
}

export async function lockedRole(): Promise<RoleSlug | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return verifyRole(token);
}

export function codesEnabled(): boolean {
  return Boolean(process.env.ROLE_CODES_JSON?.trim());
}

export function roleCodeIsValid(slug: RoleSlug, code: unknown): boolean {
  if (!codesEnabled()) return true;
  try {
    const data = JSON.parse(process.env.ROLE_CODES_JSON ?? "") as Record<string, unknown>;
    const expected = data[slug];
    if (typeof expected !== "string" || expected.length < 4 || typeof code !== "string") return false;
    // Avoid leaking codes through the app; only compare here on the server.
    const a = createHmac("sha256", "role-code").update(code.trim()).digest();
    const b = createHmac("sha256", "role-code").update(expected).digest();
    return timingSafeEqual(a, b);
  } catch { return false; }
}
