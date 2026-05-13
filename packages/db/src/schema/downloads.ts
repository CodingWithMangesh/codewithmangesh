import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'

export const downloads = pgTable('downloads', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  productId: uuid('product_id').notNull().references(() => products.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const downloadTokens = pgTable('download_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  productId: uuid('product_id').notNull().references(() => products.id),
  token: text('token').unique().notNull(),
  used: boolean('used').notNull().default(false),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Download = typeof downloads.$inferSelect
export type NewDownload = typeof downloads.$inferInsert
export type DownloadToken = typeof downloadTokens.$inferSelect
export type NewDownloadToken = typeof downloadTokens.$inferInsert
