import { sql } from 'drizzle-orm'
import { boolean, check, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { blogPosts } from './blogs'
import { contentStatusEnum, productTypeEnum } from './enums'

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  type: productTypeEnum('type').notNull(),
  price: integer('price').notNull().default(0),
  currency: text('currency').notNull().default('INR'),
  isFree: boolean('is_free').notNull().default(false),
  githubUrl: text('github_url'),
  fileKey: text('file_key'),
  coverImage: text('cover_image'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'set null' }),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('product_slug_idx').on(table.slug),
  index('product_type_idx').on(table.type),
  index('product_status_idx').on(table.status),
  index('product_is_free_idx').on(table.isFree),
  index('product_featured_idx').on(table.isFeatured),
  index('product_deleted_idx').on(table.deletedAt),
  index('product_post_idx').on(table.postId),
  check(
    'price_consistency',
    sql`(is_free = true AND price = 0) OR (is_free = false AND price > 0)`
  ),
  check(
    'free_requires_github',
    sql`(is_free = false) OR (github_url IS NOT NULL)`
  ),
  check(
    'paid_requires_file',
    sql`(is_free = true) OR (file_key IS NOT NULL)`
  ),
])

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
