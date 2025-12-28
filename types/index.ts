import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "@/lib/validations/property";

export interface PropertyStepProps {
    form: UseFormReturn<PropertyFormValues>
}