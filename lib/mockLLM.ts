import { Task } from '../types';

export async function extractTasksFromJournal(content: string): Promise<Task[]> {
  // Simple mock: if content contains 'finish', extract a task
  if (content.toLowerCase().includes('finish')) {
    return [
      {
        id: `t-${Date.now()}`,
        userId: 'u1',
        title: 'Finish pending item',
        status: 'PENDING',
        description: '',
      },
    ];
  }
  return [];
}
