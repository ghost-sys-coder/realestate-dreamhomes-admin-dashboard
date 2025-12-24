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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/dashboard/SubmitButton';
import { addLocation, getDistricts } from '@/actions/locations';
import { toast } from 'sonner';

interface DistrictsProps {
    id: string;
    name: string;
}

const AddLocationDialog = () => {
    const [open, setOpen] = useState(false);
    const [districts, setDistricts] = useState<DistrictsProps[]>([]);

    useEffect(() => {
        async function fetchDistricts() {
            try {
                const districts = await getDistricts();
                setDistricts(districts);
            } catch (error) {
                console.error("Failed to fetch districts", error);
                toast.error("Failed to fetch districts")
            }
        }
        fetchDistricts();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        const result = await addLocation(formData);

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
                    <Plus className="mr-2 h-4 w-4" /> Add City
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor='location'>Provide new location</Label>
                        <Input id='location' name='location' required
                            placeholder='Add new location...'
                        />
                    </div>
                    <div className="mt-3">
                        <Label htmlFor='districtId' className='mb-2'>Select Corresponding District</Label>
                        <Select name='districtId'>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="District" />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map((district) => (
                                    <SelectItem key={district.id} value={district.id}>
                                        {district.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <SubmitButton buttonText='Add Location' />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddLocationDialog