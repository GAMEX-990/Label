import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const login = await prisma.advert.findUnique({
            where: { branch: data.bracnch_id },
        })

        if (!login) {
            return NextResponse.json({ message: "ไม่พบรหัสโปรดติดต่อ Admin ที่สาขา 1964" }, { status: 404 })
        }

        const cookieStore = await cookies();
        cookieStore.set("current_branch", login.branch, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        })
        return NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ", branch: login.branch, branch_name: login.branch_name, });
    } catch (error) {
        return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
    }
}