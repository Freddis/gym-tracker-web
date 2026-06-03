ALTER TABLE "gym_tracker"."entries" DROP CONSTRAINT "entries_imageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" DROP CONSTRAINT "food_imageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" DROP CONSTRAINT "users_imageId_images_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" DROP COLUMN "imageId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" DROP COLUMN "imageId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" DROP COLUMN "imageId";