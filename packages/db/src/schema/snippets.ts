import { boolean, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { blogPosts } from './blogs'
import { youtubeVideos } from './videos'
import { contentStatusEnum } from './enums'

export const snippets = pgTable('snippets', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  language: text('language').notNull(),
  description: text('description'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'set null' }),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'set null' }),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (tabler) => [
  index('snippet_slug_idx').on(tabler.slug),
  index('snippet_status_idx').on(tabler.status),
  index('snippet_language_idx').on(tabler.language),
  index('snippet_featured_idx').on(tabler.isFeatured),
  index('snippet_deleted_idx').on(tabler.deletedAt),
  index('snippet_video_idx').on(tabler.videoId),
  index('snippet_post_idx').on(tabler.postId)
])

export type Snippet = typeof snippets.$inferSelect
export type NewSnippet = typeof snippets.$inferInsert
