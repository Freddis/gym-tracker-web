ALTER TABLE "gym_tracker"."images" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ADD PRIMARY KEY ("uuid");--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ALTER COLUMN "uuid" DROP DEFAULT;
