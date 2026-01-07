"use server";

import { db } from "@/db/drizzle";
import { agentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// get all agents
export async function getAgents() {
  try {
    const agents = await db
      .select({
        id: agentsTable.id,
        firstName: agentsTable.firstName,
        lastName: agentsTable.lastName,
        email: agentsTable.email,
        status: agentsTable.status,
      })
      .from(agentsTable);

    return agents;
  } catch {
    return [];
  }
}

// get single agent
export async function getSingleAgent(id: number) {
  const [agent] = await db
    .select({
      id: agentsTable.id,
      clerkId: agentsTable.clerkId,
      firstName: agentsTable.firstName,
      lastName: agentsTable.lastName,
      email: agentsTable.email,
      phoneNumber: agentsTable.phoneNumber,
      role: agentsTable.role,
      status: agentsTable.status,
      bio: agentsTable.bio,
      photoUrl: agentsTable.photoUrl,
      createdAt: agentsTable.createdAt,
      updatedAt: agentsTable.updatedAt,
    })
    .from(agentsTable)
    .where(eq(agentsTable.id, id));

  return agent ?? null;
}
