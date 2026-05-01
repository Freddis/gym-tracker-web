CREATE EXTENSION IF NOT EXISTS pgcrypto; --> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD CONSTRAINT "exercises_uuid_unique" UNIQUE("uuid");--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD COLUMN "copiedFromUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD COLUMN "parentExerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD COLUMN "exerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD COLUMN "exerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD COLUMN "exerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ADD COLUMN "exerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ADD COLUMN "exerciseUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseUuid_exercises_uuid_fk" FOREIGN KEY ("exerciseUuid") REFERENCES "gym_tracker"."exercises"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_exerciseUuid_exercises_uuid_fk" FOREIGN KEY ("exerciseUuid") REFERENCES "gym_tracker"."exercises"("uuid") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_exerciseUuid_exercises_uuid_fk" FOREIGN KEY ("exerciseUuid") REFERENCES "gym_tracker"."exercises"("uuid") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise_sets" ADD CONSTRAINT "workout_type_exercise_sets_exerciseUuid_exercises_uuid_fk" FOREIGN KEY ("exerciseUuid") REFERENCES "gym_tracker"."exercises"("uuid") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_type_exercise" ADD CONSTRAINT "workout_type_exercise_exerciseUuid_exercises_uuid_fk" FOREIGN KEY ("exerciseUuid") REFERENCES "gym_tracker"."exercises"("uuid") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint

UPDATE "gym_tracker"."exercises" we
SET "parentExerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."parentExerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."exercises" we
SET "copiedFromUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."copiedFromId" = e."id";--> statement-breakpoint


UPDATE "gym_tracker"."workout_exercises" we
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."exerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."exercise_muscles" we
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."exerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."workout_exercises" we
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."exerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."workout_exercise_sets" we
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE we."exerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."workout_type_exercise" wte
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE wte."exerciseId" = e."id";--> statement-breakpoint

UPDATE "gym_tracker"."workout_type_exercise_sets" wtes
SET "exerciseUuid" = e."uuid"
FROM "gym_tracker"."exercises" e
WHERE wtes."exerciseId" = e."id";--> statement-breakpoint