import React from 'react'
import { PropertyStepProps } from '@/types'
import FormInputComponent from '@/components/shared/FormInputComponent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormPricingInput from '@/components/shared/FormPricingInput'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const rentPeriods = [
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
  { id: "yearly", name: "Yearly" }
]

const currencyOptions = [
  { id: "UGX", name: "UGX" },
  { id: "USD", name: "USD" },
  { id: "EUR", name: "EUR" },
  { id: "GBP", name: "GBP" }
]

const StepPricing: React.FC<PropertyStepProps> = ({ form }) => {
  const purpose = form.watch("purpose");
  const currency = form.watch("currency");

  const showRentalPrice = purpose === "rent" || purpose === "both";

  return (
    <Card className='px-4'>
      <CardHeader>
        <CardTitle>Provide pricing information</CardTitle>
        <span className='font-semibold text-gray-400 text-sm'>Include rental pricing for rental / sale properties!</span>
      </CardHeader>
      <CardContent className='space-y-6 pt-3'>
        <FormInputComponent
          name="currency"
          label='Currency'
          descLabel='Select pricing currency for the property'
          itemType="SelectType"
          placeholder='Price currency'
          control={form.control}
          selectOptions={currencyOptions}
        />
        <FormPricingInput
          id='salePrice'
          name="salePrice"
          label='Sale Price'
          descLabel='Provide the price for sale properties'
          type="number"
          placeholder='200,000,000'
          control={form.control}
          currency={currency}
        />
        {showRentalPrice && (
          <FormPricingInput
            id='rentPrice'
            name="rentPrice"
            label='Rent Price'
            descLabel='Provide the price for rental properties'
            type="number"
            placeholder='200,000'
            control={form.control}
            currency={currency}
          />
        )}
        {showRentalPrice && (
          <FormInputComponent
            name="rentalPeriod"
            label='Rental Period'
            itemType="SelectType"
            placeholder='Rental Period'
            control={form.control}
            selectOptions={rentPeriods}
          />
        )}
        <div className="flex items-center gap-2">
          <Checkbox
            id='negotiable'
            checked={form.watch("negotiable")}
            onCheckedChange={(checked) => form.setValue("negotiable", checked as boolean)}
            className='cursor-pointer'
          />
          <Label htmlFor="negotiable" className='cursor-pointer'>Price is negotiable</Label>
        </div>
      </CardContent>
    </Card>
  )
}

export default StepPricing