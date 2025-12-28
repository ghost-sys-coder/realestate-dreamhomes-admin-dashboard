"use client";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

import StepBasicInfo from './property-form/StepBasicInfo';
import StepLocation from './property-form/StepLocation';
import StepPricing from './property-form/StepPricing';
import StepDetailsAmenties from './property-form/StepDetailsAmenties';
import { PropertyFormValues, propertySchema } from '@/lib/validations/property';
import { FieldGroup } from '../ui/field';
import StepImagesReviews from './property-form/StepImagesReviews';


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
    const [details, setDetails] = useState<string[]>([]);


    const form = useForm<z.infer<typeof propertySchema>>({
        resolver: zodResolver(propertySchema),
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

    // handle form submission
    const onSubmit = (data: PropertyFormValues) => {
        // combine selected amenitites with custom details
        const allAmenities = [...(data.amenities || []), ...details];
    }


    return (
        <div className="max-w-5xl mx-auto py-5">
            <h1 className="text-3xl font-bold mb-4">Add New Property</h1>
            <Progress className="mb-6" value={(currentStep / steps.length) * 100} />

            <form className="space-x-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    {currentStep === 0 && <StepBasicInfo form={form} />}
                    {currentStep === 1 && <StepLocation
                        form={form}
                        regions={regions}
                        districts={districts}
                        locations={locations}
                    />}
                    {currentStep === 2 && <StepPricing form={form} />}
                    {currentStep === 3 && <StepDetailsAmenties
                        form={form}
                        details={details}
                        setDetails={setDetails}
                    />}
                    {currentStep === 4 && <StepImagesReviews
                        form={form}
                    />}
                </FieldGroup>

                <div className="flex items-center gap-2 my-5">
                    {currentStep > 0 && (
                        <Button className='w-40 cursor-pointer hover:opacity-60' type='button' onClick={handlePrevStep}>Previous</Button>
                    )}


                    <div className="ml-auto">
                        {currentStep < steps.length - 1 ? (
                            <Button className='w-40 cursor-pointer hover:opacity-60' type='button' onClick={handleNextStep}>Next</Button>
                        ) : (
                            <Button className='w-40 cursor-pointer hover:opacity-60' type='submit'>Save</Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PropertyForm