ALTER TABLE "gym_tracker"."exercise_muscles" DROP CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP CONSTRAINT "workout_exercises_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" DROP CONSTRAINT "workout_type_exercise_sets_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" DROP CONSTRAINT "workout_type_exercise_exerciseId_exercises_id_fk";
--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_exercise_sets_exerciseId_index";--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_exercises_exerciseId_index";--> statement-breakpoint
DROP INDEX "gym_tracker"."workout_type_exercise_sets_exerciseId_index";--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_exerciseUuid_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("exerciseUuid");--> statement-breakpoint
CREATE INDEX "workout_exercises_exerciseUuid_index" ON "gym_tracker"."workout_exercises" USING btree ("exerciseUuid");--> statement-breakpoint
CREATE INDEX "workout_type_exercise_sets_exerciseUuid_index" ON "gym_tracker"."workout_type_exercise_sets" USING btree ("exerciseUuid");--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" DROP COLUMN "copiedFromId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" DROP COLUMN "parentExerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" DROP COLUMN "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP COLUMN "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP COLUMN "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" DROP COLUMN "exerciseId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" DROP COLUMN "exerciseId";