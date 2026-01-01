import React from 'react';

import { getDistricts, getLocations, getRegions } from '@/actions/locations';
import CreatePropertyForm from './_components/CreatePropertyForm';

const page = async () => {
  const [regions, districts, locations] = await Promise.all([
    getRegions(),
    getDistricts(),
    getLocations()
  ]);


  return (
    <div className='w-full'>
      <CreatePropertyForm
        regions={regions}
        districts={districts}
        locations={locations}
      />
    </div>
  )
}

export default page