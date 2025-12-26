import React from 'react';

import PropertyForm from '@/components/dashboard/PropertyForm';
import { getDistricts, getLocations, getRegions } from '@/actions/locations';

const page = async () => {
  const [regions, districts, locations] = await Promise.all([
    getRegions(),
    getDistricts(),
    getLocations()
  ]);


  return (
    <div className='w-full'>
      <PropertyForm
        regions={regions}
        districts={districts}
        locations={locations}
      />
    </div>
  )
}

export default page