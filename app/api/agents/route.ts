import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/db/drizzle";
import { agentsTable } from "@/db/schema";
import { s3Client } from "@/utils/aws-s3";
import { checkRole } from "@/utils/roles";

// create a new agent
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User is not authorized!",
      },
      { status: 404 }
    );
  }

  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    return NextResponse.json(
      {
        success: false,
        message: "Admin access is required!",
      },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as
      | "super_admin"
      | "admin"
      | "agent"
      | "client";
    const status = formData.get("status") as "draft" | "pending" | "approved";
    const phoneNumber = formData.get("phoneNumber") as string;
    const bio = formData.get("bio")?.toString();
    const file = formData.get("photo") as File | null;

    let photoUrl: string | undefined;

    // upload agent profile to Amazon AWS if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const fileKey = `admin/agents/${Date.now()}-${file.name}`; // unique key
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      });

      await s3Client.send(command);

      photoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    }

    // create user in clerk auth
    const clerkRes = await fetch("https://api.clerk.com/v1/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email_address: [email],
        password,
        public_metadata: { role },
      }),
    });

    if (!clerkRes.ok) {
      const error = await clerkRes.json();
      throw new Error(error.message || "Failed to create clerk user");
    }

    const clerkUser = await clerkRes.json();
    const clerkId = clerkUser.id;

    // Save user into database
    const [agent] = await db
      .insert(agentsTable)
      .values({
        clerkId,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role: role as "super_admin" | "admin" | "agent" | "client",
        status: status as "draft" | "pending" | "approved",
        bio,
        photoUrl,
      })
      .returning();

    if (!agent.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save agent data, try again!",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Agent has been added successfully",
        photoUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create agent:", error);
    return NextResponse.json({
      success: false,
      message: (error as Error).message || "Failed to create agent",
    });
  }
}

// get all agents
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User is not authorized!",
      },
      { status: 404 }
    );
  }
  try {
    const agents = await db.select({}).from(agentsTable);
    if (agents.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No Agents available!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${agents.length} available!`,
      },
      { status: 402 }
    );
  } catch (error) {
    console.error("Failed to get agents", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! check your internet",
      },
      { status: 500 }
    );
  }
}
