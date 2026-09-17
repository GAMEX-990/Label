"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, Tag } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [open_add_label, setOpenAddLabel] = useState(false);
  const [open_date, setOpenDate] = useState(false);
  const [tableData, setTableData] = useState<string[][]>([])

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // 1. ดึงข้อความดิบที่ก๊อปปี้มาจาก Clipboard
    const clipboardData = e.clipboardData.getData('text')

    const clean = (val: string) =>
      val ? val.trim().replace(/^[“"”\\]+|[“"”\\]+$/g, '')
        .replace(/F\+/g, '')
        .trim() : '';

    // 2. ตัดบรรทัด (\n) และตัดคอลัมน์ที่คั่นด้วย Tab (\t)
    const rows = clipboardData
      .trim()
      .split('\n')
      .map((row) => row.split('\t').map(clean))
      .filter((row) => row.some((cell) => cell !== ""));
    setTableData(rows)
    console.log(rows)
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between mt-10 px-50">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">Easy Label Print<span className="text-sm text-gray-500"><Tag /></span></h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setOpenAddLabel(true)} variant="outline">เพิ่ม Label</Button>
            <Button variant="destructive">ลบ Label ทั้งหมด</Button>
          </div>
        </div>
        <hr className="w-full" />
      </div>
      <Dialog open={open_add_label} onOpenChange={setOpenAddLabel}>
        <DialogContent className="w-250 h-150 flex flex-col overflow-scroll">
          <DialogHeader className="flex flex-row items-center justify-between px-8">
            <DialogTitle>เพิ่ม Label</DialogTitle>
            <Button className={`${tableData.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={tableData.length === 0 || date === undefined} variant="outline">บันทึก</Button>
          </DialogHeader>
          <Field>
            <Textarea onPaste={handlePaste} id="textarea-message" placeholder="วางข้อมูลสินค้าเข้าจาก ITEC" />
            <Button variant="outline" onClick={() => setOpenDate(true)}>กรุณาเลือกวันที่ด้วยนะครับ <span><CalendarClock /></span></Button>
          </Field>
          <div>
            <div className="grid grid-cols-5 gap-3">
              {tableData.slice(1).map((item, index) => (
                <div key={index} className="p-2 text-center border rounded-lg shadow-sm text-sm bg-white">
                  <span>
                    <span className={`${item}`}>{item[4]}</span>
                    <br />
                    {date?.toISOString().split("T")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open_date} onOpenChange={setOpenDate}>
        <DialogContent className={`w-80`}>
          <DialogHeader className="flex flex-row items-center justify-between px-8">
            <DialogTitle>เพิ่มวันที่</DialogTitle>
            <Button variant="outline">บันทึก</Button>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
