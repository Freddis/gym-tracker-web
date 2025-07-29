ALTER TABLE "gym_tracker"."exercises" ADD COLUMN "deletedAt" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" ADD COLUMN "deletedAt" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "exercises_deletedAt_index" ON "gym_tracker"."exercises" USING btree ("deletedAt");--> statement-breakpoint
CREATE INDEX "workouts_deletedAt_index" ON "gym_tracker"."workouts" USING btree ("deletedAt");