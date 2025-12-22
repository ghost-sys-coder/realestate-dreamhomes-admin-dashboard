CREATE TYPE "public"."currency" AS ENUM('UGX', 'USD', 'EUR', 'GBP');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('active', 'pending', 'sold', 'rented', 'draft');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('apartment', 'house', 'bungalow', 'mansion', 'office', 'condo', 'townhouse', 'villa', 'studio', 'penthouse', 'commercial', 'land', 'other');--> statement-breakpoint
CREATE TYPE "public"."purpose" AS ENUM('sale', 'rent', 'both');--> statement-breakpoint
CREATE TYPE "public"."rental_period" AS ENUM('monthly', 'yearly', 'weekly', 'daily');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin', 'agent', 'client');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" "property_type" NOT NULL,
	"purpose" "purpose" NOT NULL,
	"sale_price" numeric(18, 2),
	"rent_price" numeric(18, 2),
	"currency" "currency" DEFAULT 'UGX' NOT NULL,
	"rental_period" "rental_period",
	"negotiable" boolean DEFAULT false,
	"street" text,
	"city" text NOT NULL,
	"neighbourhood" text,
	"state" text,
	"country" text DEFAULT 'Uganda' NOT NULL,
	"zip_code" text,
	"latitude" double precision,
	"longitude" double precision,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"amenities" jsonb DEFAULT '[]'::jsonb,
	"views" integer DEFAULT 0 NOT NULL,
	"favorites" integer DEFAULT 0 NOT NULL,
	"shares" integer DEFAULT 0 NOT NULL,
	"inquiries" integer DEFAULT 0 NOT NULL,
	"details" jsonb,
	"author_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "properties_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"image_url" text,
	"role" "role" DEFAULT 'client' NOT NULL,
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;