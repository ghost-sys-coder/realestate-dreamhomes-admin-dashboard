import React from 'react'
import { PropertyFormProps } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AddFormInputComponent from '../formElements/AddFormInputComponent'
import AddFormSelect from '../formElements/AddFormSelect'

const yearsOfConstruction = [
    {name: "2015", id: "2015"},
    {name: "2016", id: "2016"},
    {name: "2017", id: "2017"},
    {name: "2018", id: "2018"},
    {name: "2019", id: "2019"},
    {name: "2020", id: "2020"},
    {name: "2021", id: "2021"},
    {name: "2022", id: "2022"},
    {name: "2023", id: "2023"},
    {name: "2024", id: "2024"},
    {name: "2025", id: "2025"},
]

const FormDetails: React.FC<PropertyFormProps> = ({ form }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Utilities Available</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                <AddFormInputComponent
                    control={form.control}
                    name="bathrooms"
                    id='form-rhf-bath'
                    label='Bathrooms'
                    descLabel='Number of bathrooms available'
                    type="number"
                    placeholder='2'
                />
                <AddFormInputComponent
                    control={form.control}
                    name="bedrooms"
                    id='form-rhf-bed'
                    label='Bedrooms'
                    descLabel='Number of bedrooms available'
                    type="number"
                    placeholder='2'
                />
                <AddFormInputComponent
                    control={form.control}
                    name="garages"
                    id='form-rhf-garage'
                    label='Garage Space'
                    descLabel='Garage Space available'
                    type="number"
                    placeholder='2'
                />
                <AddFormInputComponent
                    control={form.control}
                    name="area"
                    id='form-rhf-area'
                    label='Property Size'
                    placeholder='200 sq.ft'
                    descLabel='Property Size in Square Feet'
                    type="number"
                />
                <AddFormSelect
                    control={form.control}
                    name="yearBuilt"
                    label='Year of Construction'
                    descLabel='Year of Construction is required'
                    placeholder='Year of construction...2024'
                    options={yearsOfConstruction}
                />
            </CardContent>
        </Card>
    )
}

export default FormDetails