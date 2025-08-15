export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Journal {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export type TaskStatus = 'PENDING' | 'DONE' | 'CANCELLED';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueAt?: string;
  status: TaskStatus;
  project?: string;
}

export type IntegrationProvider = 'github' | 'linkedin';

export interface Integration {
  id: string;
  userId: string;
  provider: IntegrationProvider;
  connectedAt: string;
  data?: Record<string, unknown>;
}

export interface Agent {
  id: string;
  userId: string;
  name: string;
  trigger: string;
  action: string;
}
