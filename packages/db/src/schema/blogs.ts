import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { contentStatusEnum } from "./enums"
import { youtubeVideos } from "./videos"

export const blogPosts = pgTable("blog_posts", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  status: contentStatusEnum('status').default('draft').notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'set null' }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert
