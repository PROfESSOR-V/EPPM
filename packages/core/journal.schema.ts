import { z } from 'zod';

export const JournalSchema = z.object({
  content: z.string().min(1, 'Journal cannot be empty'),
});
