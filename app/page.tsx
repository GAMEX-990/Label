"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import Loader from "@/components/ui/loaders";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { format } from "date-fns";
import { CalendarClock, Divide, Tag } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { ProductType } from "./types/product";
import dynamic from "next/dynamic";

export default function Home() {
  const [po, getpo] = useState(0);
  const [product, setproduct] = useState<ProductType[]>([]);
  const [tableData, setTableData] = useState<string[][]>([])
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const [open_add_label, setOpenAddLabel] = useState(false);
  const [open_date, setOpenDate] = useState(false);
  const [open_con, setOpencon] = useState(false);
  const [open_conall, setOpenconall] = useState(false);

  const [isLoading, setisLoading] = useState<boolean>(false);
  // const [isLoadingdata, setisLoadingdata] = useState<boolean>(false);

  useEffect(() => {
    fetchdata();
  }, [])

  // โหลด Loader2 เฉพาะฝั่งเบราว์เซอร์เท่านั้น ป้องกันปัญหา SSR 100%
const Loader2 = dynamic(() => import("@/components/ui/labelanimation"), {
  ssr: false,
});

  // ฟังก์ชันสำหรับแปลงข้อความตารางจาก ITEC รองรับตัวขึ้นบรรทัดใหม่ทุกประเภท
const processTableData = (text: string) => {
  if (!text) return;

  const clean = (val: string) =>
    val
      ? val
          .trim()
          .replace(/^[“"”\\]+|[“"”\\]+$/g, "")
          .replace(/F\+/g, "")
          .trim()
      : "";

  // 1. แปลง \r\n และ \r ให้กลายเป็น \n ให้หมดก่อนตัดบรรทัด
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 2. ตัดบรรทัด และแยกคอลัมน์ด้วย Tab (\t)
  const rows = normalized
    .trim()
    .split("\n")
    .map((row) => row.split("\t").map(clean))
    .filter((row) => row.some((cell) => cell !== ""));

  setTableData(rows);
};

const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
  const clipboardData = e.clipboardData.getData("text");
  processTableData(clipboardData);
};

  const handleclear = () => {
    setTableData([]);

    const textarea = document.getElementById("textarea-message") as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = "";
    }
  }

  const saveproduct = async () => {
    setisLoading(true)
    if (!date || date === undefined) {
      toast.add({
        type: "error",
        description: "กรุณาเลือกวันที่ก่อนครับ",
        priority: "high"
      })
      setisLoading(false);
      setOpenDate(true);
      return;
    }

    if (tableData.length <= 1) {
      toast.add({
        type: "error",
        description: "กรุณากรอกข้อมูลให้ครบด้วยครับ",
        priority: "high"
      });
      setisLoading(false);
      return;
    }
    try {
      const items = tableData
        .slice(1)
        .map((row) => row[4]?.replace(/^[“"”\\]+|[“"”\\]+$/g, "").trim())
        .filter(Boolean);
      const response = await fetch("api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          date: date?.toISOString(),
        })
      })
      const dateapi = await response.json();
      if (response.ok) {
        toast.add({
          type: "success",
          description: "บันทึกข้อมูลสำเร็จ",
        })
        fetchdata();
        setOpenAddLabel(false);
        setTableData([]);
      } else {
        toast.add({
          type: "error",
          description: `${dateapi.message}`,
          priority: "high"
        })
      }

    } catch (error) {
      toast.add({
        type: "error",
        description: `${error} ไม่สามารถส่ง API ไปที่เซิฟเวอร์ได้`,
        priority: "high"
      })
    } finally {
      setisLoading(false)
    }
  }

  const fetchdata = async () => {
    setisLoading(true);
    try {
      const response = await fetch("api/getproducts", {
        method: "GET"
      })

      const data = await response.json();
      if (response.ok) {
        toast.add({
          type: "success",
          description: "เชื่อมต่อเซิฟเวอร์สำเร็จ"
        })
        return setproduct(data.data);
      } else {

      }
    } catch (error) {

    } finally {
      setisLoading(false);
    }
  }

  const handleDeletePo = async (poToDelete: number) => {
    setisLoading(true);
    // ถามยืนยันก่อนลบ ป้องกันการกดพลาด
    // const isConfirm = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้าทั้งหมดใน PO #${poToDelete}?`);
    // if (!isConfirm) return;

    if (!poToDelete) {
      toast.add({
        type: "error",
        description: "ไม่มี PO"
      })
      return;
    }

    try {
      const res = await fetch(`api/products?po=${poToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({
          type: "success",
          description: "ลบ PO สำเร็จ"
        })
        setOpencon(false);
        setproduct((prev) => prev.filter((item) => item.po !== poToDelete));
      } else {
        toast.add({
          type: "error",
          description: "ไม่สามารถลบ PO ได้"
        })
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์"
      });
    } finally {
      setisLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    setisLoading(true);
    try {
      const res = await fetch("api/products?all=true", {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({
          type: "success",
          description: `${data.message}`
        })
        fetchdata();
      } else {
        toast.add({
          type: "error",
          description: `${data.message}`
        })
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์"
      });
    } finally {
      setisLoading(false);
      setOpenconall(false);
    }
  };

  // app/page.tsx

  const handlePrint = () => {
    // ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่
    if (!product || product.length === 0) {
      toast.add({
        type: "error",
        description: "ไม่มีรายการสินค้าให้พิมพ์",
      });
      return;
    }

    // เรียกคำสั่งพิมพ์ของเบราว์เซอร์
    window.print();
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="flex justify-center items-center gap-4 text-center py-8 text-zinc-400 text-sm"><Loader /></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mt-10 px-50">
            <div>
              <h1 className="print:hidden flex items-center gap-2 text-2xl font-bold">Easy Label Print<span className="text-sm text-gray-500"><Tag /></span></h1>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button onClick={() => { setOpenAddLabel(true), setDate(undefined) }} variant="outline">เพิ่ม Label</Button>
              <Button onClick={handlePrint} disabled={product.length === 0} variant="outline">PrintLabel</Button>
              <Button onClick={() => setOpenconall(true)} variant="destructive">ลบ Label ทั้งหมด</Button>
            </div>
          </div>
          <hr className="w-full print:hidden" />
          {product.length === 0 ? (
            <div className="flex flex-col justify-center h-screen items-center">
            <h1>ยังไม่มี Label...</h1>
            <Loader2/>
            </div>
          ) : (
            <main className="max-w-7xl mx-auto p-4 sm:p-6 print:p-0 print:m-0 print:max-w-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 print:grid-cols-4 print:gap-0">
                {product.map((item, index) => {
                  const isNewPo = index === 0 || item.po !== product[index - 1].po;

                  return (
                    <React.Fragment key={item.id || index}>
                      {/* แถบหัวข้อ PO (ซ่อนอัตโนมัติเวลาสั่งพิมพ์) */}
                      {isNewPo && (
                        <div className="col-span-full flex items-center justify-between pt-6 pb-2 first:pt-0 border-b border-slate-200 mb-1">
                          <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
                            <span className="text-amber-400 font-bold">PO</span>
                            <span>#{item.po}</span>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 text-xs font-normal print:hidden"
                            onClick={() => { setOpencon(true), getpo(item.po) }}
                          >
                            ลบ PO #{item.po}
                          </Button>
                        </div>
                      )}

                      {/* กล่องป้ายสินค้า (เวลาพิมพ์จะเปลี่ยนเป็นตารางเส้นประพร้อมตัด) */}
                      <div
                        className={`
                    label-card bg-white p-3.5 flex flex-col justify-between
                    border border-slate-200 rounded-xl shadow-sm min-h-[90px]
                    print:border print:border-dashed print:border-gray-500 
                    print:rounded-none print:shadow-none print:box-border
                  `}
                      >
                        <p className="text-sm font-medium text-slate-900 text-center print:text-[13px] print:leading-snug print:font-semibold">
                          {item.name}
                        </p>

                        {item.times_in && (
                          <div className="mt-1 pt-1 border-t border-slate-100 print:border-t print:border-gray-300 flex items-center justify-center text-xs text-gray-500 font-mono print:text-[11px] print:text-black">
                            <span>{new Date(item.times_in).toLocaleDateString("en-CA")}</span>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </main>
          )}

        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center gap-4 text-center py-8 text-zinc-400 text-sm"><Loader /> กำลังโหลดข้อมูลสินค้า...</div>
      ) : (
        <Dialog open={open_add_label} onOpenChange={setOpenAddLabel}>
          <DialogContent className="w-250 h-150 flex flex-col overflow-scroll">
            <DialogHeader className="flex flex-row items-center justify-between px-8">
              <DialogTitle>เพิ่ม Label</DialogTitle>
            </DialogHeader>
            <div className="flex gap-3 justify-end">
              <Button variant="destructive" onClick={handleclear}>ล้าง Label</Button>
              <Button onClick={saveproduct} disabled={tableData.length === 0} variant="outline">บันทึก</Button>
            </div>
            <Field>
              <Textarea onPaste={handlePaste} onChange={(e) => processTableData(e.target.value)} id="textarea-message" placeholder="วางข้อมูลสินค้าเข้าจาก ITEC" />
              <Button variant="outline" onClick={() => setOpenDate(true)}>กรุณาเลือกวันที่ด้วยนะครับ <span><CalendarClock /></span></Button>
            </Field>
            <div>
              <div className="grid grid-cols-5 gap-3">
                {tableData.slice(1).map((item, index) => (
                  <div key={index} className="p-2 text-center border rounded-lg shadow-sm text-sm bg-white">
                    <span>
                      <span>{item[4]}</span>
                      <br />
                      {date ? format(date, "yyyy-MM-dd") : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={open_date} onOpenChange={setOpenDate}>
        <DialogContent className={`w-80`}>
          <DialogHeader>
            <DialogTitle>เพิ่มวันที่</DialogTitle>
          </DialogHeader>
          <div className="items-center flex flex-col">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
              captionLayout="dropdown"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setDate(undefined)} variant="destructive">ล้างวันที่</Button>
            <Button onClick={() => setOpenDate(false)} variant="outline">บันทึก</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_con} onOpenChange={setOpencon}>
        <DialogContent className={`w-80`}>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบ Label</DialogTitle>
            <p>หากลบแล้ว <span className="text-red-500 font-bold">ไม่สามารถกู้คืนได้อีก!!</span></p>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpencon(false)} variant="outline">ยกเลิก</Button>
            <Button onClick={() => handleDeletePo(po)} variant="destructive">ลบ</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_conall} onOpenChange={setOpenconall}>
        <DialogContent className={`w-80`}>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบ Label ทั้งหมด</DialogTitle>
            <p>หากลบแล้ว <span className="text-red-500 font-bold">ไม่สามารถกู้คืนได้อีก!!</span></p>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpenconall(false)} variant="outline">ยกเลิก</Button>
            <Button onClick={handleDeleteAll} variant="destructive">ลบ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
