import { z } from 'zod';

export const ExtractedTaskSchema = z.object({
  title: z.string().max(100),
  description: z.string().nullable().optional(),
  dueAt: z
    .string()
    .datetime({ offset: true })
    .nullable(),
  project: z.string().nullable().optional(),
});

export const ExtractedTaskArraySchema = z.array(ExtractedTaskSchema);

export type ExtractedTask = z.infer<typeof ExtractedTaskSchema>;
