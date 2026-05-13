import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { applicableTypeEnum, discountTypeEnum } from './enums'
import { products } from './products'
import { purchases } from './purchases'

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').unique().notNull(),
  description: text('description'),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: integer('discount_value').notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').notNull().default(0),
  applicableTo: applicableTypeEnum('applicable_to').notNull().default('all'),
  minOrderAmount: integer('min_order_amount'),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const couponProducts = pgTable('coupon_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  couponId: uuid('coupon_id').notNull().references(() => coupons.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
})

export const couponUses = pgTable('coupon_uses', {
  id: uuid('id').primaryKey().defaultRandom(),
  couponId: uuid('coupon_id').notNull().references(() => coupons.id),
  userId: text('user_id').notNull(),
  purchaseId: uuid('purchase_id').notNull().references(() => purchases.id),
  discountApplied: integer('discount_applied').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Coupon = typeof coupons.$inferSelect
export type NewCoupon = typeof coupons.$inferInsert
export type CouponProduct = typeof couponProducts.$inferSelect
export type CouponUse = typeof couponUses.$inferSelect
