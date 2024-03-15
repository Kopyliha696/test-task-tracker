import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, HostBinding, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { StorageService } from '../../services/storage.service';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { getTaskPriorityName } from '../../utils/get-task-priority-name';
import { getTaskStatusName } from '../../utils/get-task-status-name';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [
    MatTableModule,
    NgFor,
    MatButtonModule,
    NgIf,
    MatIconModule,
    MatLabel,
    MatInput,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [StorageService],
})
export class TasksComponent implements  AfterViewInit {
  @HostBinding() className: string = 'app-tasks';

  dataSource: MatTableDataSource<Task> = new MatTableDataSource();
  columnsToDisplay: string[] = ['taskName', 'dueDate', 'priority', 'status', 'assignee'];
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedTask: Task | null = null;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  tasks: Task[] = [];

  @ViewChild(MatSort) sort: MatSort | null = null;
  constructor(private router: Router, public dialog: MatDialog, private storage: StorageService) {}

  ngAfterViewInit(): void {
    this.tasks = JSON.parse(this.storage.get('tasks'));
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.tasks;
  }

  applySearch(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTaskStatusName(status: TaskStatus): string {
    return getTaskStatusName(status);
  }

  getTaskPriorityName(priority: TaskPriority): string {
    return getTaskPriorityName(priority);
  }

  openTask(id: string): void {
    this.router.navigateByUrl(`task/${id}`);
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef =  this.dialog.open(DialogComponent, {
      maxWidth: '1000px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((data: Task | null): void => {
      if (data !== null && data !== undefined) {
        this.tasks.forEach((task: Task) => {
          if (task.id === data.id) {
            task.taskName = data.taskName;
            task.status = data.status;
            task.priority = data.priority;
            task.assignee = data.assignee;
            task.description = data.description;
            task.dueDate = data.dueDate;
          }
        });
        this.storage.set('tasks', this.tasks);
        this.dataSource.data = this.tasks;
      }
    });
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '1000px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((data: Task | null): void => {
      if (data !== null && data !== undefined) {
        this.tasks.push(data);
        this.storage.set('tasks', this.tasks);
        this.dataSource.data = this.tasks;
      }
    })
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task: Task) => {
      return task.id !== id;
    })
    this.storage.set('tasks', this.tasks);
    this.dataSource.data = this.tasks;
  }
}
