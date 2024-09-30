import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersonData } from 'src/app/core/models/people.model';

@Component({
  selector: 'app-people-modal',
  standalone: true,
  templateUrl: './people-modal.component.html',
  styleUrls: ['./people-modal.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class PeopleModalComponent implements OnInit {
  people: PersonData[] = [];

  constructor(
    private dialogRef: MatDialogRef<PeopleModalComponent>,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.personService.getAllPeople().subscribe((res) => {
      this.people = res.data;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  addPerson(): void {}
}
