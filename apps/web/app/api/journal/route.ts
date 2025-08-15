import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { JournalSchema } from '@core/journal.schema';
import { createClient } from '@supabase/supabase-js';
import { Queue } from 'bullmq';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const queue =
  (global as any).__queue__ ||
  new Queue('taskExtraction', {
    connection: { url: process.env.REDIS_URL! },
  });
(global as any).__queue__ = queue;

export async function POST(req: Request) {
  const body = await req.json();
  const parse = JournalSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const id = randomUUID();
  const { error } = await supabase
    .from('journals')
    .insert({ id, user_id: 'demo-user', content: body.content });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  await queue.add('extract', { journalId: id, userId: 'demo-user' });

  return NextResponse.json({ id });
}

export async function GET() {
  return NextResponse.json([]);
}
