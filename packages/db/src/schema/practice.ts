import { sql } from 'drizzle-orm'
import { boolean, check, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { youtubeVideos } from './videos'
import { contentStatusEnum, difficultyLevelEnum, practiceTypeEnum } from './enums'

export const practiceProblems = pgTable('practice_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  type: practiceTypeEnum('type').notNull(),
  difficulty: difficultyLevelEnum('difficulty'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'set null' }),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('practice_slug_idx').on(table.slug),
  index('practice_type_idx').on(table.type),
  index('practice_difficulty_idx').on(table.difficulty),
  index('practice_status_idx').on(table.status),
  index('practice_featured_idx').on(table.isFeatured),
  index('practice_deleted_idx').on(table.deletedAt),
  index('practice_video_idx').on(table.videoId),
  check(
    'difficulty_for_dsa_only',
    sql`(type != 'dsa') OR (difficulty IS NOT NULL)`
  )
])

export type PracticeProblem = typeof practiceProblems.$inferSelect
export type NewPracticeProblem = typeof practiceProblems.$inferInsert
