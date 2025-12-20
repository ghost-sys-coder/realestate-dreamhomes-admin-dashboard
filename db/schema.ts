import { pgTable, text, timestamp, json, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["super_admin", "admin", "agent", "client"]);

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
})