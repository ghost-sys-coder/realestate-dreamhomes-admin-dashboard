ALTER TABLE "properties" DROP CONSTRAINT "properties_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "properties" DROP CONSTRAINT "properties_district_id_districts_id_fk";
--> statement-breakpoint
ALTER TABLE "properties" DROP CONSTRAINT "properties_location_id_locations_id_fk";
--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "region_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "district_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "city_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "region_id";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "district_id";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "location_id";