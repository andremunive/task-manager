import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule, MatPaginatorModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() tasks: any[] = [];
  @Input() pageSize: number = 5;
  @Input() totalTasks: number = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();

  paginatedTasks: any[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.paginatedTasks = this.tasks;
    }
  }

  getAssignedPersonNames(task: any): string {
    if (task.attributes.people && task.attributes.people.data.length > 0) {
      return task.attributes.people.data
        .map((person: any) => person.attributes.name)
        .join(', ');
    }
    return 'No assigned persons';
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onCardClick(task: any): void {
    this.dialog.open(TaskDetailModalComponent, {
      width: '400px',
      data: task,
      maxWidth: '90vw',
    });
  }
}
