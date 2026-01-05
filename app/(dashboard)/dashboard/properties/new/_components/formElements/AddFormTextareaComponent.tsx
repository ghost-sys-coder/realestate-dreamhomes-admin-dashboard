import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';

interface AddFormTextareaProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    descLabel?: string;
    id: string;
    placeholder?: string;
}

const AddFormTextareaComponent = <T extends FieldValues>({ control, name, label, descLabel, id, placeholder}: AddFormTextareaProps<T>) => {
  return (
      <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <span className='text-gray-400 text-sm'>The description provided should be very descriptive...</span>
                    <InputGroup>
                        <InputGroupTextarea
                            {...field}
                            id={id}
                            placeholder={placeholder}
                            rows={6}
                            className='min-h-24 resize-none'
                            aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align={"block-end"}>
                            <InputGroupText className='tabular-nums'>
                                {field.value.length} / 2000 characters
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                        {descLabel}
                    </FieldDescription>
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                </Field>
            )}
        />
  )
}

export default AddFormTextareaComponent