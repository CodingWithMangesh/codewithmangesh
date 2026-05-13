import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const contentStatusEnum = pgEnum("status", ["draft", "published", "archived"]);

export const productTypeEnum = pgEnum("product_type", ["source_code", "starter_kit", "template"]);

export const discountTypeEnum = pgEnum("discount_type", ["percentage", "flat"]);

export const applicableTypeEnum = pgEnum("applicable_to", ["all", "specific"]);

export const purchaseStatusEnum = pgEnum("purchase_status", ["pending", "completed", "failed", "refunded"]);

export const contentTypeEnum = pgEnum("content_type", ["blog_post", "snippet", "product", "doc_series"]);

export const tagCategoryEnum = pgEnum("tag_category", ["language", "framework", "topic", "career", "design"]);

export const practiceTypeEnum = pgEnum("practice_type", ["dsa", "system_design"]);

export const difficultyLevelEnum = pgEnum("difficulty_level", ["easy", "medium", "hard"]);

export const providerEnum = pgEnum("provider", ["discord", "github", "google",]);
