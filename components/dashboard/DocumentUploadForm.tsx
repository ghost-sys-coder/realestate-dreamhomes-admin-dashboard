"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type DocumentType =
    | "national_id"
    | "passport"
    | "real_estate_license"
    | "employment_contract"
    | "professional_certificate"
    | "proof_of_address"
    | "other";

interface FileWithPreview extends File {
    preview?: string;
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
    agentName?: string;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ agentId }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const onDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            ...file,
            preview: URL.createObjectURL(file),
            type: "other" as DocumentType, // default
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
        },
        maxSize: 15 * 1024 * 1024, // 15MB
        multiple: true,
    });

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        // Revoke preview URL
        if (files[index]?.preview) {
            URL.revokeObjectURL(files[index].preview!);
        }
    };

    const updateFileType = (index: number, type: DocumentType) => {
        setFiles((prev) =>
            prev.map((file, i) => (i === index ? { ...file, type } : file))
        );
    };

    const uploadDocuments = async () => {
        if (files.length === 0) {
            toast.error("Please select at least one document");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
            formData.append("types", file.type);
        });


        try {
            const res = await fetch(`/api/agents/${agentId}/documents`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Upload failed");

            console.log({ data });

            toast.success(`${files.length} document(s) uploaded successfully!`);
            //   setFiles([]);
            //   router.push(`/agents/${agentId}`);
            //   router.refresh();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Select & Categorize Documents</CardTitle>
                    <CardDescription>
                        Drag and drop files or click to browse. Assign correct document type for compliance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30"
                            } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">
                            {isDragActive ? "Drop files here" : "Drag & drop documents here"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            PDF, PNG, JPG • Max 15MB each • Multiple files supported
                        </p>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold text-lg">Selected Files ({files.length})</h3>
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30">
                                    <FileText className="h-10 w-10 text-primary" />
                                    <div className="flex-1">
                                        <p className="font-medium truncate max-w-md">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <Select
                                        value={file.type}
                                        onValueChange={(value) => updateFileType(index, value as DocumentType)}
                                    >
                                        <SelectTrigger className="w-64">
                                            <SelectValue />
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
                            Uploading...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Upload {files.length} Document{files.length !== 1 ? 's' : ''}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default DocumentUploadForm;