import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskData } from 'src/app/core/models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskData,
    private dialogRef: MatDialogRef<TaskDetailModalComponent>,
    private dialog: MatDialog
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  openEditModal(): void {
    this.dialogRef.close();

    // Abre el modal de edición con los datos de la tarea
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '500px',
      data: {
        task: this.task, // Envía los datos de la tarea seleccionada
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Task edited successfully', result);
      }
    });
  }
}
