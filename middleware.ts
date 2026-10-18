// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const branchSession = request.cookies.get("current_branch");
  const pathname = request.nextUrl.pathname;

  // 1. ระบุ Endpoint ที่ยอมให้เข้าถึงได้โดยไม่ต้องล็อกอิน (เช่น API Login)
  const isPublicRoute =
    pathname === "/login" ||
    pathname.startsWith("/api/login");

  // 2. ถ้าเข้าถึงโฟลเดอร์ /api/...
  if (pathname.startsWith("/api") && !isPublicRoute) {
    
    // 🔴 เงื่อนไขที่ 1: ยังไม่ได้ล็อกอิน (ไม่มี Cookie สาขา)
    if (!branchSession) {
      // วิธี A: ส่งหน้าจอ 404 ของ Next.js เหมือนไม่มีหน้านี้อยู่จริงในระบบ
      return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });

      // หรือ วิธี B: ส่ง JSON 404 กลับไป
      // return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    // 🔴 เงื่อนไขที่ 2 (เทคนิคพิเศษ): ดักคนดับเบิ้ลคลิกเปิดดูในแท็บใหม่
    // เมื่อคนดับเบิ้ลคลิกใน Network tab เบราว์เซอร์จะส่ง header "sec-fetch-mode: navigate" เข้ามา
    const fetchMode = request.headers.get("sec-fetch-mode");
    if (fetchMode === "navigate") {
      // บล็อกไม่ให้เปิดดูตรงๆ บนแท็บเบราว์เซอร์ ให้ขึ้น 404 ทันที (ยอมรับเฉพาะ fetch จากหน้าเว็บเท่านั้น)
      return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
    }
  }

  // 3. ถ้าเป็นหน้าเว็บปกติแล้วยังไม่ได้ล็อกอิน ให้พาไปหน้า /login
  if (!branchSession && !isPublicRoute && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// กำหนดขอบเขตการทำงานของ Middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};