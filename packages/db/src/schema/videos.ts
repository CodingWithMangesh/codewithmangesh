import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const youtubeVideos = pgTable('youtube_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  youtubeId: text('youtube_id').unique().notNull(),
  thumbnailUrl: text('thumbnail_url'),
  description: text('description'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => [
  index('video_slug_idx').on(table.slug),
  index('video_youtube_id_idx').on(table.youtubeId),
  index('video_published_idx').on(table.publishedAt)
])

export type YoutubeVideo = typeof youtubeVideos.$inferSelect
export type NewYoutubeVideo = typeof youtubeVideos.$inferInsert
