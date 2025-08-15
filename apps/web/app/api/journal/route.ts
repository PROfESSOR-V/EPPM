import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { JournalSchema } from '@core/journal.schema';
import { createClient } from '@supabase/supabase-js';
import { Queue } from 'bullmq';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or Service Role Key is missing from environment variables.');
}

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

const queue =
  (global as any).__queue__ ||
  new Queue('taskExtraction', {
    connection: { url: process.env.REDIS_URL! },
  });
(global as any).__queue__ = queue;

export async function POST(req: Request) {
  const supabaseAuth = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabaseAuth.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await req.json();
  const parse = JournalSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Server configuration error: Supabase credentials not found.' },
      { status: 500 }
    );
  }

  const id = randomUUID();
  const { error } = await supabase.from('journals').insert({ id, user_id: userId, content: body.content });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  await queue.add('extract', { journalId: id, userId });

  return NextResponse.json({ id });
}

export async function GET() {
  return NextResponse.json([]);
}
