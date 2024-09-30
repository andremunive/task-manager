import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from 'src/app/services/person.service';
import { People, PersonData } from 'src/app/core/models/people.model';
import { map, Observable, of, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  TaskAttributes,
  TaskData,
  TaskModel,
} from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
})
export class TaskFormModalComponent implements OnInit {
  taskForm!: FormGroup;
  people: PersonData[] = [];
  filteredPersons: Observable<PersonData[]> = of([]);
  selectedPersons: PersonData[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormModalComponent>,
    private _person: PersonService,
    private _task: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
      assignedPersons: ['', this.validateSelectedPersons.bind(this)],
    });

    this.loadPeople();

    if (this.data?.task) {
      this.fillFormForEdit(this.data.task);
    }

    this.filteredPersons = this.taskForm
      .get('assignedPersons')!
      .valueChanges.pipe(
        startWith(''),
        map((value) =>
          typeof value === 'string' ? value : value?.attributes?.name || ''
        ),
        map((name) => this._filter(name))
      );
  }

  validateSelectedPersons(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return this.selectedPersons.length > 0 ? null : { noPersonsSelected: true };
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.taskForm.valid) {
      const taskData: TaskModel = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        deadline: this.taskForm.value.deadline,
        status: this.taskForm.value.status,
        people: this.selectedPersons.map((person) => person.id), // Enviar solo los IDs de las personas
      };

      if (this.data?.task?.id) {
        // Modo edición: actualiza la tarea
        this._task.updateTask(this.data.task.id, taskData).subscribe(
          (response) => {
            this._showToast('Task updated successfully');
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        // Modo creación: crea una nueva tarea
        this._task.createTask(taskData).subscribe(
          (response) => {
            this._showToast('Task created successfully');
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error creating task:', error);
          }
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private _filter(value: string): PersonData[] {
    const filterValue = value.toLowerCase();

    return this.people
      .filter(
        (person) =>
          !this.selectedPersons.some((selected) => selected.id === person.id)
      )
      .filter((person) =>
        person.attributes.name.toLowerCase().includes(filterValue)
      );
  }

  fillFormForEdit(task: any): void {
    this.taskForm.patchValue({
      name: task.attributes.name,
      description: task.attributes.description,
      deadline: task.attributes.deadline,
      status: task.attributes.status,
    });

    this.selectedPersons = task.attributes.people.data;

    this.filteredPersons = of(
      this.people.filter(
        (person) =>
          !this.selectedPersons.some((selected) => selected.id === person.id)
      )
    );
  }

  selectPerson(person: PersonData): void {
    if (!this.selectedPersons.some((selected) => selected.id === person.id)) {
      this.selectedPersons.push(person);
      this.taskForm.get('assignedPersons')?.setValue('');

      this.filteredPersons = of(this._filter(''));
    }
  }

  removePerson(person: PersonData): void {
    const index = this.selectedPersons.findIndex(
      (selected) => selected.id === person.id
    );
    if (index > -1) {
      this.selectedPersons.splice(index, 1);

      this.filteredPersons = of(this._filter(''));
    }
  }

  loadPeople() {
    this._person.getAllPeople().subscribe((res: People) => {
      this.people = res.data;
    });
  }

  displayAllPersons(): void {
    this.taskForm.get('assignedPersons')!.setValue('');
  }

  private _showToast(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Duración en milisegundos
      verticalPosition: 'top', // Posición en la pantalla
      horizontalPosition: 'center', // Posición en la pantalla
    });
  }
}
