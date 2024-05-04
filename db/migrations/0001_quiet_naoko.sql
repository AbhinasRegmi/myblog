ALTER TABLE "blog_myblog" ADD COLUMN "published_at" timestamp;--> statement-breakpoint
ALTER TABLE "blog_myblog" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "blog_myblog" DROP COLUMN IF EXISTS "cover";