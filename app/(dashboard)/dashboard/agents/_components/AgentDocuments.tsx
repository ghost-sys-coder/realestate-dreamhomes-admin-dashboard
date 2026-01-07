"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Eye, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  type: 'ID' | 'License' | 'Contract' | 'Certificate' | 'Other';
  uploadedAt: Date;
  status: 'verified' | 'pending' | 'rejected';
  url?: string; // In real app: S3 URL
}

interface AgentDocumentProps {
  agentId: number;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'National ID Card', type: 'ID', uploadedAt: new Date('2025-11-15'), status: 'verified' },
  { id: '2', name: 'Real Estate License', type: 'License', uploadedAt: new Date('2025-12-01'), status: 'verified' },
  { id: '3', name: 'Employment Contract', type: 'Contract', uploadedAt: new Date('2026-01-02'), status: 'pending' },
  { id: '4', name: 'Professional Certificate', type: 'Certificate', uploadedAt: new Date('2025-10-20'), status: 'rejected' },
];

const AgentDocuments: React.FC<AgentDocumentProps> = ({agentId}) => {
  const getStatusVariant = (status: Document['status']): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'verified': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
    }
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'ID': return <AlertCircle className="h-4 w-4" />;
      case 'License': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agent Documents</CardTitle>
              <CardDescription>
                Manage and verify required documents for compliance at Vaal Properties
              </CardDescription>
            </div>
            <Button asChild>
              <Link href={`/dashboard/agents/${agentId}/documents`}>
                <Upload className="mr-2 h-4 w-4" />
              Upload New Document
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {mockDocuments.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No documents uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {mockDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • Uploaded {doc.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusVariant(doc.status)}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents Checklist</CardTitle>
          <CardDescription>Standard documents for all Vaal Properties agents</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {['National ID or Passport', 'Real Estate License', 'Employment Contract', 'Professional Certifications'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDocuments;