import { sql } from 'drizzle-orm'
import { boolean, check, index, integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { products } from './products'
import { purchases } from './purchases'
import { applicableToEnum, discountTypeEnum } from './enums'

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').unique().notNull(),
  description: text('description'),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: integer('discount_value').notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').notNull().default(0),
  applicableTo: applicableToEnum('applicable_to').notNull().default('all'),
  minOrderAmount: integer('min_order_amount'),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('coupon_code_idx').on(table.code),
  index('coupon_active_idx').on(table.isActive),
  index('coupon_expires_idx').on(table.expiresAt),
  check(
    'coupon_discount_positive',
    sql`discount_value > 0`
  ),
  check(
    'coupon_percentage_max',
    sql`(discount_type != 'percentage') OR (discount_value <= 100)`
  ),
  check(
    'coupon_max_uses_positive',
    sql`max_uses IS NULL OR max_uses > 0`
  ),
  check(
    'coupon_used_count_valid',
    sql`used_count >= 0`
  ),
  check(
    'coupon_code_uppercase',
    sql`code = upper(code)`
  )
])

export const couponProducts = pgTable('coupon_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  couponId: uuid('coupon_id').notNull().references(() => coupons.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
}, (table) => [
  unique('coupon_product_unique').on(table.couponId, table.productId),
  index('coupon_product_coupon_idx').on(table.couponId),
  index('coupon_product_product_idx').on(table.productId)
])

export const couponUses = pgTable('coupon_uses', {
  id: uuid('id').primaryKey().defaultRandom(),
  couponId: uuid('coupon_id').notNull().references(() => coupons.id),
  userId: text('user_id').notNull(),
  purchaseId: uuid('purchase_id').notNull().references(() => purchases.id),
  discountApplied: integer('discount_applied').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('coupon_use_unique').on(table.couponId, table.userId),
  index('coupon_use_coupon_idx').on(table.couponId),
  index('coupon_use_user_idx').on(table.userId),
  check(
    'discount_applied_positive',
    sql`discount_applied > 0`
  ),
])

export type Coupon = typeof coupons.$inferSelect
export type NewCoupon = typeof coupons.$inferInsert
export type CouponProduct = typeof couponProducts.$inferSelect
export type CouponUse = typeof couponUses.$inferSelect
