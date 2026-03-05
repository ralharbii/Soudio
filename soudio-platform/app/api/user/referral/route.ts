/**
 * POST /api/user/referral
 * Sends a referral invitation email
 * GET  /api/user/referral — Returns list of sent referrals
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { referralSchema } from "@/lib/validators/auth";

// ─── GET — Referral history ───────────────────────────────────────────────────
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const referrals = await prisma.referral.findMany({
      where: { senderId: session.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        receiverEmail: true,
        status: true,
        rewardImages: true,
        createdAt: true,
        claimedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: referrals });
  } catch (error) {
    console.error("[GET /api/user/referral]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}

// ─── POST — Send referral ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = referralSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "البريد الإلكتروني غير صحيح",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Cannot invite yourself
    if (email.toLowerCase() === session.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "لا يمكنك دعوة نفسك" },
        { status: 400 }
      );
    }

    // Check if already invited
    const existing = await prisma.referral.findFirst({
      where: {
        senderId: session.userId,
        receiverEmail: email.toLowerCase(),
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "لقد أرسلت دعوة لهذا البريد الإلكتروني مسبقاً" },
        { status: 409 }
      );
    }

    // Create referral record
    const referral = await prisma.referral.create({
      data: {
        senderId: session.userId,
        receiverEmail: email.toLowerCase(),
        rewardImages: 5,
      },
    });

    // TODO: Send invitation email via email service (Phase 3+)

    return NextResponse.json({
      success: true,
      data: referral,
      message: "تم إرسال الدعوة بنجاح",
    });
  } catch (error) {
    console.error("[POST /api/user/referral]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}
