"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { PropertyFormProps } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddFormMultiselect from '../formElements/AddFormMultiselect';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface FormAmenitiesProps extends PropertyFormProps {
  details: string[];
  setDetails: Dispatch<SetStateAction<string[]>>;
}

const amenitiesOptions = [
  { id: "Swimming Pool", name: "Swimming Pool" },
  { id: "Gym", name: "Gym" },
  { id: "Parking", name: "Parking" },
  { id: "Garden", name: "Garden" },
  { id: "Security", name: "Security" },
  { id: "Playground", name: "Playground" },
  { id: "Elevator", name: "Elevator" },
  { id: "Air Conditioning", name: "Air Conditioning" },
  { id: "Furnished", name: "Furnished" },
  { id: "Pet Friendly", name: "Pet Friendly" },
  { id: "Fireplace", name: "Fireplace" },
  { id: "Wheelchair Accessible", name: "Wheelchair Accessible" },
  { id: "Solar Panels", name: "Solar Panels" },
  { id: "Storage Room", name: "Storage Room" },
  { id: "Balcony", name: "Balcony" },
  { id: "24/7 Security", name: "24/7 Security" }
]


const FormAmenitiesInfo: React.FC<FormAmenitiesProps> = ({ form, details, setDetails }) => {
  const [inputValue, setInputValue] = useState("");

  // fix this function
  const handleAddDetails = () => {
    const value = inputValue.trim();

    if (!value) return;

    const currentAmenities = form.getValues("amenities") || [];

    const isExisting = currentAmenities.includes(value) || amenitiesOptions.some(
      (option) => option.name.toLowerCase() === value.toLowerCase()
    )

    if (isExisting) {
      toast.error(`${value} already exists!`);
      return;
    }

    setDetails(prev => [...prev, value]);

    form.setValue("amenities", [...currentAmenities, value], {
      shouldValidate: true
    });

    setInputValue("");
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDetails();
    }
  }

  // handle remove amenitiy
  const handleRemove = (value: string) => {
    const newDetails = details.filter(detail => detail !== value);
    setDetails(newDetails);

    const currentAmenities = form.getValues("amenities") || [];

    form.setValue(
      "amenities",
      currentAmenities.filter((option) => option !== value), 
      {shouldValidate: true}
    )
  }

  return (
    <div className='grid gap-2 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <span className="font-medium text-gray-400 text-sm">Select amenities available for your property</span>
        </CardHeader>
        <CardContent>
          <AddFormMultiselect
            control={form.control}
            name="amenities"
            options={amenitiesOptions}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Custom Details</CardTitle>
          <span className="text-sm font-medium text-gray-400">Add your own custom amenities</span>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder='Create a custom amenity...'
              className='flex-1'
              onKeyDown={handleKeyPress}
            />
            <Button
              onClick={handleAddDetails}
              type="submit"
              disabled={!inputValue.trim()}
            >
              <Plus />
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
                    onClick={() => handleRemove(detail)}
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

export default FormAmenitiesInfo