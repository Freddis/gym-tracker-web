ALTER TABLE "gym_tracker"."entries" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD COLUMN "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;
