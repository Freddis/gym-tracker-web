ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "externalSource" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "gym_tracker"."ExternalSource";--> statement-breakpoint
CREATE TYPE "gym_tracker"."ExternalSource" AS ENUM('Argus', 'AppleHealth');--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "externalSource" SET DATA TYPE "gym_tracker"."ExternalSource" USING "externalSource"::"gym_tracker"."ExternalSource";

DROP TABLE "gym_tracker"."geo_data" CASCADE;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "heartRateData" jsonb;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "geoData" jsonb;