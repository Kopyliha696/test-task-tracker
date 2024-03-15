import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [StorageService],
})
export class TaskComponent implements OnInit {
  @HostBinding() className: string = 'app-task';

  task!: Task;
  constructor(private route: ActivatedRoute, private storage: StorageService, private router: Router,) {}

  ngOnInit() {
    const taskId: string | null = this.route.snapshot.paramMap.get('id');
    const tasks: string = this.storage.get('tasks');
    this.task = (JSON.parse(tasks) as Task[]).find((task: Task) => task.id === taskId) as Task;

    if (this.task === undefined) {
      throw new Error('No task found');
    }
  }

  goToTasks(): void {
      this.router.navigateByUrl('tasks');

  }
}
