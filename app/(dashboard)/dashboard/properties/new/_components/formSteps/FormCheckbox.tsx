import React from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form'

interface FormCheckboxProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    id: string;
}

const FormCheckbox = <T extends FieldValues>({ control, name, label, id }: FormCheckboxProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={id}
                            checked={!!field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked === true)
                            }}
                        />
                        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
                    </div>
                    {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}

export default FormCheckbox