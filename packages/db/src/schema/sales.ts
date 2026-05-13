import { boolean, integer, pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core'

import { applicableTypeEnum, discountTypeEnum } from './enums'
import { products } from './products'

export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: integer('discount_value').notNull(),
  applicableTo: applicableTypeEnum('applicable_to').notNull().default('all'),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const saleProducts = pgTable('sale_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull().references(() => sales.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
})

export type Sale = typeof sales.$inferSelect
export type NewSale = typeof sales.$inferInsert
export type SaleProduct = typeof saleProducts.$inferSelect
