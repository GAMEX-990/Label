"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import Loader from "@/components/ui/loaders";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { format } from "date-fns";
import { BrushCleaning, CalendarClock, ChevronsUp, Divide, Plus, Printer, Save, Tag, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { ProductType } from "./types/product";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function Home() {
  const [po, getpo] = useState(0);
  const [product, setproduct] = useState<ProductType[]>([]);
  const [tableData, setTableData] = useState<string[][]>([])
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const [open_add_label, setOpenAddLabel] = useState(false);
  const [open_add_label_con, setOpenAddLabelcon] = useState(false);
  const [open_date, setOpenDate] = useState(false);
  const [open_con, setOpencon] = useState(false);
  const [open_conall, setOpenconall] = useState(false);
  const [open_print, setOpenprint] = useState(false);

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isLoadingdeletepo, setisLoadingdeletepo] = useState<boolean>(false);
  const [isLoadingdeleteall, setisLoadingdeleteall] = useState<boolean>(false);

  const polist = [...new Set(product.map((item) => item.po))]

  useEffect(() => {
    fetchdata();
  }, [])

  // โหลด Loader2 เฉพาะฝั่งเบราว์เซอร์เท่านั้น ป้องกันปัญหา SSR 100%
  const Loader2 = dynamic(() => import("@/components/ui/labelanimation"), {
    ssr: false,
  });

  const Loadertext = dynamic(() => import("@/components/ui/textrun"), {
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
      setOpenAddLabel(false);
      setTableData([]);
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
    setisLoadingdeletepo(true);
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
      setOpencon(false);
      setisLoadingdeletepo(false);
    }
  };

  const handleDeleteAll = async () => {
    setisLoadingdeleteall(true);
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
      setisLoadingdeleteall(false);
      setOpenconall(false);
    }
  };

  // app/page.tsx

  const handlePrint = () => {
    setOpenprint(false);
    if (!product || product.length === 0) {
      toast.add({
        type: "error",
        description: "ไม่มีรายการสินค้าให้พิมพ์",
      });
      return;
    }
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="flex justify-center items-center gap-4 text-center py-8 text-zinc-400 text-sm"><Loader /></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="lg:flex lg:items-center lg:justify-between lg:mt-10 lg:px-50 p-4 space-y-4">
            <div className="">
              <h1 className="print:hidden flex items-center gap-2 text-2xl font-bold">Easy Label <span className="text-yellow-500 rounded-sm">Print</span><ChevronsUp /></h1>
              <p className="text-sm text-gray-500 print:hidden">version 1.0</p>
            </div>
            <div className="flex print:hidden lg:gap-x-4">
              <Button onClick={() => { setOpenAddLabel(true), setDate(undefined) }} variant="outline">เพิ่ม Label <Plus /></Button>
              <Button onClick={() => setOpenprint(true)} disabled={product.length === 0} variant="outline">PrintLabel <Printer /></Button>
              <Button onClick={() => setOpenconall(true)} disabled={product.length === 0} variant="destructive">ลบ Label ทั้งหมด <Trash /></Button>
            </div>
          </div>
          <hr className="w-full print:hidden" />
          {product.length === 0 ? (
            <div className="flex flex-col justify-center h-screen items-center">
              <div className="flex flex-col items-center justify-center">
                <h1>เพิ่ม Label ได้ที่ปุ่มด้านบน...</h1>
                <Loadertext />
                <Loader2 />
              </div>
            </div>
          ) : (
            <main className="max-w-7xl mx-auto p-4 sm:p-6 print:p-0 print:m-0 print:max-w-none">
              <div className="flex gap-2 mb-4 print:hidden">
                {polist.map((poNum, index) => (
                  <div key={index}>
                    <Button
                      key={poNum}
                      variant="destructive"
                      size="sm"
                      className="h-8 text-xs font-normal"
                      onClick={() => {
                        getpo(poNum);
                        setOpencon(true);
                      }}
                    >
                      ลบ PO #{poNum} <Trash className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 print:grid-cols-4 print:gap-0">
                {product.map((item, index) => {
                  return (
                    <React.Fragment key={item.id || index}>
                      <div
                        className={`
                    label-card bg-white p-2 flex flex-col justify-between
                    border border-slate-200 rounded-xl shadow-sm min-h-[90px]
                    print:border print:border-dashed print:border-gray-500 
                    print:rounded-none print:shadow-none print:box-border
                  `}>
                        <p className="text-sm font-medium text-slate-900 text-center print:text-[13px] print:leading-snug print:font-semibold">
                          {item.name}
                        </p>
                        {item.times_in && (
                          <div className="mt-1 pt-1 border-t border-slate-100 print:border-t print:border-gray-300 flex items-center justify-center text-xs text-gray-500 font-mono print:text-[11px] print:text-black">
                            <span>(PO#{item.po}){new Date(item.times_in).toLocaleDateString("en-CA")}</span>
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
            <DialogHeader>
              <DialogTitle className="text-2xl flex font-bold">เพิ่ม<span className="flex items-center text-yellow-500">Label<Plus /></span></DialogTitle>
            </DialogHeader>
            <div className="lg:flex lg:justify-between lg:items-center space-y-2">
              <div>
                <p><span className="text-yellow-500 font-bold">Tips:</span> <span className="text-gray-500">กดล้าง Label เพื่อล้างช่องและตาราง Label</span></p>
              </div>
              <div className="flex lg:gap-3">
                <Button variant="destructive" onClick={handleclear}>ล้าง Label  <BrushCleaning /></Button>
                <Button variant="outline" onClick={() => setOpenDate(true)}>กรุณาเลือกวันที่ด้วยนะครับ <span><CalendarClock /></span></Button>
                <Button onClick={saveproduct} disabled={tableData.length === 0} variant="outline">บันทึก <Save /></Button>
              </div>
            </div>
            <Field>
              <Textarea onPaste={handlePaste} onChange={(e) => processTableData(e.target.value)} id="textarea-message" placeholder="วางข้อมูลสินค้าเข้าจากแสดงรายการสินค้าเข้าจาก ITEC..." />
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
            <DialogTitle className="text-2xl flex font-bold items-center gap-2">เพิ่มวันที่ <span className="text-yellow-500"><CalendarClock /></span></DialogTitle>
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
            <Button onClick={() => setDate(undefined)} variant="destructive">ล้างวันที่ <BrushCleaning /></Button>
            <Button onClick={() => setOpenDate(false)} variant="outline">บันทึก <Save /></Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_con} onOpenChange={setOpencon}>
        <DialogContent className={`w-90`}>
          <DialogHeader>
            <DialogTitle className="text-xl text-red-500 font-bold">ยืนยันการลบ Label</DialogTitle>
            <p>หากลบแล้ว <span className="text-red-500">ไม่สามารถกู้คืนได้อีก!!</span></p>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpencon(false)} variant="outline">ยกเลิก</Button>
            <Button disabled={isLoadingdeletepo} onClick={() => handleDeletePo(po)} variant="destructive">{isLoadingdeletepo ? (<><Spinner />กำลังลบ...</>) : (<>ลบ</>)}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_conall} onOpenChange={setOpenconall}>
        <DialogContent className={`w-90`}>
          <DialogHeader>
            <DialogTitle className="text-xl text-red-500 font-bold">ยืนยันการลบ Label ทั้งหมด</DialogTitle>
            <p>หากลบแล้ว <span className="text-red-500">ไม่สามารถกู้คืนได้อีก!!</span></p>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpenconall(false)} variant="outline">ยกเลิก</Button>
            <Button disabled={isLoadingdeleteall} onClick={handleDeleteAll} variant="destructive">{isLoadingdeleteall ? (<><Spinner />กำลังลบ...</>) : (<>ลบ</>)}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_print} onOpenChange={setOpenprint}>
        <DialogContent className="w-80 print:hidden">
          <DialogHeader>
            <DialogTitle className="text-xl text-yellow-500">คำแนะนำ</DialogTitle>
          </DialogHeader>
          <div>
            <p>แนะนำปรับขนาดกระดาษเป็น 90% ก่อนปริ้นเพื่อความพอดีของ Label</p>
            <p className="text-blue-500">(หรือตามความเหมาะสมครับ)</p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpenprint(false)} variant="outline">ยกเลิก</Button>
            <Button onClick={handlePrint} variant="default">Print</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={open_add_label_con} onOpenChange={setOpenAddLabelcon}>
        <DialogContent className="w-180 print:hidden">
          <DialogHeader>
            <DialogTitle className="text-xl text-yellow-500">คำแนะนำ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p>สามารถเพิ่ม Label ได้หลายชุดตามใบ PO ได้เลย</p>
              <p className="text-blue-500">(หรือตามความเหมาะสมครับ)</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">ตัวอย่าง</h1>
              <Image
                src="/image/ex1.png"
                width={600}
                height={200}
                alt="ตัวอย่าง"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setOpenAddLabelcon(false)} variant="outline">ยกเลิก</Button>
            <Button onClick={() => { setOpenAddLabelcon(false), setOpenAddLabel(true), setDate(undefined) }} variant="default">เพิ่ม Label <Plus /></Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
