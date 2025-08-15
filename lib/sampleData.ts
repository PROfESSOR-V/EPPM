import { User, Journal, Task, Integration } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@example.com',
  avatarUrl: 'https://i.pravatar.cc/300?img=5',
};

export const journals: Journal[] = [
  {
    id: 'j1',
    userId: 'u1',
    content: 'Worked on AI ERP project. Need to finish UI polish by Friday.',
    createdAt: new Date().toISOString(),
  },
];

export const tasks: Task[] = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Finish UI polish',
    description: 'Match devin.ai style',
    dueAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    status: 'PENDING',
    project: 'ERP',
  },
];

export const integrations: Integration[] = [
  {
    id: 'i1',
    userId: 'u1',
    provider: 'github',
    connectedAt: new Date().toISOString(),
    data: { repoCount: 5 },
  },
];
