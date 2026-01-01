import React from 'react'

import { PropertyFormProps } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AddFormSelect from '../formElements/AddFormSelect'
import AddFormPricingComponent from '../formElements/AddFormPricingComponent'

const currencies = [
  { name: "UGX", id: "UGX" },
  { name: "USD", id: "USD" },
  { name: "EUR", id: "EUR" },
  { name: "GPB", id: "GPB" }
]

const rentalPeriods = [
  { name: "daily", id: "daily" }, { name: "weekly", id: "weekly" },
  { name: "monthly", id: "monthly" }, { name: "yearly", id: "yearly" }
]

const FormPricingInfo: React.FC<PropertyFormProps> = ({ form }) => {
  const selectedCurrency = form.watch("currency");
  const purpose = form.watch("purpose");

  const isPurpose = purpose === "rent" || purpose === "both";


  return (
    <Card>
      <CardHeader>
        <CardTitle>Provide pricing information for your property</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <AddFormSelect
          control={form.control}
          name="currency"
          label='Select Price Currency'
          descLabel='Provide your preferred billing currency'
          placeholder='Currency ie UGX or USD'
          options={currencies}
        />
        <AddFormPricingComponent
          currency={selectedCurrency}
          control={form.control}
          name="salePrice"
          label='Sale Price'
          placeholder={`Sale price.... ${selectedCurrency} 200,000,000`}
          id='form-rhf-price'
          descLabel='Sale Price for apartments up for sale'
        />
        {isPurpose && (
          <>
            <AddFormSelect
              control={form.control}
              name="rentalPeriod"
              label='Select Rental Period'
              descLabel='Provide your most prefered rental period'
              placeholder='Rental period.... ie daily'
              options={rentalPeriods}
            />
            <AddFormPricingComponent
              currency={selectedCurrency}
              control={form.control}
              name="rentPrice"
              label='Rental Price'
              placeholder={`Sale price.... ${selectedCurrency} 200,000`}
              id='form-rhf-rent'
              descLabel='Rental Price for properties up for rent'
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default FormPricingInfo