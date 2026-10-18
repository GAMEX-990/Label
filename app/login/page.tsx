"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [bracnch_id, getbracnch_id] = useState("");
  const route = useRouter();
  const [loding, setloding] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setloding(true);
      if (!bracnch_id.trim()) return;
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bracnch_id: bracnch_id
        })
      })
      const data = await res.json();
      if (res.ok) {
        toast.add({ type: "success", description: `เข้าใช้งานสาขา ${data.branch_name}` });
        route.push(`/home`)
      }
    } catch (error) {
      toast.add({ type: "erroe", description: "เกิดข้อผิดพลาดฝั่ง use client" });
    } finally {
      setloding(false);
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
                  <FieldLabel htmlFor="username">ID สาขา (เช่น 1234)</FieldLabel>
                  <Input id="username" value={bracnch_id} onChange={(e) => getbracnch_id(e.target.value)} type="text" placeholder="กรุณากรอก ID สาขา" />
                  <FieldDescription>
                    <span className="text-yellow-500">Tips: </span>เพื่อให้ระบบสามารถดึงข้อมูลได้แม่นยำขึ้น <span className="text-blue-500">"ขออภัยในความไม่สะดวกนะครับ"</span>
                  </FieldDescription>
                  <Button disabled={loding} type="submit">{loding ? <div className="flex items-center"><Spinner /> กำลังเข้าสู่ระบบ...</div> : <div>เข้าสู้ระบบ</div>}</Button>
                </Field>
              </form>
            </FieldGroup>
          </Field>
          <footer className="text-gray-400 text-[10px] mt-4">
            <hr className="w-full text-black" />
            <p>Web Developer: GAMEX.</p>
            <p>GITHUB: GAMEX-990</p>
            <hr className="w-full text-black" />
          </footer>
        </div>
      </div>
    </div>
  )
}

export default page