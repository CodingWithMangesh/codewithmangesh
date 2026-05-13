import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { youtubeVideos } from './videos'

export const sponsors = pgTable('sponsors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  logoUrl: text('logo_url'),
  tagline: text('tagline'),
  websiteUrl: text('website_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})


export const videoSponsors = pgTable('video_sponsors', {
  id: uuid('id').primaryKey().defaultRandom(),
  sponsorId: uuid('sponsor_id').notNull().references(() => sponsors.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').notNull().references(() => youtubeVideos.id, { onDelete: 'cascade' }),
  position: integer('position').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Sponsor = typeof sponsors.$inferSelect
export type NewSponsor = typeof sponsors.$inferInsert
export type VideoSponsor = typeof videoSponsors.$inferSelect
export type NewVideoSponsor = typeof videoSponsors.$inferInsert
