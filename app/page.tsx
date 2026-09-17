"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open_add_label, setOpenAddLabel] = useState(false);

  const [tableData, setTableData] = useState<string[][]>([])

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // 1. ดึงข้อความดิบที่ก๊อปปี้มาจาก Clipboard
    const clipboardData = e.clipboardData.getData('text')

    const clean = (val: string) =>
      val ? val.trim().replace(/^[“"”\\]+|[“"”\\]+$/g, '')
        .replace(/F\+/g,'')
        .trim() : '';

    // 2. ตัดบรรทัด (\n) และตัดคอลัมน์ที่คั่นด้วย Tab (\t)
    const rows = clipboardData
      .trim()
      .split('\n')
      .map((row) => row.split('\t').map(clean))
      .filter((row) => row.some((cell) => cell !== ""));
    setTableData(rows)
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
          <DialogHeader>
            <DialogTitle>เพิ่ม Label</DialogTitle>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor="textarea-message">วางข้อมูลจาก ITEC</FieldLabel>
            <Textarea onPaste={handlePaste} id="textarea-message" placeholder="Type your message here." />
          </Field>
          <div>
            <div className="grid grid-cols-5 gap-3">
              {tableData.slice(1).map((item, index) => (
                <div key={index} className="p-2 text-center border rounded-lg shadow-sm text-sm bg-white">
                  {item[4]}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
