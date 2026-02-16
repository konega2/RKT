import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "rkt_admin_session";

const ADMIN_USERNAME = "RKT";
const ADMIN_PASSWORD = "RKT_2007";
const TOKEN_SECRET = "rkt-admin-session-secret";

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSessionToken() {
  return crypto.createHash("sha256").update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${TOKEN_SECRET}`).digest("hex");
}

export function isValidSessionToken(token?: string) {
  if (!token) return false;
  return token === createSessionToken();
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}
