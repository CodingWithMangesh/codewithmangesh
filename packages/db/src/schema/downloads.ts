import { boolean, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'

export const downloads = pgTable('downloads', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  productId: uuid('product_id').notNull().references(() => products.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('download_user_idx').on(table.userId),
  index('download_product_idx').on(table.productId),
  index('download_created_idx').on(table.createdAt),
])

export const downloadTokens = pgTable('download_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  productId: uuid('product_id').notNull().references(() => products.id),
  token: text('token').unique().notNull(),
  used: boolean('used').notNull().default(false),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('token_user_idx').on(table.userId),
  index('token_product_idx').on(table.productId),
  index('token_expires_idx').on(table.expiresAt),
  index('token_used_idx').on(table.used),
])

export type Download = typeof downloads.$inferSelect
export type NewDownload = typeof downloads.$inferInsert
export type DownloadToken = typeof downloadTokens.$inferSelect
export type NewDownloadToken = typeof downloadTokens.$inferInsert
