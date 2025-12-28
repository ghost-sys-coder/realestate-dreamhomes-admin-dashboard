import React from 'react'
import { PropertyStepProps } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { toast } from 'sonner';


const imageGuidelines = [
  "Use high-quality, well-lit photos that showcase your property",
  "The first image will be used as the main cover photo",
  "Include photos of all rooms, exterior, and key features",
  "Avoid photos with personal information or people",
  "Supported formats: JPG, PNG, WebP (max 5MB each)"
]

interface StepImageReviewsProps extends PropertyStepProps {
  images?: string[];
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const maxFileSize = 5 * 1024 * 1024;

const StepImagesReviews: React.FC<StepImageReviewsProps> = ({ form }) => {
  const images = form.watch("images") || [];

  console.log({ images });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length === 0) return;

    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/*")) {
        toast.error("Check the file type");
        return;
      };
      if (file.size > maxFileSize) {
        toast.error("Image size exceeds required file size");
        return;
      };

      console.log(file);

      validFiles.push(file);
    }

    form.setValue("images", [...images, ...validFiles], {
      shouldValidate: true
    });

    e.target.value = "";
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    form.setValue("images", updatedImages, {
      shouldValidate: true
    })
  }
  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <AlertCircle className='h-5 h-5 text-blue-500' />
            Image Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 text-sm text-gray-600'>
            {imageGuidelines.map((guideline, index) => (
              <li className="flex gap-2 justify-start items-center" key={index}>
                <span className="h-1 w-1 bg-blue-600 text-white rounded-full flex justify-center items-center"></span>
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Property Images</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className="border-2 border-dashed p-10 border-muted-foreground/25 rounded-xl">
            <UploadCloud className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
            <Label className='cursor-pointer relative' htmlFor='file'>
              <span className="text-lg font-medium text-primary hover:underline">Click to upload</span>
              {"or Drag and drop"}
              <Input
                type="file"
                multiple
                id='file'
                accept="image/*"
                className='hidden'
                onChange={handleFileChange}
              />
            </Label>
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG, WebP, up to 10MB each
              </p>
          </div>
          {images.length > 0 && (
            <div className="grid gap-2">
              {images.map((file: File, index: number) => (
                <div className="" key={index}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt='preview image'
                    className='object-cover h-32 w-full'
                    width={100} height={100}
                  />
              </div>
            ))}
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default StepImagesReviews