// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // สั่งลบ Cookie สาขาปัจจุบัน
    cookieStore.delete("current_branch");

    return NextResponse.json(
      { success: true, message: "ออกจากระบบสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการออกจากระบบ" },
      { status: 500 }
    );
  }
}