import { index, integer, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'
import { youtubeVideos } from './videos'

export const productVideos = pgTable('product_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').notNull().references(() => youtubeVideos.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('product_video_unique').on(table.productId, table.videoId),
  unique('product_video_order_unique').on(table.productId, table.order),
  index('product_video_product_idx').on(table.productId),
  index('product_video_video_idx').on(table.videoId)
])

export type ProductVideo = typeof productVideos.$inferSelect
export type NewProductVideo = typeof productVideos.$inferInsert
