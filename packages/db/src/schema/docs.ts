import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { contentStatusEnum } from './enums'
import { youtubeVideos } from './videos'

export const docSeries = pgTable('doc_series', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  coverImage: text('cover_image'),
  order: integer('order').notNull().default(0),
  status: contentStatusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const docPages = pgTable('doc_pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  seriesId: uuid('series_id')
    .notNull()
    .references(() => docSeries.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'cascade' }),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type DocSeries = typeof docSeries.$inferSelect
export type NewDocSeries = typeof docSeries.$inferInsert
export type DocPage = typeof docPages.$inferSelect
export type NewDocPage = typeof docPages.$inferInsert
