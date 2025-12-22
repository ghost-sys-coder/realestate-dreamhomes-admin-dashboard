import React from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import RegionsTable from './_components/RegionsTable'
import DistrictTable from './_components/DistrictTable'
import CitiesTable from './_components/CitiesTable'
import { db } from '@/db/drizzle'
import { districtsTable, locationsTable, regionsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

// fetch locations data
async function getRegions() {
  const allRegions = await db.select().from(regionsTable);
  return allRegions;
}

async function getDistricts() {
  const allDistricts = await db.select({
        id: districtsTable.id,
        name: districtsTable.name,
        regionName: regionsTable.name
  }).from(districtsTable).innerJoin(regionsTable, eq(districtsTable.regionId, regionsTable.id));
  
  return allDistricts;
}

async function getCities() {
  const allLocations = await db.select({
        id: locationsTable.id,
        name: locationsTable.name,
        districtName: districtsTable.name,
        regionName: regionsTable.name
    }).from(locationsTable)
        .innerJoin(districtsTable, eq(locationsTable.districtId, districtsTable.id))
    .innerJoin(regionsTable, eq(districtsTable.regionId, regionsTable.id));
  
  return allLocations;
}

const SettingsPage = async () => {
  const regions = await getRegions();

  const districts = await getDistricts();

  const cities = await getCities();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <p className="text-muted-foreground pt-2">Manage application configurations and master data</p>
      </div>

      <Tabs defaultValue="locations" className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='locations'>Locations</TabsTrigger>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
        </TabsList>

        <TabsContent value='locations' className='space-y-6'>
          <RegionsTable allRegions={regions} />
          <DistrictTable allDistricts={districts} />
          <CitiesTable allLocations={cities} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage