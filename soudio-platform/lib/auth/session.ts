/**
 * Soudio Platform — JWT Auth Utilities
 * Handles JWT creation, verification, and cookie management
 */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { SessionPayload } from "@/types";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "soudio-dev-secret-key-change-in-production-2026"
);

const COOKIE_NAME = "soudio_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// ─── Token Creation ───────────────────────────────────────────────────────────
export async function createToken(payload: Omit<SessionPayload, "iat" | "exp">) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);
}

// ─── Token Verification ───────────────────────────────────────────────────────
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Management ────────────────────────────────────────────────────────
export async function setSessionCookie(token: string, remember = false) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: remember ? COOKIE_MAX_AGE : undefined,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── Session Retrieval ────────────────────────────────────────────────────────
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getSessionFromRequest(
  request: NextRequest
): Promise<SessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ─── Auth Check (Server Components) ──────────────────────────────────────────
export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
