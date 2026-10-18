
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        if (!data.bracnch_name || !data.bracnch_id) {
            return NextResponse.json({ message: "กรอกข้อมูลไม่ครบถ้วน" }, { status: 404 })
        }

        const newbracnch = await prisma.advert.create({
            data: {
                branch: data.bracnch_id,
                branch_name: data.bracnch_name
            }
        })
        return NextResponse.json({ message: "บันทึกข้อมูลสาขาสำเร็จ" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "เกิดข้อผิดพลาดฝั่ง Sever ไม่บันทึกข้อมูลสาขาได้" }, { status: 404 })
    }
}