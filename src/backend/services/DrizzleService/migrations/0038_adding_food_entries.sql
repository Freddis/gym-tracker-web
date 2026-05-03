ALTER TABLE "gym_tracker"."images" ALTER COLUMN "imageType" TYPE text;--> statement-breakpoint
DROP TYPE "gym_tracker"."ImageType"; --> statement-breakpoint
CREATE TYPE "gym_tracker"."ImageType" AS ENUM('Exercise', 'UserProfile', 'Entry', 'Food');--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ALTER COLUMN "imageType" TYPE "gym_tracker"."ImageType" USING "imageType"::text::"gym_tracker"."ImageType";--> statement-breakpoint

CREATE TABLE "gym_tracker"."food" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"imageId" integer,
	"protein" real NOT NULL,
	"carbs" real NOT NULL,
	"fat" real NOT NULL,
	"servingSize" real,
	"servingSizeUnit" varchar NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD CONSTRAINT "food_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "gym_tracker"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD CONSTRAINT "food_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE set null ON UPDATE no action;