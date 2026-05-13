import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { contentStatusEnum, difficultyLevelEnum, practiceTypeEnum } from './enums'
import { youtubeVideos } from './videos'

export const practiceProblems = pgTable('practice_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  type: practiceTypeEnum('type').notNull(),
  difficulty: difficultyLevelEnum('difficulty'),
  content: text('content').notNull(),
  videoId: uuid('video_id').references(() => youtubeVideos.id, { onDelete: 'set null' }),
  status: contentStatusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type PracticeProblem = typeof practiceProblems.$inferSelect
export type NewPracticeProblem = typeof practiceProblems.$inferInsert
