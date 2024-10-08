import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleModalComponent } from './people-modal.component';

describe('PeopleModalComponent', () => {
  let component: PeopleModalComponent;
  let fixture: ComponentFixture<PeopleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PeopleModalComponent]
    });
    fixture = TestBed.createComponent(PeopleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
