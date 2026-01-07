import { UseFormReturn } from "react-hook-form";


import { PropertySchemaValues } from "@/app/(dashboard)/dashboard/properties/new/_components/CreatePropertyForm";

import { AgentSchemaValues } from "@/app/(dashboard)/dashboard/agents/_components/CreateAgentForm";
 
export interface PropertyFormProps {
    form: UseFormReturn<PropertySchemaValues>;
}

export interface AgentFormProps {
    form: UseFormReturn<AgentSchemaValues>;
}