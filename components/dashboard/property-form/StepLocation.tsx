import React from 'react'
import { PropertyStepProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormInputComponent from '@/components/shared/FormInputComponent';

interface StepLocationProps extends PropertyStepProps {
  regions: Regions[];
  districts: Districts[];
  locations: Locations[];
}

const StepLocation: React.FC<StepLocationProps> = ({ form, regions, districts, locations }) => {
  const regionId = form.watch("region");
  const districtId = form.watch("district");

  const filteredDistricts = districts.filter(district => district.regionId === regionId);
  const filteredLocations = locations.filter(location => location.districtId === districtId);

  return (
    <Card className='px-4'>
      <CardHeader>
        <CardTitle>Provide Property Address Details</CardTitle>
      </CardHeader>
      <CardContent className='pt-2 space-y-6'>
        <FormInputComponent
          name='region'
          label='Region'
          id='region'
          control={form.control}
          itemType="SelectType"
          descLabel='Provide the region where the property is located'
          selectOptions={regions}
          placeholder='Select Region'
        />
        <FormInputComponent
          name='district'
          label='District'
          id='district'
          control={form.control}
          itemType="SelectType"
          descLabel='Provide the district where the property is located'
          selectOptions={filteredDistricts}
          placeholder='Select District'
        />
        <FormInputComponent
          name='city'
          label='City / Location'
          id='city'
          control={form.control}
          itemType="SelectType"
          descLabel='Provide the city where the property is located'
          selectOptions={filteredLocations}
          placeholder='Select City'
        />
        <FormInputComponent
          name='neighbourhood'
          label='Neighbourhood'
          id='neighbourhood'
          control={form.control}
          itemType="InputType"
          descLabel='Provide the neighbourhood where the property is located'
          placeholder='Enter Neighbourhood'
        />
        <FormInputComponent
          name='zipCode'
          label='Zip Code'
          id='zipCode'
          control={form.control}
          itemType="InputType"
          descLabel='Provide the zip code where the property is located'
          placeholder='Enter Zip Code'
        />
        <FormInputComponent
          name='latitude'
          label='Latitude'
          id='latitude'
          control={form.control}
          itemType="InputType"
          descLabel='Provide the latitude where the property is located'
          placeholder='Enter Latitude'
        />
        <FormInputComponent
          name='longitude'
          label='Longitude'
          id='longitude'
          control={form.control}
          itemType="InputType"
          descLabel='Provide the longitude where the property is located'
          placeholder='Enter Longitude'
        />
      </CardContent>
    </Card>
  )
}

export default StepLocation