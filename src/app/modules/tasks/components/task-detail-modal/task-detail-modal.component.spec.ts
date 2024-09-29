import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailModalComponent } from './task-detail-modal.component';

describe('TaskDetailModalComponent', () => {
  let component: TaskDetailModalComponent;
  let fixture: ComponentFixture<TaskDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskDetailModalComponent]
    });
    fixture = TestBed.createComponent(TaskDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
