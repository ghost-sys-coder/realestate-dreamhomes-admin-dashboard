import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyFormProps } from '@/types';
import AddFormSelect from '../formElements/AddFormSelect';
import AddFormInputComponent from '../formElements/AddFormInputComponent';
import FormCheckbox from './FormCheckbox';


const status = [
  { name: "active", id: "active" }, { name: "pending", id: "pending" }, { name: "sold", id: "sold" }, { name: "rented", id: "rented" }, { name: "draft", id: "draft" }
]

interface FormLocationProps extends PropertyFormProps {
  regions: Regions[];
  districts: Districts[];
  locations: Locations[];
}

const FormLocationInfo: React.FC<FormLocationProps> = ({ regions, districts, locations, form }) => {
  const regionId = form.watch("region");
  const districtId = form.watch("district");

  const filteredDistricts = districts.filter(district => district.regionId === regionId);
  const filteredLocations = locations.filter(location => location.districtId === districtId);


  return (
    <Card className='px-4'>
      <CardHeader>
        <CardTitle>Provide Property Location details</CardTitle>
      </CardHeader>
      <CardContent className='pt-2 space-y-6'>
        <AddFormSelect
          control={form.control}
          name="region"
          label="Property Region"
          descLabel='Region is required'
          placeholder='Choose Region'
          options={regions}
        />
        <AddFormSelect
          control={form.control}
          name="district"
          label="Property District"
          descLabel='District is required'
          placeholder='Choose District'
          options={filteredDistricts}
        />
        <AddFormSelect
          control={form.control}
          name="city"
          label="Provide City location"
          descLabel='City is required'
          placeholder='Choose City / Neighbourhood'
          options={filteredLocations}
        />

        <AddFormInputComponent
          control={form.control}
          name='neighbourhood'
          label='Neighbourhood'
          descLabel='Neighbourhood in which the property is located'
          id='form-rhf-title'
          placeholder='Neighbourhood... ie Kololo'
        />
        <AddFormInputComponent
          control={form.control}
          name="zipCode"
          label='Zip Code'
          descLabel='Provide zip code if available...'
          id='form-rhf-zipcode'
          placeholder='zipcode.... ie 00256'
        />
        <AddFormInputComponent
          control={form.control}
          name="longitude"
          label='Longitude'
          descLabel='Longitude codes if available...'
          id='form-rhf-longitude'
          placeholder="longitude..."
          type="number"
        />
        <AddFormInputComponent
          control={form.control}
          name="latitude"
          label='Latitude'
          descLabel='Latitude codes if available...'
          id='form-rhf-latitude'
          placeholder="latitude..."
          type="number"
        />
        <AddFormSelect
          control={form.control}
          name="status"
          label="Select property status"
          descLabel='Status is required'
          placeholder='Choose appropriate status'
          options={status}
        />

        <FormCheckbox
          control={form.control}
          name="featured"
          label='Mark as a Featured Property'
          id='form-rhf-featured'
        />
      </CardContent>
    </Card>
  )
}

export default FormLocationInfo