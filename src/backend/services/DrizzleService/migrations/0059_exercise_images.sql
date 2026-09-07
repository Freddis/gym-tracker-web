CREATE TABLE "gym_tracker"."exercise_images" (
	"imageId" uuid NOT NULL,
	"exerciseId" uuid NOT NULL,
	CONSTRAINT "exercise_images_imageId_exerciseId_pk" PRIMARY KEY("imageId","exerciseId")
);
--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_images" ADD CONSTRAINT "exercise_images_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."exercise_images" ADD CONSTRAINT "exercise_images_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "gym_tracker"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercise_images_exerciseId_index" ON "gym_tracker"."exercise_images" USING btree ("exerciseId");
