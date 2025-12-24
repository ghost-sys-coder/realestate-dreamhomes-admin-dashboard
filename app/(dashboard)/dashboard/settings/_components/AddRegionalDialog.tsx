"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addRegion } from '@/actions/locations';
import { toast } from 'sonner';
import SubmitButton from '@/components/dashboard/SubmitButton';

const AddRegionalDialog = () => {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        const result = await addRegion(formData);

        if (!result.success) {
            toast.error(result.message);
            return;
        } else {
            toast.success(result.message);
            setOpen(false);
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Region
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Region</DialogTitle>
                    <form action={handleSubmit}>
                        <div className="flex flex-col gap-4 my-3">
                            <Label htmlFor='name'>Region Name</Label>
                            <Input id='name' name='name' required
                                placeholder='Add new region...Central'
                            />
                        </div>
                        <SubmitButton buttonText='Add Region' />
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddRegionalDialog