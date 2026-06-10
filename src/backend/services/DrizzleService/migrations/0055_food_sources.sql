CREATE TYPE "gym_tracker"."FoodSource" AS ENUM('Fatsecret', 'C0r', 'OpenFoodFacts');--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "source" "gym_tracker"."FoodSource";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "externalId" varchar;