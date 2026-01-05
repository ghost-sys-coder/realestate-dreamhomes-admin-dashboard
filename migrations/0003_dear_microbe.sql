ALTER TABLE "properties" ADD COLUMN "region_id" uuid;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "district_id" uuid;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "location_id" uuid;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;