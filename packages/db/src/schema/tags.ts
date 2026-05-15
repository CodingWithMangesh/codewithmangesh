import { index, integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { contentTypeEnum, tagCategoryEnum } from './enums'

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').unique().notNull(),
  slug: text('slug').unique().notNull(),
  category: tagCategoryEnum('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('tag_slug_idx').on(table.slug),
  index('tag_category_idx').on(table.category),
])

export const contentTags = pgTable('content_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  contentId: uuid('content_id').notNull(),
  contentType: contentTypeEnum('content_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('content_tag_unique').on(table.tagId, table.contentId, table.contentType),
  index('content_tag_content_idx').on(table.contentId, table.contentType),
  index('content_tag_tag_idx').on(table.tagId),
])

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
export type ContentTag = typeof contentTags.$inferSelect
export type NewContentTag = typeof contentTags.$inferInsert
