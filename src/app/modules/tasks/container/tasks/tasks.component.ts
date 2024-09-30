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
  isMobile: boolean = false;
  showFilters: boolean = false;

  constructor(
    private _task: TaskService,
    public _responsive: ResponsiveService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(page: number = 1) {
    this._task.getAllTasks('1', '10').subscribe((res: TaskResponse) => {
      this.tasks = res;
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // Método para abrir el modal
  openNewTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '400px',
      maxWidth: '90vw', // Hacerlo responsive para mobile
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí puedes hacer algo con los datos de la nueva tarea, como enviarlos al backend
      }
    });
  }
}
