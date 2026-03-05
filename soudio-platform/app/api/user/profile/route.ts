/**
 * GET  /api/user/profile — Return authenticated user data
 * PUT  /api/user/profile — Update user profile fields
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { updateProfileSchema } from "@/lib/validators/auth";
import { PLAN_NAMES } from "@/types";

// ─── GET /api/user/profile ────────────────────────────────────────────────────
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        subscription: {
          include: {
            transactions: {
              orderBy: { createdAt: "desc" },
              take: 5,
            },
          },
        },
        images: {
          where: { isDeleted: false },
          orderBy: { createdAt: "desc" },
          take: 6,
          select: {
            id: true,
            studioId: true,
            patternName: true,
            imageUrl: true,
            thumbnailUrl: true,
            aspectRatio: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "المستخدم غير موجود" }, { status: 404 });
    }

    const sub = user.subscription;
    const totalImages = sub ? sub.imagesLimit + sub.extraCredits : 0;
    const remainingImages = sub ? Math.max(0, totalImages - sub.imagesUsed) : 0;
    const usagePercent = totalImages > 0 ? Math.round((sub!.imagesUsed / totalImages) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        subscription: sub
          ? {
              id: sub.id,
              planType: sub.planType,
              planName: PLAN_NAMES[sub.planType],
              imagesLimit: sub.imagesLimit,
              imagesUsed: sub.imagesUsed,
              extraCredits: sub.extraCredits,
              totalImages,
              remainingImages,
              usagePercent,
              status: sub.status,
              startDate: sub.startDate,
              endDate: sub.endDate,
              transactions: sub.transactions,
            }
          : null,
        recentImages: user.images,
      },
    });
  } catch (error) {
    console.error("[GET /api/user/profile]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}

// ─── PUT /api/user/profile ────────────────────────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

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

    const { firstName, lastName, phone } = parsed.data;

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: {
        firstName,
        lastName,
        phone: phone || null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "تم تحديث البيانات بنجاح",
    });
  } catch (error) {
    console.error("[PUT /api/user/profile]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}
