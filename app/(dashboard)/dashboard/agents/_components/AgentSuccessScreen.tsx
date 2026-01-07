"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AgentSuccessScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 className="h-20 w-20 text-green-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Agent Added Successfully!</h2>
            <p className="text-muted-foreground max-w-md mb-10">
                Your agent has been added and is now live.
                You can view it in the agents list or add another one.
            </p>

            <div className="flex gap-4 justify-center items-center">
                <Link href="/dashboard/agents">
                    <Button size="lg" className='cursor-pointer'>View Agents</Button>
                </Link>
            </div>
        </div>
    );
};

export default AgentSuccessScreen;