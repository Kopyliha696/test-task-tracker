export enum TaskPriority {
  None = 'None',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskStatus {
  None = 'None',
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
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
