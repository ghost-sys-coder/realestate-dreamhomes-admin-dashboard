CREATE TYPE "public"."agent_status" AS ENUM('pending', 'draft', 'approved');--> statement-breakpoint
CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone_number" text NOT NULL,
	"role" "role" DEFAULT 'agent' NOT NULL,
	"status" "agent_status" DEFAULT 'approved' NOT NULL,
	"bio" text,
	"photo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "agents_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "agents_email_unique" UNIQUE("email")
);
