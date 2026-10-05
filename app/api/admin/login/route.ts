import { NextResponse } from "next/server";
import { checkCredentials, createSessionToken, isAdminConfigured, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin login is not set up. Add ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(email, password)) {
    // Slow down repeated guesses.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
  return response;
}
