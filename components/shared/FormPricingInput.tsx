import React from 'react'
import { FieldValues, Control, FieldPath, Controller } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormPricingInputProps<T extends FieldValues> {
  control: Control<T>;
  id: string;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  currency: string;
  descLabel?: string;
}

const FormPricingInput = <T extends FieldValues>({ control, name, id, label, placeholder, type ="number", currency, descLabel}: FormPricingInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <div className="flex justify-center items-center gap-3 border rounded-md overflow-hidden bg-gray-400">
            <div className="text-sm px-3 text-white">{currency}</div>
          <Input
            {...field}
            id={id}
            type={type}
            aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className='rounded-none outline-none border-none shadow-none bg-white'
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

export default FormPricingInput