import { cookies } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const currentBranch = cookieStore.get("current_branch")?.value;

        const getproduts = await prisma.advert.findUnique({
            where: {branch: currentBranch},
            include: {
               products: {
                orderBy: {po: "asc"}
               }
            }
        })
        return NextResponse.json({ data: getproduts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "เกิดข้อผิดพลาดไม่สามารถเชื่อมต่อเซิฟเวอร์ได้" })
    }
}