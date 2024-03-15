export enum TaskPriority {
  None,
  Low,
  Medium,
  High,
}

export enum TaskStatus {
  None,
  ToDo,
  InProgress,
  Done,
}

export interface Task {
  id: string;
  taskName: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  description: string;
}
