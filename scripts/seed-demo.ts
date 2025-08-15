import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const demoUserId = randomUUID();
  await supabase.from('users').insert({
    id: demoUserId,
    email: 'demo@example.com',
    name: 'Demo User',
  });

  const journals = [
    {
      id: randomUUID(),
      user_id: demoUserId,
      content:
        'Today I worked on placement prep. Need to finish system design assignment by next Friday.',
    },
    {
      id: randomUUID(),
      user_id: demoUserId,
      content: 'Scheduled group presentation due Aug 20. Set up mock interview.',
    },
  ];
  await supabase.from('journals').insert(journals);

  console.log('Seed complete 🎉');
}

main();
