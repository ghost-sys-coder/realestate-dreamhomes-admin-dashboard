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
    const isRentOrBoth = purpose === "both" || purpose === "rent";

    const handleNextStep = async () => {
        let isValid = true;

        switch (currentStep) {
            case 0:
                isValid = await form.trigger(["title", "description"]);
                break;
            case 1:
                isValid = await form.trigger(["region", "district", "city", "status"]);
                break;
            case 2:
                isValid = await form.trigger(["bedrooms", "bathrooms", "yearBuilt"]);
                break;
            case 3:
                if (isRentOrBoth) {
                    isValid = await form.trigger("rentPrice");
                } else {
                    isValid = await form.trigger("salePrice");
                }
                break;
            case 4:
                const amenities = await form.getValues("amenities");
                if (!amenities || amenities.length === 0) {
                    toast.error("Choose or add available amenities for your property!", toastErrorStyles);
                    return;
                }
                break;
            default:
                break;
        }

        if (!isValid) {
            toast.error("Please fix errors before proceeding", toastErrorStyles);
            return;
        }

        handleNext?.();
    }

    const isLastContentStep = currentStep === steps.length - 2;

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
                {isLastContentStep ? (
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
                ) : (
                    <Button
                        type="button"
                        className='w-40 cursor-pointer hover:opacity-60'
                        onClick={handleNextStep}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}

export default FormButtons