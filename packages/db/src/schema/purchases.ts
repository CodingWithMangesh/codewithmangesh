import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { purchaseStatusEnum } from './enums'
import { products } from './products'

export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  productId: uuid('product_id').notNull().references(() => products.id),
  originalPrice: integer('original_price').notNull(),
  saleDiscount: integer('sale_discount').notNull().default(0),
  couponDiscount: integer('coupon_discount').notNull().default(0),
  amountPaid: integer('amount_paid').notNull(),
  currency: text('currency').notNull().default('INR'),
  paymentId: text('payment_id'),
  couponId: uuid('coupon_id'),
  status: purchaseStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Purchase = typeof purchases.$inferSelect
export type NewPurchase = typeof purchases.$inferInsert
