import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { contentTypeEnum, tagCategoryEnum } from './enums'

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').unique().notNull(),
  slug: text('slug').unique().notNull(),
  category: tagCategoryEnum('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const contentTags = pgTable('content_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  contentId: uuid('content_id').notNull(),
  contentType: contentTypeEnum('content_type').notNull(),
})

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
export type ContentTag = typeof contentTags.$inferSelect
export type NewContentTag = typeof contentTags.$inferInsert
