import { sql } from "drizzle-orm"
import { boolean, check, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { youtubeVideos } from "./videos"
import { contentStatusEnum } from "./enums"

export const blogPosts = pgTable("blog_posts", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  excerpt: text('excerpt'),
  coverImage: text('cover_image'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  videoId: uuid('video_id').unique().references(() => youtubeVideos.id, { onDelete: 'set null' }),
  publishedAt: timestamp('published_at'),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('blog_slug_idx').on(table.slug),
  index('blog_status_idx').on(table.status),
  index('blog_published_idx').on(table.publishedAt),
  index('blog_video_idx').on(table.videoId),
  index('blog_deleted_idx').on(table.deletedAt),
  index('blog_featured_idx').on(table.isFeatured),
  check(
    'blog_published_at_check',
    sql`(status != 'published') OR (published_at IS NOT NULL)`
  )
])

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert
