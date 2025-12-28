import React, { SetStateAction, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { PropertyStepProps } from '@/types'
import FormMultiselect from '@/components/shared/FormMultiselect'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'


const amenities = [
  { id: "Swimming Pool", name: "Swimming Pool" },
  {id: "Gym", name: "Gym"},
  {id: "Parking", name: "Parking"},
  {id: "Garden", name: "Garden"},
  {id: "Security", name: "Security"},
  {id: "Playground", name: "Playground"},
  {id: "Elevator", name: "Elevator"},
  {id: "Air Conditioning", name: "Air Conditioning"},
  {id: "Furnished", name: "Furnished"},
  {id: "Pet Friendly", name: "Pet Friendly"},
  {id: "Fireplace", name: "Fireplace"},
  {id: "Wheelchair Accessible", name: "Wheelchair Accessible"},
  {id: "Solar Panels", name: "Solar Panels"},
  {id: "Storage Room", name: "Storage Room"},
  {id: "Balcony", name: "Balcony"},
  {id: "24/7 Security", name: "24/7 Security"}
]

interface StepDetailsProps extends PropertyStepProps {
  details: string[];
  setDetails: React.Dispatch<SetStateAction<string[]>>;
}

const StepDetailsAmenties: React.FC<StepDetailsProps> = ({ form, details, setDetails }) => {
  const [inputValue, setInputValue] = useState("");
  const propertyAmenities = form.watch("amenities");

  const handleAddDetails = () => {
    if (inputValue.trim() && !details.includes(inputValue.trim()) && !propertyAmenities.includes(inputValue.trim())) {
      const newDetails = [...details, inputValue.trim()];
      setDetails(newDetails);
      setInputValue("");
    }

    toast.error("Amenity available!", {
      position: "top-right",
      duration: 3000,
      style: {
        backgroundColor: "red",
        color: "whitesmoke"
      }
    });
  }

  const handleRemoveDetails = (detail: string) => {
    const newDetails = details.filter((value) => value !== detail);
    setDetails(newDetails);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDetails();
    }
  }

  return (
    <div className='grid gap-2 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <span className="font-medium text-gray-400 text-sm">Select amenities available in the property</span>
        </CardHeader>
        <CardContent>
          <FormMultiselect
            control={form.control}
            name="amenities"
            options={amenities}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium mb-4'>Custom Details</CardTitle>
          <span className="text-sm font-medium text-gray-400">Add your own custom amenities</span>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Create a custom amenity...'
              className='flex-1'
              onKeyDown={handleKeyPress}
            />
            <Button
              type='submit'
              disabled={!inputValue.trim()}
              onClick={handleAddDetails}
            >
              Add
            </Button>
          </div>

          {details.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {details.map((detail, index) => (
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md text-sm" key={index}>
                  <span>{detail}</span>
                  <Button
                    size={"icon"}
                    className='text-gray-500 hover:text-gray-700 cursor-pointer'
                    onClick={() => handleRemoveDetails(detail)}
                  >
                    <X className='h-2 w-2' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default StepDetailsAmenties