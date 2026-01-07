import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AgentsTable } from "./_components/AgentsTable";
import { getAgents } from "@/actions/agents";

export default async function AgentsPage() {
  const agents = await getAgents();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 justify-center">
          <h1 className="text-2xl font-semibold">Agents</h1>
          <span className="text-sm text-gray-400">Manage your Agents</span>
        </div>

        <Button asChild>
          <Link href="/dashboard/agents/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Link>
        </Button>
      </div>

      <AgentsTable agents={agents} />
    </div>
  );
}
