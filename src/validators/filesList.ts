import { z } from 'zod';

export type FileSystem = {
  files: string[];
  subdirectories?: Record<string, FileSystem>;
};

// Define the recursive schema using z.lazy()
export const fileSystemSchema: z.ZodType<FileSystem> = z.object({
  files: z.array(z.string()),
  subdirectories: z
    .record(
      z.string(),
      z.lazy(() => fileSystemSchema),
    )
    .optional(),
});
