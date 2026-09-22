import { prisma } from "../../generated/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getproduts = await prisma.product.findMany({
            orderBy:
                [{ po: "asc" }
                ]
        })
        return NextResponse.json({ data: getproduts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "เกิดข้อผิดพลาดไม่สามารถเชื่อมต่อเซิฟเวอร์ได้" })
    }
}