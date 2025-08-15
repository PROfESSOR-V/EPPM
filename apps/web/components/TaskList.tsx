import useSWR from 'swr';
import { supabaseClient } from '@/lib/supabaseClient';

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_at: string | null;
  status: string;
}

export default function TaskList() {
  const fetcher = async () => {
    const { data } = await supabaseClient
      .from('tasks')
      .select('*')
      .order('due_at', { ascending: true });
    return data as Task[];
  };
  // Simple fetch with SWR
  const { data: tasks } = useSWR('tasks', fetcher, { refreshInterval: 5000 });

  if (!tasks) return <p>Loading tasks...</p>;
  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="rounded border p-2">
          <div className="font-medium">{t.title}</div>
          {t.due_at && <div className="text-sm text-gray-600">Due: {t.due_at}</div>}
        </li>
      ))}
    </ul>
  );
}
