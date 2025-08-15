import { journals, tasks, integrations, currentUser } from './sampleData';
import { Journal, Task } from '../types';

const latency = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export async function getJournals(): Promise<Journal[]> {
  await latency();
  return journals;
}

export async function saveJournal(content: string): Promise<Journal> {
  await latency();
  const journal: Journal = {
    id: `j${journals.length + 1}`,
    userId: currentUser.id,
    content,
    createdAt: new Date().toISOString(),
  };
  journals.unshift(journal);
  return journal;
}

export async function getTasks(): Promise<Task[]> {
  await latency();
  return tasks;
}

export async function addTasks(newTasks: Task[]): Promise<Task[]> {
  await latency();
  tasks.push(...newTasks);
  return newTasks;
}

export async function markTaskDone(id: string): Promise<void> {
  await latency(300);
  const task = tasks.find((t) => t.id === id);
  if (task) task.status = 'DONE';
}

export async function getIntegrations() {
  await latency();
  return integrations;
}
