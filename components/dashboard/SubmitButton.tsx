"use client";
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'


const SubmitButton = ({buttonText}: {buttonText: string}) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className='mt-4 cursor-pointer' disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait...
                </>
            ) : buttonText}
        </Button>
    )
}

export default SubmitButton