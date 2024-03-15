import { TaskPriority } from '../types/task';

export function getTaskPriorityName(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.None:
      return 'None';
    case TaskPriority.Low:
      return 'Low';
    case TaskPriority.Medium:
      return 'Medium';
    case TaskPriority.High:
      return 'High'
  }
}
