"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AgentVerificationProps {
  status: "pending" | "draft" | "approved";
  agentId: number; // Pass from page if needed for API calls
}

const AgentVerification: React.FC<AgentVerificationProps> = ({ status }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'approved':
        return { variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600', message: 'Agent is fully verified and active.' };
      case 'pending':
        return { variant: 'secondary' as const, icon: AlertCircle, color: 'text-yellow-600', message: 'Verification in progress. Review documents and approve.' };
      case 'draft':
        return { variant: 'outline' as const, icon: XCircle, color: 'text-red-600', message: 'Agent profile is incomplete or rejected.' };
    }
  };

  const { variant, icon: StatusIcon, color, message } = getStatusDetails();

  return (
    <div className="space-y-8">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            Verification Status
          </CardTitle>
          <CardDescription>
            KYC and compliance status for this agent at Vaal Properties
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center py-8">
            <div className={`p-6 rounded-full bg-background ${color}`}>
              <StatusIcon className="h-20 w-20" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <Badge variant={variant} className="text-lg px-6 py-2">
              {status.toUpperCase()}
            </Badge>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{message}</p>
          </div>

          {status !== 'approved' && (
            <>
              <Separator />
              <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="min-w-40">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Approve Agent
                </Button>
                <Button size="lg" variant="destructive" className="min-w-40">
                  <XCircle className="mr-2 h-5 w-5" />
                  Reject / Request Changes
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentVerification;