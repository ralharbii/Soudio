/**
 * POST /api/auth/login
 * Authenticates user and issues a JWT session cookie
 */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators/auth";
import { createToken, setSessionCookie } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Validate input ────────────────────────────────────────────────────────
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "بيانات غير صحيحة",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password, remember } = parsed.data;

    // ── Find user ─────────────────────────────────────────────────────────────
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        passwordHash: true,
        isActive: true,
      },
    });

    if (!user) {
      // Use same message to avoid email enumeration
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "الحساب موقوف. يرجى التواصل مع الدعم" },
        { status: 403 }
      );
    }

    // ── Verify password ───────────────────────────────────────────────────────
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    // ── Issue token ───────────────────────────────────────────────────────────
    const token = await createToken({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await setSessionCookie(token, remember ?? false);

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: "تم تسجيل الدخول بنجاح",
    });
  } catch (error) {
    console.error("[login]", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ، يرجى المحاولة مرة أخرى" },
      { status: 500 }
    );
  }
}
