import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    DatePipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [StorageService],
})
export class TaskComponent implements OnInit {
  @HostBinding() className: string = 'app-task';

  task!: Task;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const taskId: string | null = this.route.snapshot.paramMap.get('id');
    const tasks: string = this.storage.get('tasks');
    this.task = (JSON.parse(tasks) as Task[]).find((task: Task) => task.id === taskId) as Task;

    if (this.task === undefined) {
      this.goToTasks();
    }
  }

  goToTasks(): void {
    this.router.navigateByUrl('tasks');
  }

  deleteTask(): void {
    const tasks = JSON.parse(this.storage.get('tasks'));
    const newTasks = tasks.filter((task: Task) => {
      return task.id !== this.task.id;
    })
    this.storage.set<Task[]>('tasks', newTasks);
    this.goToTasks();
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef =  this.dialog.open(DialogComponent, {
      maxWidth: '1000px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((data: Task | null): void => {
      if (data !== null && data !== undefined) {
        const tasks = JSON.parse(this.storage.get('tasks'));
        tasks.forEach((task: Task) => {
          if (task.id === data.id) {
            task.taskName = data.taskName;
            task.status = data.status;
            task.priority = data.priority;
            task.assignee = data.assignee;
            task.description = data.description;
            task.dueDate = data.dueDate;
          }
        });
        this.storage.set<Task[]>('tasks', tasks);
        this.task = data;
      }
    });
  }
}
