/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadToS3 } from "@/utils/aws-s3";
import { NextRequest, NextResponse } from "next/server";

import { checkRole } from "@/utils/roles";
import { db } from "@/db/drizzle";
import { propertiesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";


export async function POST(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "User is not authorized!"
        }, { status: 401})
    }

    const isAdmin = await checkRole("admin");

    if (!isAdmin) {
        return NextResponse.json({
            success: false,
            message: "User not permitted for this action"
        }, { status: 401 });
    }
    try {
        const formData = await request.formData();
        console.log({ formData });
        const files = formData.getAll("images") as File[];

        // save images to amazon aws and extract urls
        const imageUrls: string[] = [];

        for (const file of files) {
            const result = await uploadToS3(file);
            imageUrls.push(result);
        }

        // validate and extract title
        const titleDescription = formData.get("title") && formData.get("description");
        if (!titleDescription || typeof titleDescription !== "string") {
            return NextResponse.json({
                success: false,
                message: "Property title or description is missing!"
            }, { status: 404 });
        }



        // save data to the neon database
        const [property] = await db.insert(propertiesTable).values([{
            title: formData.get("title") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
            type: formData.get("type") as any,
            purpose: formData.get("purpose") as any,

            salePrice: formData.get("salePrice") ? Number(formData.get("salePrice")) : null,
            rentPrice: formData.get("rentPrice") ? Number(formData.get("rentPrice")) : null,
            currency: formData.get("currency") as any,
            rentalPeriod: formData.get("rentalPeriod") as any,
            negotiable: formData.get("negotiable") === "true",

            region: formData.get("regionId")!.toString(),
            district: formData.get("districtId")!.toString(),
            city: formData.get("locationId")!.toString(),
            neighbourhood: formData.get("neighbourhood")?.toString() || null,
            zipCode: formData.get("zipCode")?.toString() || null,

            regionId: formData.get("region"),
            districtId: formData.get("district"),
            locationId: formData.get("city"),

            latitude: formData.get("latitude") ? Number(formData.get("latitude")) : null,
            longitude: formData.get("longitude") ? Number(formData.get("longitude")) : null,

            status: formData.get("status") as any,
            featured: formData.get("featured") === "false",

            images: imageUrls,

            amenities: formData.getAll("amenities").map(String),

            details: {
                bedrooms: Number(formData.get("bedrooms")),
                bathrooms: Number(formData.get("bathrooms")),
                garages: Number(formData.get("garages")),
                area: Number(formData.get("area")),
                yearBuilt: Number(formData.get("yearBuilt"))
            },

            authorId: userId
        }] as any).returning();

        return NextResponse.json({
            success: true,
            message: "Property has been created successfully!",
            property,
        })
    } catch (error) {
        console.error("Failed to create apartment:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to add apartment"
        })
    }
}