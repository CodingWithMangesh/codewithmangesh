import { sql } from 'drizzle-orm'
import { boolean, check, index, integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'
import { applicableToEnum, discountTypeEnum } from './enums'
import { table } from 'node:console'

export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: integer('discount_value').notNull(),
  applicableTo: applicableToEnum('applicable_to').notNull().default('all'),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  [
    index('sale_active_idx').on(table.isActive),
    index('sale_dates_idx').on(table.startsAt, table.endsAt),
    check(
      'sale_discount_positive',
      sql`discount_value > 0`
    ),
    check(
      'sale_percentage_max',
      sql`(discount_type != 'percentage') OR (discount_value <= 100)`
    ),
    check(
      'sale_date_range',
      sql`ends_at > starts_at`
    ),
  ]
])

export const saleProducts = pgTable('sale_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull().references(() => sales.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
}, (table) => [
  unique('sale_product_unique').on(table.saleId, table.productId),
  index('sale_product_sale_idx').on(table.saleId),
  index('sale_product_product_idx').on(table.productId),
])

export type Sale = typeof sales.$inferSelect
export type NewSale = typeof sales.$inferInsert
export type SaleProduct = typeof saleProducts.$inferSelect
