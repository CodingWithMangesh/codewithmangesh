import { sql } from 'drizzle-orm'
import { check, index, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'
import { purchaseStatusEnum } from './enums'
import { coupons } from './coupons'

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
  couponId: uuid('coupon_id').references(() => coupons.id, { onDelete: 'set null' }),
  status: purchaseStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('purchase_user_idx').on(table.userId),
  index('purchase_product_idx').on(table.productId),
  index('purchase_status_idx').on(table.status),
  index('purchase_payment_id_idx').on(table.paymentId),
  index('purchase_coupon_idx').on(table.couponId),
  check(
    'purchase_amounts_positive',
    sql`original_price >= 0 AND sale_discount >= 0 AND coupon_discount >= 0 AND amount_paid >= 0`
  ),
  check(
    'purchase_amount_consistency',
    sql`amount_paid = original_price - sale_discount - coupon_discount`
  ),
  check(
    'purchase_discounts_not_exceed_price',
    sql`sale_discount + coupon_discount <= original_price`
  ),
])

export type Purchase = typeof purchases.$inferSelect
export type NewPurchase = typeof purchases.$inferInsert
