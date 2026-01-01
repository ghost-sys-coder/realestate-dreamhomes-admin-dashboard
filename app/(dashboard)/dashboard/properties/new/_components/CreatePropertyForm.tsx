"use client";
import React, { useState } from 'react'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Progress } from '@/components/ui/progress';

import { FieldGroup } from '@/components/ui/field';

import FormBasicInfo from './formSteps/FormBasicInfo';
import FormLocationInfo from './formSteps/FormLocationInfo';
import FormPricingInfo from './formSteps/FormPricingInfo';
import FormImages from './formSteps/FormImages';
import FormAmenitiesInfo from './formSteps/FormAmenitiesInfo';
import FormButtons from './FormButtons';


interface CreatePropertyFormProps {
  regions: Regions[];
  districts: Districts[];
  locations: Locations[];
}

const steps = ["Basic Info", "Location", "Pricing", "Amenities", "Images & Reviews"];

export const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be 50 characters" }),
  type: z.enum(["apartment", "house", "bungalow", "mansion", "office", "condo", "townhouse", "villa", "studio", "penthouse", "commercial", "land", "other",
  ]),
  purpose: z.enum(["rent", "sale", "both"]),

  region: z.string().min(3, { message: "Region is required!" }),
  district: z.string().min(3, { message: "District is required" }),
  city: z.string().min(2, { message: "City / Neighbourhood is required!" }),
  neighbourhood: z.string().optional(),
  zipCode: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),

  status: z.enum(["active", "pending", "sold", "rented", "draft"]),
  featured: z.boolean(),

  salePrice: z.number(),
  rentPrice: z.number(),
  currency: z.enum(["UGX", "USD", "EUR", "GBP"]),
  rentalPeriod: z.enum(["daily", "weekly", "monthly", "yearly"]),
  negotiable: z.boolean(),

  images: z.array(z.instanceof(File)).min(3, { message: "Upload at least 3 images" }),
  amenities: z.array(z.string()),

  author: z.string().min(1, { message: "Author is required" })
});

export type PropertySchemaValues = z.infer<typeof formSchema>;


const CreatePropertyForm: React.FC<CreatePropertyFormProps> = ({ regions, districts, locations }) => {
  const [currentStep, setCurrentStep] = useState(4);
  const [details, setDetails] = useState<string[]>([]);

  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "apartment",
      purpose: "rent",
      region: "",
      district: "",
      city: "",
      neighbourhood: "",
      zipCode: "",
      longitude: 0,
      latitude: 0,
      status: "active",
      featured: false,

      rentPrice: 0,
      salePrice: 0,
      currency: "UGX",
      rentalPeriod: "daily",
      negotiable: false,

      images: [],
      amenities: [],
      author: ""
    }
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }

  // 2. Define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className='max-w-5xl mx-auto'>
      <h1 className="text-3xl font-bold mb-4">Add New Property</h1>
      <Progress className='mb-4' value={(currentStep / steps.length) * 100} />

      <form className='space-x-8' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {currentStep === 0 && <FormBasicInfo form={form} />}
          {currentStep === 1 && <FormLocationInfo
            regions={regions}
            districts={districts}
            locations={locations}
            form={form}
          />}
          {currentStep === 2 && <FormPricingInfo form={form} />}
          {currentStep === 3 && (
            <FormAmenitiesInfo form={form}
              details={details}
              setDetails={setDetails}
            />
          )}
          {currentStep === 4 && <FormImages form={form} />}
        </FieldGroup>
        <FormButtons
          steps={steps}
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrev={handlePrev}
          form={form}
          handleSubmit={form.handleSubmit(onSubmit)}
        />
      </form>
    </div>
  )
}

export default CreatePropertyForm