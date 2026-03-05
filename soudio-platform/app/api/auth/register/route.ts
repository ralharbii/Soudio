/**
 * POST /api/auth/register
 * Creates a new user account and starts a trial subscription
 */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/auth";
import { createToken, setSessionCookie } from "@/lib/auth/session";
import { PlanType, SubscriptionStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Validate input ────────────────────────────────────────────────────────
    const parsed = registerSchema.safeParse(body);
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

    const { firstName, lastName, email, phone, password } = parsed.data;

    // ── Check existing user ───────────────────────────────────────────────────
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }

    // ── Hash password ─────────────────────────────────────────────────────────
    const passwordHash = await bcrypt.hash(password, 12);

    // ── Create user + subscription in transaction ─────────────────────────────
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          passwordHash,
        },
      });

      // Create trial subscription
      await tx.subscription.create({
        data: {
          userId: newUser.id,
          planType: PlanType.TRIAL,
          imagesLimit: 3,
          imagesUsed: 0,
          status: SubscriptionStatus.TRIAL,
          startDate: new Date(),
          endDate: null,
        },
      });

      return newUser;
    });

    // ── Create session token ──────────────────────────────────────────────────
    const token = await createToken({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await setSessionCookie(token, false);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        message: "تم إنشاء الحساب بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[register]", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ، يرجى المحاولة مرة أخرى" },
      { status: 500 }
    );
  }
}
