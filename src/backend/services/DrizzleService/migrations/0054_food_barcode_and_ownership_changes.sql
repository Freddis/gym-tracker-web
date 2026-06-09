ALTER TABLE "gym_tracker"."food" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "barcode" bigint;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "calories" real;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "copiedFromId" uuid;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "visibility" "gym_tracker"."EntryVisibility" DEFAULT 'Public' NOT NULL;