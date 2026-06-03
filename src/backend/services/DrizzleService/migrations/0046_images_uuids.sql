ALTER TABLE "gym_tracker"."entries" ADD COLUMN "imageUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "imageUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."images" ADD CONSTRAINT "images_uuid_unique" UNIQUE("uuid");--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" ADD COLUMN "imageUuid" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."entries" ADD CONSTRAINT "entries_imageUuid_images_uuid_fk" FOREIGN KEY ("imageUuid") REFERENCES "gym_tracker"."images"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD CONSTRAINT "food_imageUuid_images_uuid_fk" FOREIGN KEY ("imageUuid") REFERENCES "gym_tracker"."images"("uuid") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."users" ADD CONSTRAINT "users_imageUuid_images_uuid_fk" FOREIGN KEY ("imageUuid") REFERENCES "gym_tracker"."images"("uuid") ON DELETE set null ON UPDATE no action;--> statement-breakpoint


UPDATE "gym_tracker"."entries" we
SET "imageUuid" = i."uuid"
FROM "gym_tracker"."images" i
WHERE we."imageId" = i."id";--> statement-breakpoint

UPDATE "gym_tracker"."food" we
SET "imageUuid" = i."uuid"
FROM "gym_tracker"."images" i
WHERE we."imageId" = i."id";--> statement-breakpoint

UPDATE "gym_tracker"."users" we
SET "imageUuid" = i."uuid"
FROM "gym_tracker"."images" i
WHERE we."imageId" = i."id";