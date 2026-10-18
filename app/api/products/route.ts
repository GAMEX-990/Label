
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const currentBranch = cookieStore.get("current_branch")?.value;
        const body = await req.json();
        const { items, date } = body;

        if (!currentBranch) {
            return NextResponse.json(
              { message: "ไม่พบข้อมูลสาขา กรุณาเข้าสู่ระบบใหม่" },
              { status: 401 }
            );
          }

        if (!items || !date) {
            return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
        }

        const maxPoRecord = await prisma.product.aggregate({
            where: {
                branch_product: currentBranch,
            },
            _max: {
                po: true
            }
        })

        const nextpo = (maxPoRecord._max.po ?? 0) + 1;
        const recrod = items.map((productName: string) => ({
            name: productName,
            po: nextpo,
            branch_product: currentBranch,
            times_in: new Date(date),
        }));

        const result = await prisma.product.createMany({
            data: recrod,

        });

        return NextResponse.json({ message: "บันทึกข้อมูลสำเร็จ" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "เกิดข้อผิดพลาดไม่สามารถบันทึกได้" }, { status: 404 })
    }
}

export async function DELETE(req: Request) {
    try {
        const cookieStore = await cookies();
        const currentBranch = cookieStore.get("current_branch")?.value;
        const { searchParams } = new URL(req.url);
        const po = searchParams.get("po");
        const delateall = searchParams.get("all")

        if (!currentBranch) {
            return NextResponse.json(
              { message: "ไม่พบข้อมูลสาขา กรุณาเข้าสู่ระบบใหม่" },
              { status: 401 }
            );
          }

        if (delateall === "true") {
            const result = await prisma.product.deleteMany({
                where: {
                    branch_product: currentBranch
                }
            });
            return NextResponse.json({ message: "ลบ Label ทั้งหมดสำเร็จ" }, { status: 200 })
        }


        if (po) {
            const Numberpo = Number(po);
            const result = await prisma.product.deleteMany({
                where: {
                    po: Numberpo,
                    branch_product: currentBranch
                }
            })

            return NextResponse.json({ message: `ลบ PO ${Numberpo} สำเร็จ` }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: "เกิดข้อผิดพลาดฝั่ง Server" }, { status: 400 })
    }
}