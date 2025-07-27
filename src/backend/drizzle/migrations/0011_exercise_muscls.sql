CREATE TYPE "public"."Muscle" AS ENUM('Lower Back', 'Soleus', 'Front Deltoids', 'Lats', 'Forearms', 'Pecs', 'Hamstrings', 'Wrist Flexors', 'Biceps', 'Triceps', 'Rear Deltoids', 'Rotator Cuff', 'Ankle', 'Abdominals', 'Glutes', 'Quadriceps', 'Obliques', 'Abductors', 'Gastrocnemius', 'Lateral Deltoids', 'Hip Flexors', 'Trapezius', 'Neck', 'Adductors');--> statement-breakpoint
CREATE TABLE "gym_tracker"."exercise_muscles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gym_tracker"."exercise_muscles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"muscle" "Muscle" NOT NULL,
	"exerciseId" integer NOT NULL,
	"isPrimary" boolean NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE no action ON UPDATE no action;