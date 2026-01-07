"use client";

import React, { useState, useCallback } from 'react';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddFormInputComponent from '../../properties/new/_components/formElements/AddFormInputComponent';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { toastErrorStyles } from '../../properties/new/_components/FormButtons';
import { Loader2 } from 'lucide-react';
import AddFormSelect from '../../properties/new/_components/formElements/AddFormSelect';
import AddFormTextareaComponent from '../../properties/new/_components/formElements/AddFormTextareaComponent';
import AgentSuccessScreen from './AgentSuccessScreen';


const roles = [
  { name: "agent", id: "agent" },
  { name: "admin", id: "admin" }
]

const status = [
  { name: "pending", id: "pending" },
  { name: "draft", id: "draft" },
  { name: "approved", id: "approved" }
]

export const agentFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  role: z.enum(["admin", "agent"]),
  status: z.enum(["draft", "pending", "approved"]),
  bio: z.string().optional()
  // We'll handle image separately (not in Zod for simplicity – can extend later)
});

export type AgentSchemaValues = z.infer<typeof agentFormSchema>;

const CreateAgentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<AgentSchemaValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "agent",
      status: "approved",
      bio: ""
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  async function onSubmit(values: AgentSchemaValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append("password", values.password);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append("role", values.role);
      formData.append("status", values.status);
      if (values.bio) formData.append("bio", values.bio);
      if (file) formData.append('photo', file);

      // run api
      const res = await fetch("/api/agents", {
        method: "POST",
        body: formData
      });

      console.log(await res.json());

      if (!res.ok) {
        const error = await res.json();
        toast.error("Agent Creation Failed");
        throw new Error(error.message);
      }

      if (res.status === 403) {
        toast.error("Failed to save agent data, try again!", toastErrorStyles);
        return;
      }

      toast.success("Agent created successfully!");
      form.reset();
      setPreview(null);
      setFile(null);
      setSuccess(true);
    } catch (error) {
      toast.error((error as Error).message || "Failed to create agent", toastErrorStyles);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {success ? (
        <AgentSuccessScreen />
      ) : (
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Add New Agent</CardTitle>
            <CardDescription className="text-base">
              Fill in the details to onboard a new agent to Vaal Properties.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32 ring-4 ring-background shadow-lg">
                  <AvatarImage src={preview || undefined} alt="Agent preview" />
                  <AvatarFallback className="bg-muted text-4xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 w-full max-w-md cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
                    }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {isDragActive ? "Drop the image here" : "Drag & drop a profile photo"}
                    </p>
                    <p className="text-xs text-muted-foreground">or click to browse (JPG, PNG)</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <AddFormInputComponent
                  control={form.control}
                  name="firstName"
                  id="form-rhf-firstname"
                  label="First Name"
                  descLabel="Agent's first name"
                  placeholder="John"
                />

                <AddFormInputComponent
                  control={form.control}
                  name="lastName"
                  id="form-rhf-lastname"
                  label="Last Name"
                  descLabel="Agent's last name"
                  placeholder="Doe"
                />

                <AddFormInputComponent
                  control={form.control}
                  name="email"
                  id="form-rhf-email"
                  label="Email Address"
                  descLabel="Professional email for login & communication"
                  placeholder="john.doe@vaalproperties.ug"
                  type="email"
                />

                <AddFormInputComponent
                  control={form.control}
                  name="password"
                  id="form-rhf-password"
                  label="Password"
                  descLabel="Password should be at least 8 characters"
                  placeholder="*******"
                />

                <AddFormInputComponent
                  control={form.control}
                  name="phoneNumber"
                  id="form-rhf-phonenumber"
                  label="Phone Number"
                  descLabel="Include country code (e.g., +256)"
                  placeholder="+256 750 000 000"
                  type="tel"
                />

                <AddFormSelect
                  control={form.control}
                  name="role"
                  label='Assigned Role'
                  descLabel='Agent&apos;s role in Vaal Properties'
                  options={roles}
                  />
                  
                <AddFormSelect
                  control={form.control}
                  name="status"
                  label='Assigned Status'
                  descLabel='Agent&apos;s status in Vaal Properties'
                  options={status}
                />

                <div className="md:col-span-2">
                  <AddFormTextareaComponent
                    control={form.control}
                    name="bio"
                    id='form-rhf-bio'
                    label='Bio'
                    placeholder='Personal Experience...'
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-48"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Agent...
                    </>
                  ) : (
                    "Create Agent"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateAgentForm;