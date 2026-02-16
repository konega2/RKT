import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createSessionToken, validateAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ message: "Credenciales incorrectas." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 10
  });

  return response;
}
