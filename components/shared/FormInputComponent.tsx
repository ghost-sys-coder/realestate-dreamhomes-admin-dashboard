import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    id?: string;
    autoComplete?: string;
    descLabel?: string;
    itemType: "InputType" | "TextareaType" | "SelectType";
    selectOptions?: { name: string; id: string; }[];
}

const FormInputComponent = <T extends FieldValues>({
    control, name, label, id, descLabel, itemType,
    placeholder, autoComplete, type = "text",
    selectOptions
}: FormInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    {itemType !== "SelectType" && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

                    {itemType === "SelectType" && (
                        <>
                            <FieldContent>
                                <FieldLabel>{label}</FieldLabel>
                                <FieldDescription>{descLabel}</FieldDescription>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </FieldContent>
                            <Select
                                name={name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id={id}
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-30"
                                >
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    {selectOptions && selectOptions.map((option) => (
                                        <SelectItem className='capitalize' key={option.name} value={option.id}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </>
                    )}
                    {itemType === "TextareaType" && (
                        <Textarea
                            {...field}
                            id={id}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete="on"
                            className='min-h-50'
                        />
                    )}
                    {itemType === "InputType" && (
                        <Input
                            {...field}
                            id={id}
                            type={type}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                        />
                    )}

                    {descLabel && itemType === "TextareaType" && (
                        <FieldDescription>{descLabel}</FieldDescription>
                    )}
                    {itemType !== "SelectType" && fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                </Field>
            )}
        />
    )
}

export default FormInputComponent