"use client";
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { House, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { toast } from '@/components/ui/toast';

const page = () => {
    const [openbranch, setopenbranch] = useState(false);
    const [bracnch, getbracnch] = useState("");
    const [bracnch_name, getbracnch_name] = useState("");

    const handleSaveBranch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!bracnch.trim()) return;
        const req = await fetch(`api/addbranch`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bracnch_name: bracnch_name,
                bracnch_id: bracnch,
            })
        })

        const data = await req.json();
        if(req.ok){
            toast.add({
                type: "success",
                description: "บันทึกข้อมูลสำเร็จ",
              })
        } else {
            toast.add({
              type: "error",
              description: `${data.message}`,
              priority: "high"
            })
          }
        setopenbranch(false);
    };
    return (
        <div>
            <div className='flex items-center justify-center mt-10'>
                <p className='text-2xl'>Admin</p>
            </div>
            <div>
                <Button onClick={() => setopenbranch(true)} className="cursor-pointer">เพิ่มสาขา</Button>
            </div>

            <Dialog open={openbranch} onOpenChange={setopenbranch}>
                <DialogContent className={`w-80`}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex font-bold items-center gap-2">เพิ่มสาขา <span className="text-yellow-500"><House /></span></DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveBranch}>
                        <div className="items-center flex flex-col">
                            <Field>
                                {bracnch}
                                <Input value={bracnch_name} onChange={(e) => { getbracnch_name(e.target.value) }} placeholder="ใส่ ชื่อ สาขา" />
                                <Input value={bracnch} onChange={(e) => { getbracnch(e.target.value) }} placeholder="ใส่ ID สาขา" />
                                <div className="flex gap-3 justify-end">
                                    <Button onClick={() => setopenbranch(false)} variant="outline">ยกเลิก</Button>
                                    <Button type='submit'>เพิ่ม <Plus /></Button>
                                </div>
                            </Field>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default page