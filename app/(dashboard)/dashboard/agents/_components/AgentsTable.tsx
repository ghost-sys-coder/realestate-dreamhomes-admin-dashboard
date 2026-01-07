"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { View } from "lucide-react";
import Link from "next/link";
import { AgentStatusBadge } from "./AgentStatusBadge";
import React from "react";

interface AgentProps {
    agents: {
        firstName: string;
        lastName: string;
        status: string;
        id: number;
        email: string;
    }[]
}

// const agents = [
//     {
//         id: "1",
//         name: "John Doe",
//         email: "john@example.com",
//         status: "draft",
//     },
//     {
//         id: "2",
//         name: "John Doe",
//         email: "john@example.com",
//         status: "draft",
//     },
//     {
//         id: "3",
//         name: "John Doe",
//         email: "john@example.com",
//         status: "draft",
//     },
// ];

export function AgentsTable({ agents }: AgentProps) {
    return (
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>

            <TableBody>
                {agents.map((agent) => (
                    <TableRow key={agent.id}>
                        <TableCell>{`${agent.firstName} ${agent.lastName}`}</TableCell>
                        <TableCell>{agent.email}</TableCell>
                        <TableCell>
                            <AgentStatusBadge status={agent.status} />
                        </TableCell>
                        <TableCell className="text-right">
                            <Button asChild variant={"secondary"}>
                                <Link
                                    href={`/dashboard/agents/${agent.id}`}
                                    className="text-sm text-primary underline"
                                >
                                    <View className="h-4 w-4 mr-2" />
                                    View Agent
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
