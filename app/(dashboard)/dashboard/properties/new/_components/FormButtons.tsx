import React from 'react'
import { Button } from '@/components/ui/button'

import { PropertyFormProps } from '@/types'
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const toastErrorStyles = {
    duration: 3000,
    position: 'top-right',
    style: {
        backgroundColor: "red",
        color: "whitesmoke"
    }
} as const

interface FormButtonProps extends PropertyFormProps {
    currentStep: number;
    handleNext?: () => void;
    handlePrev?: () => void;
    steps: string[];
    handleSubmit?: () => void;
    isSubmit: boolean;
}

const FormButtons: React.FC<FormButtonProps> = ({
    form, currentStep, handleNext,
    handlePrev, steps,
    isSubmit
}) => {
    const purpose = form.watch("purpose");
    const isPurpose = purpose === "both" || purpose === "rent";

    const handleNextStep = async () => {
        let isValid = true;

        if (currentStep === 0) {
            isValid = await form.trigger(["title", "description"]);
        }

        if (currentStep === 1) {
            isValid = await form.trigger(["region", "district", "city", "status"]);
        }

        if (currentStep === 2) {
            isValid = await form.trigger(["bedrooms", "bathrooms", "yearBuilt"]);
        }

        if (currentStep === 3) {
            isValid = isPurpose ? await form.trigger("rentPrice") : await form.trigger("salePrice");
        }

        if (currentStep === 4) {
            // isValid = await form.trigger("amenities");
            const amenities = await form.getValues("amenities");
            if (amenities?.length === 0) {
                toast.error("Choose or add available amenities for your property!", toastErrorStyles);
                return;
            }
        }


        if (!isValid) {
            toast.error("Fix errors before proceeding", toastErrorStyles);
            return;
        }


        handleNext?.();
    }

    return (
        <div className="flex items-center gap-2 my-5">
            {currentStep > 0 && (
                <Button className='w-40 cursor-pointer hover:opacity-60'
                    type="button"
                    onClick={handlePrev}
                >
                    Previous
                </Button>
            )}
            <div className="ml-auto">
                {currentStep < steps.length - 1 ? (
                    <Button
                        type="button"
                        className='w-40 cursor-pointer hover:opacity-60'
                        onClick={handleNextStep}>
                        Next
                    </Button>
                ) : (
                    <Button
                        className='w-40 cursor-pointer hover:opacity-60'
                        type="submit"
                    >
                        {isSubmit ? (
                            <>
                                <Loader2 className='animate-spin' />
                                Saving...
                            </>
                        ) : (<span>Save</span>)}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default FormButtons