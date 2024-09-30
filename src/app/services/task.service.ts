import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  TaskAttributes,
  TaskData,
  TaskModel,
  TaskResponse,
} from '../core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(page: string, pageSize: string): Observable<TaskResponse> {
    const url = `${environment.URL_BASE}${environment.host.tasks.methods.general}?populate=people&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    return this.http.get<TaskResponse>(url);
  }

  createTask(taskData: TaskModel): Observable<any> {
    const url = `${environment.URL_BASE}${environment.host.tasks.methods.general}`;
    return this.http.post(url, { data: taskData });
  }

  updateTask(taskId: number, taskData: TaskModel): Observable<any> {
    const url = `${environment.URL_BASE}${environment.host.tasks.methods.general}/${taskId}`;
    return this.http.put(url, { data: taskData });
  }
}
