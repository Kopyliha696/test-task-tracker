import { NgFor } from '@angular/common';
import { Component, HostBinding, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EnumValues } from 'enum-values';
import { nanoid } from 'nanoid';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { getTaskPriorityName } from '../../utils/get-task-priority-name';
import { getTaskStatusName } from '../../utils/get-task-status-name';

@Component({
  selector: 'app-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @HostBinding() className: string = 'app-dialog';

  priorities: number[] = EnumValues.getValues(TaskPriority);
  statuses: number[] = EnumValues.getValues(TaskStatus);
  title: string = 'New task';
  readonly form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: Task | null,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogComponent>,
  ) {
    if (data !== null) {
      this.title = 'Edit task';
    }

    this.form = this.formBuilder.group({
      taskName: this.formBuilder.control(data?.taskName ?? '', [Validators.required]),
      dueDate: this.formBuilder.control(data?.dueDate ?? ''),
      priority: this.formBuilder.control(data?.priority ?? TaskPriority.None),
      status: this.formBuilder.control(data?.status ?? TaskStatus.None),
      assignee: this.formBuilder.control(data?.assignee ?? '', [Validators.email]),
      description: this.formBuilder.control(data?.description ?? ''),
    });
  }

  getTaskPriorityName(priority: TaskPriority): string {
    return getTaskPriorityName(priority);
  }

  getTaskStatusName(status: TaskStatus): string {
    return getTaskStatusName(status);
  }

  submit(): void {
    if (this.form.valid) {
      if (this.data === null) {
        const id: string = nanoid();
        this.dialogRef.close({...this.form.value, id});
      } else {
        this.dialogRef.close({...this.form.value, id: this.data.id})
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
