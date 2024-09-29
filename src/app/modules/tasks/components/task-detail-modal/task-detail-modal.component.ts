import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskData, TaskResponse } from 'src/app/core/models/task.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskData,
    private dialogRef: MatDialogRef<TaskDetailModalComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
