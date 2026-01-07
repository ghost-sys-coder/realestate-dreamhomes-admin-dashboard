import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'
import { Controller, FieldPath, FieldValues, Control } from 'react-hook-form'

interface SelectProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    descLabel?: string;
    placeholder?: string;
    options: { name: string; id: string }[];
}


const AddFormSelect = <T extends FieldValues>({
    control, name, label,
    descLabel, placeholder, options }: SelectProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel>{label}</FieldLabel>
                        {/* <span className="text-sm text-gray-400">Select the most appropriate</span> */}
                    </FieldContent>
                    <Select
                        name={name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {descLabel && (
                        <FieldDescription>{descLabel}</FieldDescription>
                    )}
                </Field>
            )}
        />
    )
}

export default AddFormSelect