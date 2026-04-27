ALTER TABLE "gym_tracker"."outdoor_runs" ALTER COLUMN "cadence" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitId" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitAnchor" integer;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitAnchors_3_0" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitSource" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitSourceName" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitDevice" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "healthkitDeviceName" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "heartRate" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "course" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "speed" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "speedAccuracy" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "horizontalAccuracy" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "verticalAccuracy" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."geo_data" ADD COLUMN "distance" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "maxPace" real NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "maxCadence" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "elevationGain" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "heartRate" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."outdoor_runs" ADD COLUMN "maxHeartRate" real;