CREATE TYPE "public"."applicable_to" AS ENUM('all', 'specific');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('blog_post', 'snippet', 'product', 'doc_series', 'practice_problem');--> statement-breakpoint
CREATE TYPE "public"."difficulty_level" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TYPE "public"."discount_type" AS ENUM('flat', 'percentage');--> statement-breakpoint
CREATE TYPE "public"."practice_type" AS ENUM('dsa', 'system_design');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('source_code', 'starter_kit', 'full_template');--> statement-breakpoint
CREATE TYPE "public"."purchase_status" AS ENUM('pending', 'completed', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'content_writer');--> statement-breakpoint
CREATE TYPE "public"."tag_category" AS ENUM('language', 'framework', 'topic', 'career', 'design');--> statement-breakpoint
CREATE TABLE "youtube_videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"youtube_id" text NOT NULL,
	"thumbnail_url" text,
	"description" text,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "youtube_videos_slug_unique" UNIQUE("slug"),
	CONSTRAINT "youtube_videos_youtube_id_unique" UNIQUE("youtube_id")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"cover_image" text,
	"seo_title" text,
	"seo_description" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"video_id" uuid,
	"published_at" timestamp,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug"),
	CONSTRAINT "blog_posts_video_id_unique" UNIQUE("video_id"),
	CONSTRAINT "blog_published_at_check" CHECK ((status != 'published') OR (published_at IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "snippets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"language" text NOT NULL,
	"description" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"video_id" uuid,
	"post_id" uuid,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "snippets_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "practice_problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"type" "practice_type" NOT NULL,
	"difficulty" "difficulty_level",
	"is_featured" boolean DEFAULT false NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"video_id" uuid,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "practice_problems_slug_unique" UNIQUE("slug"),
	CONSTRAINT "difficulty_for_dsa_only" CHECK ((type != 'dsa') OR (difficulty IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"type" "product_type" NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"is_free" boolean DEFAULT false NOT NULL,
	"github_url" text,
	"file_key" text,
	"cover_image" text,
	"seo_title" text,
	"seo_description" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"post_id" uuid,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "price_consistency" CHECK ((is_free = true AND price = 0) OR (is_free = false AND price > 0)),
	CONSTRAINT "free_requires_github" CHECK ((is_free = false) OR (github_url IS NOT NULL)),
	CONSTRAINT "paid_requires_file" CHECK ((is_free = true) OR (file_key IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "product_videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"video_id" uuid NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_video_unique" UNIQUE("product_id","video_id"),
	CONSTRAINT "product_video_order_unique" UNIQUE("product_id","order")
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"tagline" text,
	"website_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sponsor_id" uuid NOT NULL,
	"video_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "video_sponsor_unique" UNIQUE("sponsor_id","video_id")
);
--> statement-breakpoint
CREATE TABLE "coupon_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coupon_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	CONSTRAINT "coupon_product_unique" UNIQUE("coupon_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "coupon_uses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coupon_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"purchase_id" uuid NOT NULL,
	"discount_applied" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupon_use_unique" UNIQUE("coupon_id","user_id"),
	CONSTRAINT "discount_applied_positive" CHECK (discount_applied > 0)
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"discount_type" "discount_type" NOT NULL,
	"discount_value" integer NOT NULL,
	"max_uses" integer,
	"used_count" integer DEFAULT 0 NOT NULL,
	"applicable_to" "applicable_to" DEFAULT 'all' NOT NULL,
	"min_order_amount" integer,
	"expires_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupons_code_unique" UNIQUE("code"),
	CONSTRAINT "coupon_discount_positive" CHECK (discount_value > 0),
	CONSTRAINT "coupon_percentage_max" CHECK ((discount_type != 'percentage') OR (discount_value <= 100)),
	CONSTRAINT "coupon_max_uses_positive" CHECK (max_uses IS NULL OR max_uses > 0),
	CONSTRAINT "coupon_used_count_valid" CHECK (used_count >= 0),
	CONSTRAINT "coupon_code_uppercase" CHECK (code = upper(code))
);
--> statement-breakpoint
CREATE TABLE "sale_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sale_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	CONSTRAINT "sale_product_unique" UNIQUE("sale_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"discount_type" "discount_type" NOT NULL,
	"discount_value" integer NOT NULL,
	"applicable_to" "applicable_to" DEFAULT 'all' NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sale_discount_positive" CHECK (discount_value > 0),
	CONSTRAINT "sale_percentage_max" CHECK ((discount_type != 'percentage') OR (discount_value <= 100)),
	CONSTRAINT "sale_date_range" CHECK (ends_at > starts_at)
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"product_id" uuid NOT NULL,
	"original_price" integer NOT NULL,
	"sale_discount" integer DEFAULT 0 NOT NULL,
	"coupon_discount" integer DEFAULT 0 NOT NULL,
	"amount_paid" integer NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"payment_id" text,
	"coupon_id" uuid,
	"status" "purchase_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "purchase_amounts_positive" CHECK (original_price >= 0 AND sale_discount >= 0 AND coupon_discount >= 0 AND amount_paid >= 0),
	CONSTRAINT "purchase_amount_consistency" CHECK (amount_paid = original_price - sale_discount - coupon_discount),
	CONSTRAINT "purchase_discounts_not_exceed_price" CHECK (sale_discount + coupon_discount <= original_price)
);
--> statement-breakpoint
CREATE TABLE "download_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"product_id" uuid NOT NULL,
	"token" text NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "download_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "downloads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"product_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tag_id" uuid NOT NULL,
	"content_id" uuid NOT NULL,
	"content_type" "content_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_tag_unique" UNIQUE("tag_id","content_id","content_type")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" "tag_category" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name"),
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_video_id_youtube_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."youtube_videos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_video_id_youtube_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."youtube_videos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_problems" ADD CONSTRAINT "practice_problems_video_id_youtube_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."youtube_videos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_video_id_youtube_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."youtube_videos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_sponsors" ADD CONSTRAINT "video_sponsors_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_sponsors" ADD CONSTRAINT "video_sponsors_video_id_youtube_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."youtube_videos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_products" ADD CONSTRAINT "coupon_products_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_products" ADD CONSTRAINT "coupon_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_uses" ADD CONSTRAINT "coupon_uses_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_uses" ADD CONSTRAINT "coupon_uses_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_sale_id_sales_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "download_tokens" ADD CONSTRAINT "download_tokens_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "downloads" ADD CONSTRAINT "downloads_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "video_slug_idx" ON "youtube_videos" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "video_youtube_id_idx" ON "youtube_videos" USING btree ("youtube_id");--> statement-breakpoint
CREATE INDEX "video_published_idx" ON "youtube_videos" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "blog_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_status_idx" ON "blog_posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blog_published_idx" ON "blog_posts" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "blog_video_idx" ON "blog_posts" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "blog_deleted_idx" ON "blog_posts" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "blog_featured_idx" ON "blog_posts" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "snippet_slug_idx" ON "snippets" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "snippet_status_idx" ON "snippets" USING btree ("status");--> statement-breakpoint
CREATE INDEX "snippet_language_idx" ON "snippets" USING btree ("language");--> statement-breakpoint
CREATE INDEX "snippet_featured_idx" ON "snippets" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "snippet_deleted_idx" ON "snippets" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "snippet_video_idx" ON "snippets" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "snippet_post_idx" ON "snippets" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "practice_slug_idx" ON "practice_problems" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "practice_type_idx" ON "practice_problems" USING btree ("type");--> statement-breakpoint
CREATE INDEX "practice_difficulty_idx" ON "practice_problems" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX "practice_status_idx" ON "practice_problems" USING btree ("status");--> statement-breakpoint
CREATE INDEX "practice_featured_idx" ON "practice_problems" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "practice_deleted_idx" ON "practice_problems" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "practice_video_idx" ON "practice_problems" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "product_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "product_type_idx" ON "products" USING btree ("type");--> statement-breakpoint
CREATE INDEX "product_status_idx" ON "products" USING btree ("status");--> statement-breakpoint
CREATE INDEX "product_is_free_idx" ON "products" USING btree ("is_free");--> statement-breakpoint
CREATE INDEX "product_featured_idx" ON "products" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "product_deleted_idx" ON "products" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "product_post_idx" ON "products" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "product_video_product_idx" ON "product_videos" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_video_video_idx" ON "product_videos" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "sponsor_name_idx" ON "sponsors" USING btree ("name");--> statement-breakpoint
CREATE INDEX "video_sponsor_video_idx" ON "video_sponsors" USING btree ("sponsor_id");--> statement-breakpoint
CREATE INDEX "video_sponsor_sponsor_idx" ON "video_sponsors" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "coupon_product_coupon_idx" ON "coupon_products" USING btree ("coupon_id");--> statement-breakpoint
CREATE INDEX "coupon_product_product_idx" ON "coupon_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "coupon_use_coupon_idx" ON "coupon_uses" USING btree ("coupon_id");--> statement-breakpoint
CREATE INDEX "coupon_use_user_idx" ON "coupon_uses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "coupon_code_idx" ON "coupons" USING btree ("code");--> statement-breakpoint
CREATE INDEX "coupon_active_idx" ON "coupons" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "coupon_expires_idx" ON "coupons" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "sale_product_sale_idx" ON "sale_products" USING btree ("sale_id");--> statement-breakpoint
CREATE INDEX "sale_product_product_idx" ON "sale_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "sale_active_idx" ON "sales" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "sale_dates_idx" ON "sales" USING btree ("starts_at","ends_at");--> statement-breakpoint
CREATE INDEX "purchase_user_idx" ON "purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "purchase_product_idx" ON "purchases" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "purchase_status_idx" ON "purchases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "purchase_payment_id_idx" ON "purchases" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "purchase_coupon_idx" ON "purchases" USING btree ("coupon_id");--> statement-breakpoint
CREATE INDEX "token_user_idx" ON "download_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "token_product_idx" ON "download_tokens" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "token_expires_idx" ON "download_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "token_used_idx" ON "download_tokens" USING btree ("used");--> statement-breakpoint
CREATE INDEX "download_user_idx" ON "downloads" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "download_product_idx" ON "downloads" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "download_created_idx" ON "downloads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "content_tag_content_idx" ON "content_tags" USING btree ("content_id","content_type");--> statement-breakpoint
CREATE INDEX "content_tag_tag_idx" ON "content_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "tag_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tag_category_idx" ON "tags" USING btree ("category");