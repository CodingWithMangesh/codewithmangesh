import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { contentStatusEnum, productTypeEnum } from './enums'
import { blogPosts } from './blogs'

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  type: productTypeEnum('type').notNull(),
  price: integer('price').notNull().default(0),
  isFree: boolean('is_free').notNull().default(false),
  githubUrl: text('github_url'),
  fileKey: text('file_key'),
  coverImage: text('cover_image'),
  status: contentStatusEnum('status').default('draft').notNull(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
