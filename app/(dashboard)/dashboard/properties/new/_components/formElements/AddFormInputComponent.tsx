import React from 'react'
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface AddFormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    id: string;
    label?: string;
    placeholder?: string;
    descLabel?: string
    type?: React.HTMLInputTypeAttribute;
}

const AddFormInputComponent = <T extends FieldValues>({
    control, name, label,
    placeholder, id, type = "text" }: AddFormInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <Input
                        {...field}
                        type={type}
                        id={id}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete="on"
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}

export default AddFormInputComponent