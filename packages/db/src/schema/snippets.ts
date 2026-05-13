import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { contentStatusEnum } from './enums'
import { youtubeVideos } from './videos'
import { blogPosts } from './blogs'

export const snippets = pgTable('snippets', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  code: text('code').notNull(),
  language: text('language').notNull(),
  description: text('description'),
  status: contentStatusEnum('status').default('draft').notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'set null' }),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Snippet = typeof snippets.$inferSelect
export type NewSnippet = typeof snippets.$inferInsert
