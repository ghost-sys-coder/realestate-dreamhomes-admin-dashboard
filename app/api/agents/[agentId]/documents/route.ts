import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { agentDocumentsTable, agentsTable } from "@/db/schema";
import { s3Client } from "@/utils/aws-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";


export async function POST(request: NextRequest, ctx: RouteContext<"/api/agents/[agentId]/documents">) {
    const { agentId } = await ctx.params;
    console.log({ agentId });
    try {
        const formData = await request.formData();

        
        return NextResponse.json({
            success: true,
            message: "Agent document has been uploaded",
            formData
        }, { status: 200 });
    } catch (error) {
        console.error("Failed to upload document", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        }, { status: 500})
    }
}

export async function GET(request: NextRequest, { params }: { params: { agentId: string}}) {
    try {
        const { agentId } = params;
        const agentIdNum = Number(agentId);

        // check if the agent exists;
        const agent = await db.select().from(agentsTable).where(eq(agentsTable.id, agentIdNum)).limit(1);

        if (agent.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Agent not found!"
            }, { status: 404 });
        }

        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (files.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No files provided"
            }, { status: 400 });
        }

        const uploadedDocs = [];

        for (const file of files) {
            if (file.size === 0) return;

            const buffer = Buffer.from(await file.arrayBuffer());
            const fileKey = `admin/agents/${agentIdNum}/documents/${Date.now()}-${file.name}`;
            const command = await new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: fileKey,
                Body: buffer,
                ContentType: file.name
            });

            await s3Client.send(command);

            const documentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

            const [doc] = await db.insert(agentDocumentsTable).values({
                agentId: agentIdNum,
                name: file.name,
                type: "other" as const,
                key: fileKey,
                url: documentUrl,
            }).returning();

            uploadedDocs.push(doc);
        }

    } catch (error) {
        console.error("Failed to upload agent document", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        }, { status: 500 });
    }
}