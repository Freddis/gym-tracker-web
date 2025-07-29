CREATE TYPE "gym_tracker"."Equipment" AS ENUM('rowing', 'swimming', 'plate loaded', 'foam roller', 'pullup bar', 'stair climber', 'selectorized', 'dip bar', 'preacher', 'hyperextension', 'sandbag', 'elliptical', 'chair', 'cable', 'captain''s chair', 'towel', 'water bottle', 'stability ball', 'table', 'smith', 'kettlebell', 'cycling', 'step aerobics', 'plate', 'platform', 'medicine ball', 'running', 'barbell', 'backpack', 'ez curl bar', 'walking', 'bench', 'bodyweight', 'resistance band', 'dumbbell', 'jump rope', 'treadmill', 'bosu ball');--> statement-breakpoint
CREATE TYPE "gym_tracker"."Muscle" AS ENUM('Lower Back', 'Soleus', 'Front Deltoids', 'Lats', 'Forearms', 'Pecs', 'Hamstrings', 'Wrist Flexors', 'Biceps', 'Triceps', 'Rear Deltoids', 'Rotator Cuff', 'Ankle', 'Abdominals', 'Glutes', 'Quadriceps', 'Obliques', 'Abductors', 'Gastrocnemius', 'Lateral Deltoids', 'Hip Flexors', 'Trapezius', 'Neck', 'Adductors');--> statement-breakpoint
CREATE TABLE "gym_tracker"."exercise_muscles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gym_tracker"."exercise_muscles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"muscle" "gym_tracker"."Muscle" NOT NULL,
	"exerciseId" integer NOT NULL,
	"isPrimary" boolean NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" ADD COLUMN "equipment" "gym_tracker"."Equipment";--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercises" DROP COLUMN "equipmentId";