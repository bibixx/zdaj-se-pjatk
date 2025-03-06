import { z } from 'zod';

export const pageSchema = z.object({
  title: z.string(),
  id: z.string(),
  questionsCount: z.number().optional().default(0),
});

export const pagesSchema = z.object({
  pages: z.array(pageSchema),
  updatedAt: z.number(),
});

export type Page = z.infer<typeof pageSchema>;
export type Pages = z.infer<typeof pagesSchema>;
