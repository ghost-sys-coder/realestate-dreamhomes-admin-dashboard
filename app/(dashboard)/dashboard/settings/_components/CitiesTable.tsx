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
import { Edit, Plus, Trash2 } from 'lucide-react'

interface CitiesTableProps {
    allLocations: {
        id: string;
        name: string;
        districtName: string;
        regionName: string;
    }[];
}

const CitiesTable = async ({ allLocations }: CitiesTableProps) => {
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center gap-2">
                    <CardTitle>Cities / Neighbourhood</CardTitle>
                    <Button size="sm">
                        <Plus className='mr-2 h-4 w-4' /> Add Region
                    </Button>
                </div>
                <CardDescription>Neighbourhoods, suburbs, and towns used in property listings</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your regions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-medium'>City Name</TableHead>
                           <TableHead className='font-medium'>District</TableHead>
                            <TableHead className='font-medium'>Region</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allLocations.map((location) => (
                            <TableRow key={location.id}>
                                <TableCell className='font-medium'>{location.name}</TableCell>
                                <TableCell className='font-medium'>{location.districtName}</TableCell>
                                <TableCell className='font-medium'>{location.regionName}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <Button size="icon" variant={"ghost"} className='bg-green-400 text-white cursor-pointer'>
                                        <Edit className='h-4 w-4' />
                                    </Button>
                                    <Button size="icon" variant={"ghost"} className='bg-red-400 text-white cursor-pointer'>
                                        <Trash2 className='h-4 w-4' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total regions: {allLocations.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}

export default CitiesTable