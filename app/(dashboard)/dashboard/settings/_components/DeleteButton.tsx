"use client";
import React, { useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner';

interface DeleteButtonProps {
    id: string;
    itemName: string;
    itemType: "region" | "district" | "location";
    onDelete: (id: string) => Promise<{ success: boolean; message: string }>
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, itemName, itemType, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
        setIsLoading(true);

        const result = await onDelete(id);

        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setOpen(false);
        }

        setIsLoading(false);
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant={"ghost"} className='bg-red-400 text-white cursor-pointer'>
                    <Trash2 className='h-4 w-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <br />
                        <span className='font-semibold'>{itemName}</span> {itemType}. 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete} disabled={isLoading}
                        className='bg-destructive text-white hover:bg-destructive/60 cursor-pointer'
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteButton