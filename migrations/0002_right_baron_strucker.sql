ALTER TABLE "properties" ADD COLUMN "region" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "district" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "street";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "state";