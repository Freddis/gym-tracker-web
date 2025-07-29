ALTER TABLE "gym_tracker"."workout_exercise_sets" ALTER COLUMN "start" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ALTER COLUMN "end" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD COLUMN "workoutExerciseId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" ADD COLUMN "externalId" varchar;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "gym_tracker"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workoutExerciseId_workout_exercises_id_fk" FOREIGN KEY ("workoutExerciseId") REFERENCES "gym_tracker"."workout_exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "gym_tracker"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercises_userId_index" ON "gym_tracker"."exercises" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_workoutId_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("workoutId");--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_exerciseId_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("exerciseId");--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_userId_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "workout_exercise_sets_workoutExerciseId_index" ON "gym_tracker"."workout_exercise_sets" USING btree ("workoutExerciseId");--> statement-breakpoint
CREATE INDEX "workout_exercises_workoutId_index" ON "gym_tracker"."workout_exercises" USING btree ("workoutId");--> statement-breakpoint
CREATE INDEX "workout_exercises_exerciseId_index" ON "gym_tracker"."workout_exercises" USING btree ("exerciseId");--> statement-breakpoint
CREATE INDEX "workout_exercises_userId_index" ON "gym_tracker"."workout_exercises" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "workouts_userId_index" ON "gym_tracker"."workouts" USING btree ("userId");