import {
  pgTable,
  text,
  timestamp,
  json,
  pgEnum,
  uuid,
  decimal,
  boolean,
  doublePrecision,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "super_admin",
  "admin",
  "agent",
  "client",
]);

// Users table definition
export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  imageUrl: text("image_url"),
  role: roleEnum("role").notNull().default("client"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Properties table definition
export const propertyTypeEnum = pgEnum("property_type", [
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
]);

export const purposeEnum = pgEnum("purpose", ["sale", "rent", "both"]);

export const currencyEnum = pgEnum("currency", ["UGX", "USD", "EUR", "GBP"]);

export const rentalPeriodEnum = pgEnum("rental_period", [
  "monthly",
  "yearly",
  "weekly",
  "daily",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "active",
  "pending",
  "sold",
  "rented",
  "draft",
]);

export const propertiesTable = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // "luxury-4bed-villa-in-kampala"

  title: text("title").notNull(),
  description: text("description").notNull(),

  type: propertyTypeEnum("type").notNull(),
  purpose: purposeEnum("purpose").notNull(),

  // pricing
  salePrice: decimal("sale_price", { precision: 18, scale: 2 }), // null if not for sale
  rentPrice: decimal("rent_price", { precision: 18, scale: 2 }), // null if not for rent
  currency: currencyEnum("currency").notNull().default("UGX"),
  rentalPeriod: rentalPeriodEnum("rental_period"), // only if rent/both
  negotiable: boolean("negotiable").default(false),

  // address
  country: text("country").notNull().default("Uganda"),
  region: text("region").notNull(), // usually not needed in UG
  district: text("district").notNull(),
  city: text("city").notNull(),
  neighbourhood: text("neighbourhood"), // e.g kololo
  zipCode: text("zip_code"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),

  status: listingStatusEnum("status").notNull().default("draft"),
  featured: boolean("featured").default(false),

  images: jsonb("images").$type<string[]>().notNull().default([]),

  amenities: jsonb("amenities")
    .$type<
      | "Swimming Pool"
      | "Gym"
      | "Parking"
      | "Garden"
      | "Security"
      | "Playground"
      | "Elevator"
      | "Air Conditioning"
      | "Furnished"
      | "Pet Friendly"
      | "Fireplace"
      | "Wheelchair Accessible"
      | "Solar Panels"
      | "Storage Room"
      | "Balcony"
      | "24/7 Security"
      | string[]
    >()
        .default([]),
  
    // Analytics (increment via app or DB triggers)
    views: integer("views").default(0).notNull(),
    favorites: integer("favorites").default(0).notNull(),
    shares: integer("shares").default(0).notNull(),
    inquiries: integer("inquiries").default(0).notNull(),

    // Flexible property details
    details: jsonb("details").$type<{
        area?: number;
        bedrooms?: number;
        bathrooms?: number;
        garages?: number;
        yearBuilt?: number;
        floors?: number;
        [key: string]: string | number | boolean | null | undefined;
    }>(),

    authorId: text("author_id").references(() => usersTable.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Define locations table
export const regionsTable = pgTable("regions", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const districtsTable = pgTable("districts", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    regionId: uuid("region_id").references(() => regionsTable.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const locationsTable = pgTable("locations", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    districtId: uuid("district_id").references(() => districtsTable.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})