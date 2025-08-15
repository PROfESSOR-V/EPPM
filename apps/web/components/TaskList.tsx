'use client';

import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_at: string | null;
  status: string;
}

export default function TaskList() {
  const supabase = createClient();
  
  const fetcher = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];
    
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('due_at', { ascending: true });
    return data as Task[];
  };

  const { data: tasks, error } = useSWR('tasks', fetcher, { refreshInterval: 5000 });

  if (error) return <p className="text-red-400">Failed to load tasks</p>;
  if (!tasks) return <p className="text-gray-400">Loading tasks...</p>;
  if (tasks.length === 0) return <p className="text-gray-400">No tasks yet. Create a journal entry to generate tasks!</p>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="font-medium text-white">{task.title}</div>
          {task.description && (
            <div className="mt-1 text-sm text-gray-300">{task.description}</div>
          )}
          {task.due_at && (
            <div className="mt-2 text-xs text-blue-400">
              Due: {new Date(task.due_at).toLocaleDateString()}
            </div>
          )}
          <div className="mt-2">
            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
              task.status === 'COMPLETED' 
                ? 'bg-green-600/20 text-green-400' 
                : 'bg-yellow-600/20 text-yellow-400'
            }`}>
              {task.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
