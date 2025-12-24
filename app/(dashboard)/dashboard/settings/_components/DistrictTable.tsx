
"use client";

import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import AddDistrictDialog from './AddDistrictDialog'
import DeleteButton from './DeleteButton'
import { deleteDistrict } from '@/actions/locations'

interface DistrictTableProps {
    allDistricts: {
        id: string;
        name: string;
        regionName: string;
    }[];
}

const DistrictTable = ({allDistricts}: DistrictTableProps) => {
    
  return (
      <Card>
          <CardHeader>
              <div className="flex justify-between items-center gap-2">
                  <CardTitle>Districts</CardTitle>
                  <AddDistrictDialog />
              </div>
              <CardDescription>Districts grouped by regions</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableCaption>Districts</TableCaption>
                  <TableHeader>
                      <TableRow>
                          <TableHead>District Name</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {allDistricts.map((district) => (
                          <TableRow key={district.id}>
                              <TableCell>{district.name}</TableCell>
                              <TableCell>{district.regionName}</TableCell>
                              <TableCell className='flex gap-2'>
                                    <Button size="icon" variant={"ghost"} className='bg-green-400 text-white cursor-pointer'>
                                        <Edit className='h-4 w-4' />
                                    </Button>
                                  <DeleteButton
                                      id={district.id}
                                      itemName={district.name}
                                      itemType="district"
                                      onDelete={() => deleteDistrict(district.id)}
                                  />
                                </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total districts: {allDistricts.length}</TableCell>
                        </TableRow>
                    </TableFooter>
              </Table>
          </CardContent>
    </Card>
  )
}

export default DistrictTable