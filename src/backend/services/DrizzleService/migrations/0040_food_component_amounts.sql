CREATE TYPE "gym_tracker"."FoodAmountUnit" AS ENUM('Gram', 'Serving');--> statement-breakpoint
CREATE TYPE "gym_tracker"."ServingSizeUnit" AS ENUM('Gram');--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" RENAME COLUMN "dishId" TO "mealId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" RENAME COLUMN "foodId" TO "componentId";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" DROP CONSTRAINT "food_components_dishId_food_id_fk";
--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" DROP CONSTRAINT "food_components_foodId_food_id_fk";
--> statement-breakpoint
UPDATE "gym_tracker"."food_components" SET "unit" = 'Gram' WHERE "unit" = 'g';--> statement-breakpoint
UPDATE "gym_tracker"."food" SET "servingSizeUnit" = 'Gram' WHERE "servingSizeUnit" = 'g';--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ALTER COLUMN "servingSizeUnit" SET DATA TYPE "gym_tracker"."ServingSizeUnit" USING "servingSizeUnit"::"gym_tracker"."ServingSizeUnit";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" ALTER COLUMN "unit" SET DATA TYPE "gym_tracker"."FoodAmountUnit" USING "unit"::"gym_tracker"."FoodAmountUnit";--> statement-breakpoint
ALTER TABLE "gym_tracker"."food" ADD COLUMN "isMeal" boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" ADD CONSTRAINT "food_components_mealId_food_id_fk" FOREIGN KEY ("mealId") REFERENCES "gym_tracker"."food"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" ADD CONSTRAINT "food_components_componentId_food_id_fk" FOREIGN KEY ("componentId") REFERENCES "gym_tracker"."food"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gym_tracker"."food_components" DROP COLUMN "servings";


