import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react'
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form'

interface FormPricingProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    descLabel?: string;
    id: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    currency: string;
}

const AddFormPricingComponent = <T extends FieldValues>({control, name, label, descLabel, id, placeholder, type="text", currency}: FormPricingProps<T>) => {
  return (
      <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={id}>{label}</FieldLabel>
                  <div className="flex gap-1 justify-center items-center bg-gray-300 rounded-md overflow-hidden p-0 shadow">
                      <div className="px-2 text-white">{currency}</div> 
                      <Input
                          {...field}
                          type={type}
                          id={id}
                          aria-invalid={fieldState.invalid}
                          placeholder={placeholder}
                          autoComplete='on'
                          className='rounded-none border-none outline-none shadow-none bg-white'
                      />
                  </div>
                  {descLabel && (
                      <FieldDescription>{descLabel}</FieldDescription>
                  )}
                  {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
          )}
      />
  )
}

export default AddFormPricingComponent