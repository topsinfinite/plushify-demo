ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "total_generations" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "favorite_count" integer DEFAULT 0 NOT NULL;