import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'
import { youtubeVideos } from './videos'

export const productVideos = pgTable('product_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').notNull().references(() => youtubeVideos.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type ProductVideo = typeof productVideos.$inferSelect
export type NewProductVideo = typeof productVideos.$inferInsert
