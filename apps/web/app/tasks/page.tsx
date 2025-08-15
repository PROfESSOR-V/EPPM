export const metadata = { title: 'Tasks' };

import TaskList from '@/components/TaskList';

export default function TasksPage() {
  return (
    <section className="w-full max-w-3xl space-y-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h2 className="text-3xl font-semibold text-white">Tasks</h2>
      <TaskList />
    </section>
  );
}
