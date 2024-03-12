import { PeopleResponse } from './../../../shared/models/people';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  readonly apiService = 'https://po-sample-api.onrender.com/v1/people';

  constructor(private http: HttpClient) {}

  getAllPeople(
    page: number,
    pageSize: number
  ): Observable<{ items: PeopleResponse[]; hasNext: boolean }> {
    var params:HttpParams = new HttpParams();
    params = params.append('page', page)
    params = params.append('pageSize', pageSize)
    return this.http.get<{ items: PeopleResponse[]; hasNext: boolean }>(
      this.apiService, {params}
    );
  }
  getPerson(
    id: string,
  ): Observable<PeopleResponse> {

    return this.http.get<PeopleResponse>(
      `${this.apiService}/${id}`,
    );
  }


  editPerson(person: PeopleResponse):Observable<PeopleResponse>{
    return this.http.put<PeopleResponse>(`${this.apiService}/${person.id}`, person)
  }

  createPerson(person: PeopleResponse):Observable<PeopleResponse>{
    return this.http.post<PeopleResponse>(this.apiService, person)
  }
}
