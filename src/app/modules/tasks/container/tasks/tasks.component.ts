import { Component } from '@angular/core';
import { TaskResponse } from 'src/app/core/models/task.model';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks: TaskResponse = {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 5,
        pageCount: 1,
        total: 0,
      },
    },
  };
  isMobile: boolean = false;

  constructor(
    private _task: TaskService,
    public _responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(page: number = 1) {
    this._task.getAllTasks('1', '10').subscribe((res: TaskResponse) => {
      this.tasks = res;
    });
  }
}
