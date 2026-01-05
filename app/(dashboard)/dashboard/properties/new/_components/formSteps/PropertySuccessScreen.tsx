"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PropertySuccessScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 className="h-20 w-20 text-green-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Property Added Successfully!</h2>
            <p className="text-muted-foreground max-w-md mb-10">
                Your property listing has been created and is now live (or in draft, depending on status).
                You can view it in the properties list or add another one.
            </p>

            <div className="flex gap-4">
                <Link href="/dashboard/properties">
                    <Button size="lg">View Properties</Button>
                </Link>
                <Link href="/dashboard/properties/new">
                    <Button size="lg" variant="outline">Add Another Property</Button>
                </Link>
            </div>
        </div>
    );
};

export default PropertySuccessScreen;