/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET!;

export async function POST(request: NextRequest) {
    const payload = await request.text();
    const heads = headers();
    const svix_id = (await heads).get("svix-id")!;
    const svix_timestamp = (await heads).get("svix-timestamp")!;
    const svix_signature = (await heads).get("svix-signature")!;

    if (!svix_id || !svix_signature || !svix_timestamp) {
        return new Response("Error: Missing svix headers", { status: 400 });
    }

    const wh = new Webhook(webhookSecret);

    let evt: any;

    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        });
        console.log("Webhook verified successfully:", evt);
    } catch (error: any) {
        console.error("Error verifying Svix webhook:", error.message);
        return new Response("Error: Invalid svix signature", { status: 400 });
    }

    const { id, email_addresses, first_name, last_name, image_url, public_metadata } = evt.data;

    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
        const primaryEmail = email_addresses?.find((e: any) => e.id === evt.data.primary_email_address_id)?.email_address;


        await db.insert(usersTable).values({
            id: id,
            email: primaryEmail,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url, 
            role: public_metadata?.role || "client",
            metadata: public_metadata || {},
            updatedAt: new Date()
        }).onConflictDoUpdate({
            target: usersTable.id,
            set: {
                email: primaryEmail,
                firstName: first_name,
                lastName: last_name,
                imageUrl: image_url,
                role: public_metadata?.role || "client",
                metadata: public_metadata || {},
                updatedAt: new Date()
            }
        })
    } else if(eventType === "user.deleted") {
        await db.delete(usersTable).where(eq(usersTable.id, id));
    }

    return new Response("Webhook processed", { status: 200 });
}