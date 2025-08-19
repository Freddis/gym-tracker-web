ALTER TABLE "gym_tracker"."entries" DROP CONSTRAINT "entries_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" DROP CONSTRAINT "entries_workoutId_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" DROP CONSTRAINT "entries_weightId_weight_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" DROP CONSTRAINT "images_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" DROP CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_workoutId_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" DROP CONSTRAINT "workout_exercise_sets_workoutExerciseId_workout_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP CONSTRAINT "workout_exercises_workoutId_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP CONSTRAINT "workout_exercises_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" DROP CONSTRAINT "workout_exercises_exerciseId_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "gym_tracker"."workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_weightId_weight_id_fk" FOREIGN KEY ("weightId") REFERENCES "gym_tracker"."weight"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ADD CONSTRAINT "images_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."weight" ADD CONSTRAINT "weight_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "gym_tracker"."workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercise_sets" ADD CONSTRAINT "workout_exercise_sets_workoutExerciseId_workout_exercises_id_fk" FOREIGN KEY ("workoutExerciseId") REFERENCES "gym_tracker"."workout_exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "gym_tracker"."workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workout_exercises" ADD CONSTRAINT "workout_exercises_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."workouts" ADD CONSTRAINT "workouts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;