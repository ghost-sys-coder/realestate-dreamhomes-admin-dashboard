CREATE TYPE "public"."document_status" AS ENUM('pending', 'verified', 'reject');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('national_id', 'passport', 'real_estate_licence', 'employment_contract', 'professional_certificate', 'proof_of_address', 'other');--> statement-breakpoint
CREATE TABLE "agent_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"agent_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" "document_type" NOT NULL,
	"status" "document_status" DEFAULT 'pending' NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"size" integer,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agent_documents" ADD CONSTRAINT "agent_documents_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;