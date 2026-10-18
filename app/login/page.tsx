"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [bracnch_id, getbracnch_id] = useState("");
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bracnch_id.trim()) return;
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bracnch_id: bracnch_id
      })
    })
    const data = await res.json();

    if(res.ok){
      toast.add({ type: "success", description: `เข้าใช้งานสาขา ${data.branch_name}` });
      route.push(`/home`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mb-10 items-center flex flex-col">
        <h1 className="text-4xl font-bold"><span className="text-yellow-500">Easy</span> Label Print</h1>
      </div>
      <div className="border p-6 w-90 rounded-2xl">
        <div className="flex flex-col justify-center items-center">
          <p>กรุณากรอก ID สาขาครับ</p>
          <Field>
            <FieldGroup>
              <form onSubmit={handleLogin}>
                <Field>
                  <FieldLabel htmlFor="username">ID สาขา</FieldLabel>
                  <Input id="username" value={bracnch_id} onChange={(e) => getbracnch_id(e.target.value)} type="text" placeholder="กรุณากรอก ID สาขา" />
                  <FieldDescription>
                    <span className="text-yellow-500">Tips: </span>เพื่อให้ระบบสามารถดึงข้อมูลได้แม่นยำขึ้นครับ ขออภัยที่ทำให้ยุ่งยากนะครับ
                  </FieldDescription>
                  <Button type="submit">เข้าสู้ระบบ</Button>
                </Field>
              </form>
            </FieldGroup>
          </Field>
        </div>
      </div>
    </div>
  )
}

export default page