ALTER TABLE "gym_tracker"."exercises" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD PRIMARY KEY (id); --> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" RENAME COLUMN "exerciseUuid" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" RENAME COLUMN "exerciseUuid" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" RENAME COLUMN "exerciseUuid" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" RENAME COLUMN "exerciseUuid" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" RENAME COLUMN "exerciseUuid" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" DROP CONSTRAINT "exercise_muscles_exerciseUuid_exercises_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_exerciseUuid_exercises_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP CONSTRAINT "workout_exercises_exerciseUuid_exercises_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" DROP CONSTRAINT "workout_type_exercise_sets_exerciseUuid_exercises_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" DROP CONSTRAINT "workout_type_exercise_exerciseUuid_exercises_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" DROP CONSTRAINT "exercises_uuid_unique";--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_exercise_sets_exerciseUuid_index";--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_exercises_exerciseUuid_index";--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_type_exercise_sets_exerciseUuid_index";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ADD CONSTRAINT "workout_type_exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ADD CONSTRAINT "workout_type_exercise_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercise_muscles_exerciseId_index" ON "gym_tracker"."exercise_muscles" USING btree ("exerciseId");--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_exerciseId_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("exerciseId");--> statement-breakpoint
CREATE INDEX "workout_exercises_exerciseId_index" ON "gym_tracker"."workout_exercises" USING btree ("exerciseId");--> statement-breakpoint
CREATE INDEX "workout_type_exercise_sets_exerciseId_index" ON "gym_tracker"."workout_type_exercise_sets" USING btree ("exerciseId");