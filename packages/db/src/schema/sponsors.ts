import { index, integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { youtubeVideos } from './videos'

export const sponsors = pgTable('sponsors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  logoUrl: text('logo_url'),
  tagline: text('tagline'),
  websiteUrl: text('website_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('sponsor_name_idx').on(table.name)
])


export const videoSponsors = pgTable('video_sponsors', {
  id: uuid('id').primaryKey().defaultRandom(),
  sponsorId: uuid('sponsor_id').notNull().references(() => sponsors.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').notNull().references(() => youtubeVideos.id, { onDelete: 'cascade' }),
  position: integer('position').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('video_sponsor_unique').on(table.sponsorId, table.videoId),
  index('video_sponsor_video_idx').on(table.sponsorId),
  index('video_sponsor_sponsor_idx').on(table.videoId)
])

export type Sponsor = typeof sponsors.$inferSelect
export type NewSponsor = typeof sponsors.$inferInsert
export type VideoSponsor = typeof videoSponsors.$inferSelect
export type NewVideoSponsor = typeof videoSponsors.$inferInsert
