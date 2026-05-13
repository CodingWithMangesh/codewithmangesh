import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const youtubeVideos = pgTable('youtube_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  youtubeId: text('youtube_id').unique().notNull(),
  thumbnailUrl: text('thumbnail_url'),
  description: text('description'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type YoutubeVideo = typeof youtubeVideos.$inferSelect
export type NewYoutubeVideo = typeof youtubeVideos.$inferInsert
