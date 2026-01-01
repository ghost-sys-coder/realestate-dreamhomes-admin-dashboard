import React from 'react'
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox';
import { FieldError, FieldLabel, Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label';


interface MultiSelectOption {
    name: string;
    id: string;
}

interface FormMultiselectProps<T extends FieldValues>{
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    options: MultiSelectOption[];
}

const AddFormMultiselect = <T extends FieldValues>({control, name, label, options}: FormMultiselectProps<T>) => {
  return (
      <Controller
          name={name}
          control={control}
          render={({ fieldState, field }) => {
              const value: string[] = field.value ?? [];

              const toggleValue = (optionId: string) => {
                  if (value.includes(optionId)) {
                      field.onChange(value.filter((v) => v !== optionId))
                  } else {
                      field.onChange([...value, optionId])
                  }
              };

              return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className=''>{label}</FieldLabel>
                      <span className='text-gray-400 text-sm'>Select all that apply.</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                          {options.map((option) => (
                              <Label key={option.id} className='flex gap-2 items-center cursor-pointer'>
                                  <Checkbox
                                      checked={value.includes(option.id)}
                                      onCheckedChange={() => toggleValue(option.id)}
                                  />
                                  <span className='text-sm text-gray-400 font-medium'>{option.name}</span> 
                              </Label>
                          ))}
                      </div>
                      {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                      )}
                  </Field>
              )
          }}
      />
  )
}

export default AddFormMultiselect;