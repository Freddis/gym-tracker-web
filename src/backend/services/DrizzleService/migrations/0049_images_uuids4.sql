ALTER TABLE "gym_tracker"."entries" RENAME COLUMN "imageUuid" TO "imageId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" RENAME COLUMN "imageUuid" TO "imageId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" RENAME COLUMN "imageUuid" TO "imageId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" DROP CONSTRAINT "entries_imageUuid_images_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" DROP CONSTRAINT "food_imageUuid_images_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" DROP CONSTRAINT "users_imageUuid_images_uuid_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" DROP CONSTRAINT "images_uuid_unique";--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD CONSTRAINT "food_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" ADD CONSTRAINT "users_imageId_images_id_fk" FOREIGN KEY ("imageId") REFERENCES "gym_tracker"."images"("id") ON DELETE set null ON UPDATE no action;