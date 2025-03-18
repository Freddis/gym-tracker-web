CREATE SCHEMA "gym_tracker";
--> statement-breakpoint
CREATE TABLE "gym_tracker"."entries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gym_tracker"."entries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"externalId" varchar NOT NULL,
	"type" varchar NOT NULL,
	"data" json NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone
);
