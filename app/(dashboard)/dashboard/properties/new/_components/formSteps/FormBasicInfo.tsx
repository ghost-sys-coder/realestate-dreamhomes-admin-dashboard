import React from 'react';
import { PropertyFormProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddFormInputComponent from '../formElements/AddFormInputComponent';
import AddFormTextareaComponent from '../formElements/AddFormTextareaComponent';
import AddFormSelect from '../formElements/AddFormSelect';


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

const FormBasicInfo: React.FC<PropertyFormProps> = ({ form }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provide basic information for your property</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <AddFormInputComponent
          control={form.control}
          name='title'
          id='form-rhf-title'
          label='Property Title'
          placeholder="Provide property title..."
        />
        <AddFormTextareaComponent
          id="form-rhf-description"
          name='description'
          control={form.control}
          descLabel='Provide an extensive description...'
          label='Property Description'
        />

        <AddFormSelect
          control={form.control}
          name="type"
          label='Property Type'
          descLabel='Select your property type... ie apartments'
          placeholder='Choose property type'
          options={propertyTypes}
        />
        <AddFormSelect
          control={form.control}
          name="purpose"
          label='Purpose of the property'
          descLabel='Provide a purpose for the property... ie rent'
          placeholder='Choose property purpose'
          options={propertyPurpose}
        />
        
      </CardContent>
    </Card>
  )
}

export default FormBasicInfo