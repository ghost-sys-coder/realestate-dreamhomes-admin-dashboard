"use client";
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addDistrict, getRegions } from '@/actions/locations';
import { toast } from 'sonner';
import SubmitButton from '@/components/dashboard/SubmitButton';

interface RegionProps {
    id: string;
    name: string;
}

const AddDistrictDialog = () => {
    const [open, setOpen] = useState(false);
    const [regions, setRegions] = useState<RegionProps[]>([]);

    useEffect(() => {
        async function fetchRegions() {
            try {
                const regions = await getRegions();
                setRegions(regions);
            } catch (error) {
                console.error("Failed to fetch regions", error);
                toast.error("Failed to fetch regions")
            }
        }
        fetchRegions();
    }, []);

    async function handleSubmit(formData: FormData) {
        const result = await addDistrict(formData);

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
                    <Plus className="mr-2 h-4 w-4" /> Add District
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New District</DialogTitle>
                    <form action={handleSubmit}>
                        <div className="flex flex-col gap-4 my-3">
                            <Label htmlFor='name'>District Name</Label>
                            <Input id='name' name='name' required
                                placeholder='Add new district...'
                            />
                        </div>
                        <div className="">
                            <Label htmlFor='region' className='mb-2'>Select Region</Label>
                            <Select name='regionId'>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map((region) => (
                                        <SelectItem key={region.id} value={region.id}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <SubmitButton buttonText='Add District' />
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddDistrictDialog