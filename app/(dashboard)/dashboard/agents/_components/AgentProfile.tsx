"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface AgentProfileProps {
  agent: {
    id: number;
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "agent" | "super_admin" | "admin" | "client";
    status: "pending" | "draft" | "approved";
    bio: string | null;
    photoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null; // Add null guard in case agent not found
}

const AgentProfile: React.FC<AgentProfileProps> = ({ agent }) => {
  if (!agent) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Agent not found</p>
        </CardContent>
      </Card>
    );
  }

  const fullName = `${agent.firstName} ${agent.lastName}`;
  // const initials = `${agent.firstName[0]}${agent.lastName[0]}`.toUpperCase();

  const getRoleVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case "super_admin": return "destructive";
      case "admin": return "default";
      case "agent": return "secondary";
      default: return "outline";
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-8 py-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <Avatar className="h-40 w-40 ring-4 ring-background shadow-xl">
              <AvatarImage src={agent.photoUrl || undefined} alt={fullName} />
              <AvatarFallback className="text-4xl bg-primary/10">
                <User className="h-20 w-20" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold">{fullName}</h2>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <Badge variant={getRoleVariant(agent.role)}>
                  {agent.role.replace('_', ' ').toUpperCase()}
                </Badge>
                <Badge variant={getStatusVariant(agent.status)}>
                  {agent.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact & Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg break-all">{agent.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{agent.phoneNumber}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle>About / Bio</CardTitle>
          <CardDescription>
            Professional background and specialties at Vaal Properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          {agent.bio ? (
            <p className="text-base leading-relaxed whitespace-pre-wrap">{agent.bio}</p>
          ) : (
            <p className="text-muted-foreground italic">No bio provided yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Metadata Footer */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Joined:</span>
            <span>{format(new Date(agent.createdAt), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{format(new Date(agent.updatedAt), "MMMM d, yyyy")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentProfile;