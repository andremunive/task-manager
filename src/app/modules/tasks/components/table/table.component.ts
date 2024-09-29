import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskData } from 'src/app/core/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() tasks: any[] = [];
  @Input() totalTasks: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'name',
    'status',
    'assignedPersons',
    'deadline',
  ];
  dataSource = new MatTableDataSource<any>(this.tasks);

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      // Asegúrate de que actualizas la dataSource cuando cambien las tareas
      this.dataSource.data = this.tasks;
    }
  }

  onPageChange(event: PageEvent) {
    // Aquí podrías realizar una nueva petición al backend para obtener los datos de la nueva página
  }

  // Método para obtener los nombres de las personas asignadas, separado por comas
  getAssignedPersonNames(task: any): string {
    if (task.attributes.people && task.attributes.people.data.length > 0) {
      return task.attributes.people.data
        .map((person: any) => person.attributes.name)
        .join(', ');
    }
    return 'No assigned persons';
  }

  onRowClick(task: TaskData): void {
    this.dialog.open(TaskDetailModalComponent, {
      width: '400px',
      data: task,
      maxWidth: '90vw', // Hacer que el modal sea responsive
    });
  }
}
