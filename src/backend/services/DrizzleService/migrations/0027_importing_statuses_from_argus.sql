CREATE TYPE "gym_tracker"."ExternalSource" AS ENUM('Argus');--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "externalId" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "externalSource" "gym_tracker"."ExternalSource";--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "title" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "gym_tracker"."EntryType";--> statement-breakpoint
CREATE TYPE "gym_tracker"."EntryType" AS ENUM('Workout', 'Weight', 'Post');--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "type" SET DATA TYPE "gym_tracker"."EntryType" USING "type"::"gym_tracker"."EntryType";