import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersonAttributes, PersonData } from 'src/app/core/models/people.model';
import { PersonService } from 'src/app/services/person.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-person-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-person-modal.component.html',
  styleUrls: ['./add-person-modal.component.scss'],
})
export class AddPersonModalComponent implements OnInit {
  personForm!: FormGroup;
  skills: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPersonModalComponent>,
    private _person: PersonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: [''],
    });
  }

  addSkill() {
    const skillControl = this.personForm.get('skills');
    if (skillControl?.valid) {
      const skillValue = skillControl.value.trim();
      if (skillValue && !this.skills.includes(skillValue)) {
        this.skills.push(skillValue);
        skillControl.reset();
      }
    } else {
      skillControl?.markAsTouched();
    }
  }

  removeSkill(index: number): void {
    this.skills.splice(index, 1);
  }

  save(): void {
    if (this.personForm.valid && this.skills.length > 0) {
      const personAttributes: PersonAttributes = {
        name: this.personForm.value.name,
        age: this.personForm.value.age + '',
        skills: this.skills,
      };

      this._person.createPerson(personAttributes).subscribe(
        (response) => {
          this._showToast('Person created successfully');
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  private _showToast(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
