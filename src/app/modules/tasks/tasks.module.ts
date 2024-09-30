import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './container/tasks/tasks.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TableComponent,
    CardComponent,
    TaskDetailModalComponent,
    TaskFormModalComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class TasksModule {}
