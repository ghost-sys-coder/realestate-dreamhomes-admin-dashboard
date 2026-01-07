"use client";

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { toastErrorStyles } from '@/app/(dashboard)/dashboard/properties/new/_components/FormButtons';
import { Input } from '../ui/input';

type DocumentType =
    | "national_id"
    | "passport"
    | "real_estate_license"
    | "employment_contract"
    | "professional_certificate"
    | "proof_of_address"
    | "other";

interface SelectedFile extends File {
    type: DocumentType;
}

const documentTypeLabels: Record<DocumentType, string> = {
    national_id: "National ID",
    passport: "Passport",
    real_estate_license: "Real Estate License",
    employment_contract: "Employment Contract",
    professional_certificate: "Professional Certificate",
    proof_of_address: "Proof of Address",
    other: "Other Document",
};

interface DocumentUploadFormProps {
    agentId: number;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ agentId }) => {
    const [files, setFiles] = useState<SelectedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;

        const pdfFiles = selected.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length !== selected.length) {
            toast.error("Only PDF files are allowed", toastErrorStyles);
            return;
        }

        const newFiles: SelectedFile[] = pdfFiles.map(file => ({
            ...file,
            type: "other" as DocumentType,
        }));

        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const updateFileType = (index: number, type: DocumentType) => {
        setFiles(prev =>
            prev.map((file, i) => (i === index ? { ...file, type } : file))
        );
    };

    const uploadDocuments = async () => {
        if (files.length === 0) {
            toast.error("Please select at least one PDF document", toastErrorStyles);
            return;
        }

        setIsUploading(true);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
            formData.append("types", file.type); // One type per file
        });

        try {
            const res = await fetch(`/api/agents/${agentId}/documents`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Failed to upload documents", toastErrorStyles);
                return;
            }

            toast.success(`${files.length} PDF document(s) uploaded successfully!`);
            setFiles([]);
            // router.push(`/dashboard/agents/${agentId}`);
            // router.refresh();
        } catch (error) {
            console.error("Something went wrong", error);
            toast.error("Network error. Please try again.", toastErrorStyles);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Agent Documents (PDF Only)</CardTitle>
                    <CardDescription>
                        Select PDF documents and assign the correct category for KYC compliance at Vaal Properties.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                        <Button
                            size="lg"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <Upload className="mr-2 h-5 w-5" />
                            Browse PDF Files
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Only PDF files • Multiple selection allowed • Max 15MB each
                        </p>
                    </div>

                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {files.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">
                                Selected PDFs ({files.length})
                            </h3>
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                                >
                                    <FileText className="h-10 w-10 text-primary shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {/* this return NaN MB */}
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <Select
                                        value={file.type}
                                        onValueChange={(value) => updateFileType(index, value as DocumentType)}
                                        disabled={isUploading}
                                    >
                                        <SelectTrigger className="w-64">
                                            <SelectValue placeholder="Select document type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(documentTypeLabels).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeFile(index)}
                                        disabled={isUploading}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={() => router.push(`/dashboard/agents/${agentId}`)}
                    disabled={isUploading}
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    onClick={uploadDocuments}
                    disabled={isUploading || files.length === 0}
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Uploading PDFs...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Upload {files.length} PDF{files.length !== 1 ? 's' : ''}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default DocumentUploadForm;