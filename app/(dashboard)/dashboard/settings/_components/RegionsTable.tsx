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

import AddRegionalDialog from './AddRegionalDialog'
import DeleteButton from './DeleteButton';
import { deleteRegion } from '@/actions/locations';
import EditRegionDialog from './EditRegionDialog';

interface RegionsTableProps {
    allRegions: {
        id: string;
        name: string;
    }[];
}

const RegionsTable = ({ allRegions }: RegionsTableProps) => {

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center gap-2">
                    <CardTitle>Regions</CardTitle>
                    <AddRegionalDialog />
                </div>
                <CardDescription>Manage regions → districts → cities. Use these for consistent property addressing</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your regions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Region</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allRegions.map((region) => (
                            <TableRow key={region.id}>
                                <TableCell className='font-medium'>{region.name}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <EditRegionDialog id={region.id} name={region.name} />
                                    <DeleteButton
                                        id={region.id}
                                        itemName={region.name}
                                        itemType="region"
                                        onDelete={() => deleteRegion(region.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total regions: {allRegions.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}

export default RegionsTable