import React from 'react'

import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { PropertyStepProps } from '@/types';
import FormInputComponent from '@/components/shared/FormInputComponent';


const propertyTypes = [
  { name: "apartment", id: "apartment" }, { name: "house", id: "house" }, { name: "bungalow", id: "bungalow" },
  { name: "mansion", id: "mansion" }, { name: "office", id: "office" }, { name: "condo", id: "condo" },
  { name: "townhouse", id: "townhouse" }, { name: "villa", id: "villa" }, { name: "studio", id: "studio" },
  { name: "penthouse", id: "penthouse" }, { name: "commercial", id: "commercial" }, { name: "land", id: "land" },
  { name: "other", id: "other" }
]

const propertyPurpose = [
  { name: "rent", id: "rent" }, { name: "sale", id: "sale" }, { name: "both", id: "both" }
];

const StepBasicInfo: React.FC<PropertyStepProps> = ({ form }) => {

  return (
    <Card className='px-4'>
      <CardTitle>Provide property basic information</CardTitle>
      <CardContent className='pt-2 space-y-6'>
        <FormInputComponent
          name='title'
          label='Property Title'
          id='apartment-title'
          type='text'
          autoComplete='on'
          control={form.control}
          itemType="InputType"
          placeholder='Property title...'
        />

        <FormInputComponent
          name='description'
          label='Apartment Description'
          id='apartment-description'
          control={form.control}
          placeholder='Property description...'
          descLabel="Provide a comprehensive property description!"
          itemType="TextareaType"
        />

        <FormInputComponent
          name='type'
          label='Property Type'
          id='property-type'
          control={form.control}
          itemType="SelectType"
          descLabel="Select the appropriate type for your property!"
          selectOptions={propertyTypes}
        />
        <FormInputComponent
          name='purpose'
          label='Property Purpose'
          id='property-purpose'
          control={form.control}
          itemType="SelectType"
          descLabel="Select the purpose for this property!"
          selectOptions={propertyPurpose}
        />

      </CardContent>
    </Card>
  )
}

export default StepBasicInfo