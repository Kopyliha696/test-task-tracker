import { TaskStatus } from '../types/task';

export function getTaskStatusName(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.None:
      return 'None';
    case TaskStatus.ToDo:
      return 'To Do';
    case TaskStatus.InProgress:
      return 'In Progress';
    case TaskStatus.Done:
      return 'Done'
  }
}
