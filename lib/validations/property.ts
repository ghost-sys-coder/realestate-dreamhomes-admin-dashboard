import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters long" }),
  description: z
    .string()
    .min(100, { message: "Description should be detailed -- at 100 chars" }),
  type: z.enum([
    "apartment",
    "house",
    "bungalow",
    "mansion",
    "office",
    "condo",
    "townhouse",
    "villa",
    "studio",
    "penthouse",
    "commercial",
    "land",
    "other",
  ]),
    purpose: z.enum(["sale", "rent", "both"]),
    // pricing
    salePrice: z.coerce.number().optional(),
    rentPrice: z.coerce.number().optional(),
    currency: z.enum(["UGX", "USD", "EUR", "GBP"]).default("UGX"),
    rentalPeriod: z.enum(["daily", "weekly", "monthly", "yearly"]).default("daily"),
    negotiable: z.boolean().default(false),
    // address
    region: z.string().min(2, { message: "Region is required" }),
    district: z.string().min(2, { message: "District is required" }),
    city: z.string().min(2, { message: "City is required" }),
    neighbourhood: z.string().optional(),
    zipCode: z.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),

    status: z.enum(["active", "pending", "sold", "rented", "draft",]).default("draft"),
    featured: z.boolean().default(false),

    images: z.array(z.instanceof(File)).min(3, {message: "Upload at least 3 images"}),
    amenities: z.array(z.string()).default([]),

    author: z.string().min(1, { message: "Author is required" })
});

export type PropertyFormValues = z.infer<typeof propertySchema>
