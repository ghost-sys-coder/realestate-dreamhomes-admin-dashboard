import React from 'react';
import Image from 'next/image';

import { PropertyFormProps } from '@/types';
import { toast } from 'sonner';
import { toastErrorStyles } from '../FormButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, ArrowRight, ImagePlus, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const imageGuidelines = [
  "Use high-quality, well-lit photos that showcase your property",
  "The first image will be used as the main cover photo",
  "Include photos of all rooms, exterior, and key features",
  "Avoid photos with personal information or people",
  "Supported formats: JPG, PNG, WebP (max 5MB each)"
]

const maxFileSize = 5 * 1024 * 1024;

const imageExtensions = ["jpeg", "jpg", "png", "webp"];

const FormImages: React.FC<PropertyFormProps> = ({ form }) => {
  const images = form.watch("images") || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const validFiles: File[] = [];

    for (const file of files) {
      const fileExtension = (file.name.split(".").pop() || "").toLowerCase();

      if (!imageExtensions.includes(fileExtension)) {
        toast.error(`File: ${file.name}, file type not allowed!`);
        return;
      }


      if (file.size > maxFileSize) {
        toast.error(`File: ${file.name} is larger than the required size!`, toastErrorStyles);
        return;
      }

      validFiles.push(file);
    }

    form.setValue("images", [...images, ...validFiles], {
      shouldValidate: true
    });

    e.target.value = "";
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    form.setValue("images", [...updatedImages], { shouldValidate: true })
  }

  // arrow image re-ordering
  const handleMoveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;

    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    form.setValue("images", updated, { shouldValidate: true });
  }
  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-start items-center gap-2 text-lg'>
            <AlertCircle className='h-4 w-5 text-blue-500' />
            <span>Image Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-400">
            {imageGuidelines.map((guideline, index) => (
              <li className="flex gap-2 justify-start items-center" key={index}>
                <span className='h-1 w-1 bg-blue-600 text-white rounded-full' />
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
        <CardContent className='space-y-4'>
          <Label className='flex cursor-pointer justify-center items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-sm text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all'>
            <ImagePlus />
            <span>Select Images</span>
            <Input
              type="file"
              multiple
              accept="image/*"
              className='hidden'
              onChange={handleFileChange}
            />
          </Label>
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div className="relative rounded-lg overflow-hidden border" key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`property-image-${index}`}
                    className='h-40 w-full object-cover'
                    width={100} height={100}
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-sm">
                      Cover
                    </span>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 hover:opacity-100 transition">
                    <Button
                      size={"icon"}
                      variant={"secondary"}
                      disabled={index === 0}
                      onClick={() => handleMoveImage(index, index-1)}
                    >
                      <ArrowLeft />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"secondary"}
                      disabled={index === images.length - 1}
                      onClick={() => handleMoveImage(index, index + 1)}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                  <Button
                    size={"icon"}
                    type='button'
                    className='absolute top-2 right-2 rounded-full cursor-pointer'
                    variant={"destructive"}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className='h-1 w-1 text-white' />
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

export default FormImages