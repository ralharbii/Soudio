/**
 * GET    /api/images — Paginated user image library
 * DELETE /api/images — Bulk delete images
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

// ─── GET /api/images ──────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "20"));
    const studioId = searchParams.get("studioId") || undefined;
    const sortBy = searchParams.get("sortBy") === "oldest" ? "asc" : "desc";

    const where = {
      userId: session.userId,
      isDeleted: false,
      ...(studioId ? { studioId } : {}),
    };

    const [images, total] = await Promise.all([
      prisma.generatedImage.findMany({
        where,
        orderBy: { createdAt: sortBy },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          studioId: true,
          patternName: true,
          imageUrl: true,
          thumbnailUrl: true,
          aspectRatio: true,
          createdAt: true,
        },
      }),
      prisma.generatedImage.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        images,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("[GET /api/images]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}

// ─── DELETE /api/images ───────────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "يرجى تحديد الصور المراد حذفها" },
        { status: 400 }
      );
    }

    // Soft-delete images (only those belonging to this user)
    const result = await prisma.generatedImage.updateMany({
      where: {
        id: { in: ids },
        userId: session.userId,
      },
      data: { isDeleted: true },
    });

    return NextResponse.json({
      success: true,
      data: { deleted: result.count },
      message: `تم حذف ${result.count} صورة بنجاح`,
    });
  } catch (error) {
    console.error("[DELETE /api/images]", error);
    return NextResponse.json({ success: false, error: "حدث خطأ" }, { status: 500 });
  }
}
