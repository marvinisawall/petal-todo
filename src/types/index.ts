export type Category = {
  id: string;
  name: string;
  color: string;
  emoji: string;
};

export type Tag = {
  id: string;
  label: string;
  color: string;
};

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  categoryId: string | null;
  tags: string[]; // tag ids
  priority: Priority;
  createdAt: number;
  completedAt: number | null;
  note?: string;
};

export type FilterType = 'all' | 'active' | 'completed';
