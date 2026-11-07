export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  due: string;
}
