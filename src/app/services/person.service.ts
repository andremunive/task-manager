import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { People, PersonAttributes } from '../core/models/people.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<People> {
    const url = `${environment.URL_BASE}${environment.host.person.methods.general}`;
    return this.http.get<People>(url);
  }

  createPerson(personData: PersonAttributes): Observable<any> {
    const url = `${environment.URL_BASE}${environment.host.person.methods.general}`;
    return this.http.post(url, { data: personData });
  }
}
