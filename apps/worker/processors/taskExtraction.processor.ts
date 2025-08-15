import { Job } from 'bullmq';
import { createClient } from '@supabase/supabase-js';
import { ExtractedTaskArraySchema } from '@core/task.schema';
import { strictPrompt } from '@core/llmPrompt';
import { callLLM } from '../llmWrapper.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function taskExtractor(job: Job) {
  const { journalId, userId } = job.data as { journalId: string; userId: string };

  const { data: journalRow } = await supabase
    .from('journals')
    .select('content')
    .eq('id', journalId)
    .single();

  if (!journalRow) throw new Error('Journal not found');

  const response = await callLLM(journalRow.content, strictPrompt);

  const parsed = ExtractedTaskArraySchema.safeParse(response.tasks);
  if (!parsed.success) {
    throw new Error('LLM returned invalid schema');
  }

  const summary = response.summary;
  const tasks = parsed.data;

  await supabase
    .from('journals')
    .update({ summary, extracted: tasks })
    .eq('id', journalId);

  const insertTasks = tasks.map((t: any) => ({
    user_id: userId,
    title: t.title,
    description: t.description,
    due_at: t.dueAt,
    status: 'PENDING',
    source: `journal:${journalId}`,
  }));

  await supabase.from('tasks').insert(insertTasks);

  return { count: insertTasks.length };
}
