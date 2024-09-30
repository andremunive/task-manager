import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/core/models/task.model';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormModalComponent } from '../../components/task-form-modal/task-form-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { PeopleModalComponent } from '../../components/people-modal/people-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
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
  selectedStatus = '';
  isMobile = false;
  showFilters = false;

  constructor(
    private _task: TaskService,
    public _responsive: ResponsiveService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(page: number = 1, pageSize: number = 5) {
    const status = this.selectedStatus;
    this._task
      .getAllTasks(page.toString(), pageSize.toString(), status)
      .subscribe((res: TaskResponse) => {
        this.tasks = res;
      });
  }

  onStatusFilterChange(status: string): void {
    this.selectedStatus = status;
    this.loadTasks();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      this.onStatusFilterChange('');
    }
  }

  openNewTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '400px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openPeopleModal(): void {
    this.dialog.open(PeopleModalComponent, {
      width: '600px',
      height: 'auto',
    });
  }

  onPageChange(event: PageEvent) {
    this.loadTasks(event.pageIndex + 1, event.pageSize);
  }
}
