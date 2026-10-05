import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Single-admin auth: credentials live in ADMIN_EMAIL / ADMIN_PASSWORD, and a login
// is a signed, expiring cookie. Changing the password invalidates existing sessions.
export const SESSION_COOKIE = "valor-admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);
}

function safeEqual(a: string, b: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

function sign(expires: string) {
  return createHmac("sha256", process.env.SESSION_SECRET!)
    .update(`${expires}.${process.env.ADMIN_PASSWORD}`)
    .digest("base64url");
}

export function checkCredentials(email: string, password: string) {
  if (!isAdminConfigured()) return false;
  const emailMatches = safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL!.trim().toLowerCase());
  const passwordMatches = safeEqual(password, process.env.ADMIN_PASSWORD!);
  return emailMatches && passwordMatches;
}

export function createSessionToken() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now() / 1000;
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

// For admin pages: sends anyone without a valid session to the login screen.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
