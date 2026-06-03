ALTER TABLE "gym_tracker"."workout_type_exercise_sets" DROP CONSTRAINT "workout_type_exercise_sets_workoutTypeId_workout_type_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" DROP CONSTRAINT "workout_type_exercise_sets_workoutTypeExerciseId_workout_type_exercise_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" DROP CONSTRAINT "workout_type_exercise_workoutTypeId_workout_type_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type" DROP CONSTRAINT "workout_type_planId_workout_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" DROP CONSTRAINT "workouts_typeId_workout_type_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_plan" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_plan" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ALTER COLUMN "workoutTypeId" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ALTER COLUMN "workoutTypeExerciseId" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ALTER COLUMN "workoutTypeId" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type" ALTER COLUMN "planId" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" ALTER COLUMN "typeId" SET DATA TYPE uuid USING gen_random_uuid();