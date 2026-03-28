ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "type" TYPE text;
DROP TYPE "gym_tracker"."EntryType";--> statement-breakpoint
CREATE TYPE "gym_tracker"."EntryType" AS ENUM('Workout', 'Weight', 'Image');--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ALTER COLUMN "type" TYPE "gym_tracker"."EntryType" USING "type"::text::"gym_tracker"."EntryType";--> statement-breakpoint

ALTER TABLE "gym_tracker"."images" ALTER COLUMN "imageType" TYPE text;--> statement-breakpoint
DROP TYPE "gym_tracker"."ImageType"; --> statement-breakpoint
CREATE TYPE "gym_tracker"."ImageType" AS ENUM('Exercise', 'UserProfile', 'Entry');--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ALTER COLUMN "imageType" TYPE "gym_tracker"."ImageType" USING "imageType"::text::"gym_tracker"."ImageType";--> statement-breakpoint

ALTER TABLE "gym_tracker"."entries" ADD COLUMN "imageId" integer;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE cascade ON UPDATE no action;