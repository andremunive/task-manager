import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './container/tasks/tasks.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TableComponent,
    CardComponent,
    TaskDetailModalComponent,
  ],
})
export class TasksModule {}
