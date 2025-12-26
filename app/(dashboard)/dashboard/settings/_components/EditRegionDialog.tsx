"use client";
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/dashboard/SubmitButton';
import { updateRegion } from '@/actions/locations';
import { toast } from 'sonner';

interface EditRegionDialogProps {
    id?: string;
    name: string;
}

const EditRegionDialog: React.FC<EditRegionDialogProps> = ({ name,id }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const result = await updateRegion(formData);

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
                <Button size="icon" variant={"ghost"} className='bg-green-400 text-white cursor-pointer'>
                    <Edit className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action will update your <strong><i>{name}</i></strong> entry in the regions table.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="flex flex-col">
                        <Input id='id' name='id' type='hidden' value={id} className='hidden' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor='name'>Region Name</Label>
                        <Input
                            name='name' id='name'
                            defaultValue={name}
                            placeholder={`Update the ${name} region...`}
                        />
                    </div>
                    <div className="flex justify-end items-center">
                        <SubmitButton buttonText='Save' />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditRegionDialog