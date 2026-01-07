import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { agentDocumentsTable, agentsTable } from "@/db/schema";
import { s3Client } from "@/utils/aws-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";

// export const runtime = "nodejs"; 


export async function POST(request: NextRequest, ctx: RouteContext<"/api/agents/[agentId]/documents">) {
    const { agentId } = await ctx.params;

    const agentIdNum = Number(agentId);

    try {
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
        const types = formData.getAll("types") as string[];

        if (files.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No files provided"
            }, { status: 400 });
        }

        if (files.length !== types.length) {
            return NextResponse.json({
                success: false,
                message: "Missing document types"
            }, { status: 400})
        }

        const uploadedDocs = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const type = types[i];

            // if (file.type !== "application/pdf") return;

            // if (file.size === 0) return;

            const buffer = Buffer.from(await file.arrayBuffer());
           

            const fileKey = `admin/documents/${agentIdNum}/documents/${Date.now()}-${file.name}`;
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: fileKey,
                Body: buffer,
                ContentType: "application/pdf"
            });

            await s3Client.send(command);

            const documentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
            
            console.log({ documentUrl });

            const [doc] = await db.insert(agentDocumentsTable).values({
                agentId: agentIdNum,
                name: file.name,
                type: type as |"passport" |"real_estate_licence" |"employment_contract"|"professional_certificate"|"proof_of_address"|"other",
                key: fileKey,
                url: documentUrl,
                size: file.size
            }).returning();

            uploadedDocs.push(doc);
        }

        
        return NextResponse.json({
            success: true,
            message: "Agent document has been uploaded",
            uploadedDocs
        }, { status: 200 });
    } catch (error) {
        console.error("Failed to upload document", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        }, { status: 500})
    }
}