import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "@/lib/validations/property";

import { PropertySchemaValues } from "@/app/(dashboard)/dashboard/properties/new/_components/CreatePropertyForm";

export interface PropertyStepProps {
    form: UseFormReturn<PropertyFormValues>
}
 
export interface PropertyFormProps {
    form: UseFormReturn<PropertySchemaValues>
}