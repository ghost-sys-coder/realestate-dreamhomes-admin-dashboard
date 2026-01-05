"use client";
import React, { useState } from 'react'
import { z } from "zod";
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Progress } from '@/components/ui/progress';

import { FieldGroup } from '@/components/ui/field';

import FormBasicInfo from './formSteps/FormBasicInfo';
import FormLocationInfo from './formSteps/FormLocationInfo';
import FormPricingInfo from './formSteps/FormPricingInfo';
import FormImages from './formSteps/FormImages';
import FormAmenitiesInfo from './formSteps/FormAmenitiesInfo';
import FormButtons, { toastErrorStyles } from './FormButtons';
import { toast } from 'sonner';
import FormDetails from './formSteps/FormDetails';
import { generateSlug } from '@/utils/slug';
import { getAxiosError } from '@/utils/error';
import PropertySuccessScreen from './formSteps/PropertySuccessScreen';


interface CreatePropertyFormProps {
  regions: Regions[];
  districts: Districts[];
  locations: Locations[];
}

const steps = [
  "Basic Info",
  "Utilities",
  "Location",
  "Pricing",
  "Amenities",
  "Images & Reviews",
  "Success"
];

export const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  slug: z.string().optional(),
  description: z.string().min(100, { message: "Description must be 100 characters" }),
  type: z.enum(["apartment", "house", "bungalow", "mansion", "office", "condo", "townhouse", "villa", "studio", "penthouse", "commercial", "land", "other",
  ]),
  purpose: z.enum(["rent", "sale", "both"]),

  bedrooms: z.string().min(1, { message: "Bedrooms are required" }),
  bathrooms: z.string().min(1, { message: "Bathrooms are required" }),
  garages: z.string().optional(),
  area: z.string(),
  yearBuilt: z.string().min(1, { message: "Year of construction is required" }),
  floors: z.string().optional(),

  region: z.string().min(3, { message: "Region is required!" }),
  district: z.string().min(3, { message: "District is required" }),
  city: z.string().min(2, { message: "City / Neighbourhood is required!" }),
  neighbourhood: z.string().optional(),
  zipCode: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),

  // programmatically set location ids
  regionId: z.string().optional(),
  districtId: z.string().optional(),
  locationId: z.string().optional(),

  status: z.enum(["active", "pending", "sold", "rented", "draft"]),
  featured: z.boolean(),

  salePrice: z.string(),
  rentPrice: z.string(),
  currency: z.enum(["UGX", "USD", "EUR", "GBP"]),
  rentalPeriod: z.enum(["daily", "weekly", "monthly", "yearly"]),
  negotiable: z.boolean(),

  amenities: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).min(3, { message: "Upload at least 3 images" }),
});

export type PropertySchemaValues = z.infer<typeof formSchema>;


const CreatePropertyForm: React.FC<CreatePropertyFormProps> = ({ regions, districts, locations }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [details, setDetails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "apartment",
      purpose: "rent",
      bathrooms: "",
      area: "",
      bedrooms: "",
      garages: "",
      region: "",
      district: "",
      city: "",
      neighbourhood: "",
      zipCode: "",
      longitude: "",
      latitude: "",
      status: "active",
      featured: false,

      rentPrice: "",
      salePrice: "",
      currency: "UGX",
      rentalPeriod: "daily",
      negotiable: false,

      amenities: [],
      images: []
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
    console.log("button hit", values);
    setIsSubmitting(true);
    try {
      // programmatically set location IDs - regionId, districtId, and locationId
      const regionObj = regions.find(r => r.id === values.region);
      const districtObj = districts.find(d => d.id === values.district);
      const locationObj = locations.find(l => l.id === values.city);

      if (!regionObj || !districtObj || !locationObj) {
        toast.error("Invalid location selection", toastErrorStyles);
        return;
      }


      const formData = new FormData();
      // basic fields
      formData.append("title", values.title);
      formData.append("slug", generateSlug(values.title));
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("purpose", values.purpose);

      // location fields
      formData.append("region", values.region);
      formData.append("district", values.district);
      formData.append("city", values.city);
      if (values.neighbourhood) formData.append("neighbourhood", values.neighbourhood);
      if (values.zipCode) formData.append("zipCode", values.zipCode);
      if (values.longitude) formData.append("longitude", values.longitude);
      if (values.latitude) formData.append("latitude", values.latitude);

      // set location IDs
      formData.append("regionId", regionObj.name);
      formData.append("districtId", districtObj.name);
      formData.append("locationId", locationObj.name);


      // utilities
      formData.append("bedrooms", values.bedrooms);
      formData.append('bathrooms', values.bathrooms);
      formData.append("yearBuilt", values.yearBuilt);
      if (values.area) formData.append("area", values.area);
      if (values.garages) formData.append("garages", values.garages);

      // status fields
      formData.append("featured", String(values.featured));
      formData.append("status", values.status);

      // pricing data
      if (values.salePrice) formData.append("salePrice", values.salePrice);
      if (values.rentPrice) formData.append("rentPrice", values.rentPrice);
      formData.append("currency", values.currency);
      formData.append("rentalPeriod", values.rentalPeriod);
      formData.append("negotiable", String(values.negotiable));

      // amenities
      if (values.amenities) {
        values.amenities.map((option) => formData.append("amenities", option))
      };

      // images
      values.images.map((image) => {
        formData.append("images", image);
      });

      // send data to backend api
      const response = await axios.post(
        "/api/properties/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.status === 201) {
        toast.success("Property successfully added!");
        setCurrentStep(steps.length - 1);
      }

    } catch (error) {
      const message = await getAxiosError(error);
      toast.error(message, toastErrorStyles);
    } finally {
      setIsSubmitting(false);
    }
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
          {currentStep === 2 && <FormDetails form={form} />}
          {currentStep === 3 && <FormPricingInfo form={form} />}
          {currentStep === 4 && (
            <FormAmenitiesInfo form={form}
              details={details}
              setDetails={setDetails}
            />
          )}
          {currentStep === 5 && <FormImages form={form} />}
        </FieldGroup>
        {currentStep === 6 && <PropertySuccessScreen />}
        {currentStep !== steps.length - 1 && (
          <FormButtons
            steps={steps}
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
            form={form}
            handleSubmit={form.handleSubmit(onSubmit)}
            isSubmit={isSubmitting}
          />
        )}
      </form>
    </div>
  )
}

export default CreatePropertyForm