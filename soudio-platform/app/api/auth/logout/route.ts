/**
 * POST /api/auth/logout
 * Clears the session cookie
 */
import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });
  } catch (error) {
    console.error("[logout]", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء تسجيل الخروج" },
      { status: 500 }
    );
  }
}
