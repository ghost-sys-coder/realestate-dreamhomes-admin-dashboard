"use client";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Progress } from '../ui/progress';
import StepBasicInfo from './property-form/StepBasicInfo';
import StepLocation from './property-form/StepLocation';
import StepPricing from './property-form/StepPricing';
import StepDetailsAmenties from './property-form/StepDetailsAmenties';
import StepImagesRevies from './property-form/StepImagesRevies';
import { PropertyFormValues } from '@/lib/validations/property';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface PropertyFormProps {
    regions: Regions[];
    districts: Districts[];
    locations: Locations[];
}

const steps = ["Basic Info", "Location", "Pricing", "Amenties & Details", "Images & Reviews"];

const PropertyForm: React.FC<PropertyFormProps> = ({ regions, districts, locations }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [details, setDetails] = useState<{ key: string, value: string }[]>([]);

    const form = useForm<PropertyFormValues>({
        defaultValues: {
            title: "",
            description: "",
            type: "apartment",
            purpose: "sale",
            // price info
            salePrice: 0,
            rentPrice: 0,
            currency: "UGX",
            rentalPeriod: "daily",
            negotiable: false,

            // location details
            region: "",
            district: "",
            city: "",
            neighbourhood: "",
            zipCode: "",
            latitude: 0,
            longitude: 0,

            status: "draft",
            featured: false,

            images: [],
            amenities: [],

            author: ""
        }
    });

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    }


    return (
        <div className="max-w-5xl mx-auto py-5">
            <h1 className="text-3xl font-bold mb-4">Add New Property</h1>
            <Progress className="mb-6" value={(currentStep / steps.length) * 100} />

            <form className="space-x-8">
                {currentStep === 0 && <StepBasicInfo />}
                {currentStep === 1 && <StepLocation />}
                {currentStep === 2 && <StepPricing />}
                {currentStep === 3 && <StepDetailsAmenties />}
                {currentStep === 4 && <StepImagesRevies />}

                <Card className='p-6'>
                    <div className="flex items-center gap-2">
                        {currentStep > 0 && (
                            <Button type='button' onClick={handlePrevStep}>Previous</Button>
                        )}


                        <div className="ml-auto">
                            {currentStep < steps.length - 1 ? (
                                <Button type='button' onClick={handleNextStep}>Next</Button>
                            ) : (
                                <Button type='submit'>Save</Button>
                            )}
                        </div>
                    </div>
                </Card>
            </form>
        </div>
    )
}

export default PropertyForm