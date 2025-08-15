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
  console.log('🚀 Worker processing job:', job.id, 'with data:', job.data);
  
  const { journalId, userId } = job.data as { journalId: string; userId: string };

  const { data: journalRow, error: journalError } = await supabase
    .from('journals')
    .select('content')
    .eq('id', journalId)
    .single();

  if (journalError) {
    console.error('❌ Error fetching journal:', journalError);
    throw new Error(`Journal fetch error: ${journalError.message}`);
  }

  if (!journalRow) {
    console.error('❌ Journal not found for ID:', journalId);
    throw new Error('Journal not found');
  }

  console.log('📖 Journal content:', journalRow.content);

  try {
    const response = await callLLM(journalRow.content, strictPrompt);
    console.log('🤖 LLM response:', response);

    const parsed = ExtractedTaskArraySchema.safeParse(response.tasks);
    if (!parsed.success) {
      console.error('❌ Schema validation failed:', parsed.error);
      throw new Error(`LLM returned invalid schema: ${parsed.error.message}`);
    }

    const summary = response.summary;
    const tasks = parsed.data;
    console.log('✅ Parsed tasks:', tasks);

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

    console.log('💾 Inserting tasks:', insertTasks);

    const { error: insertError } = await supabase.from('tasks').insert(insertTasks);
    
    if (insertError) {
      console.error('❌ Error inserting tasks:', insertError);
      throw new Error(`Task insert error: ${insertError.message}`);
    }

    console.log('🎉 Successfully processed', insertTasks.length, 'tasks');
    return { count: insertTasks.length };
  } catch (error) {
    console.error('❌ Worker error:', error);
    throw error;
  }
}
